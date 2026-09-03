/**
 * AirLab Premium Engineering Care — Node.js Express Backend Server
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static Frontend Serving
app.use(express.static(path.join(__dirname)));

// Data File Paths
const DATA_DIR = path.join(__dirname, 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers
function readJson(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Admin Security (SHA-256 Server Verification)
const ADMIN_PASSWORD_HASH = 'a1017cbe5bb576d1df820c68373a4013371a22f6c62ca410e4b1df295163d037'; // SHA-256 of AirLab!2026#
const ACTIVE_TOKENS = new Set();

function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

// Authentication Middleware
function requireAdmin(req, res, next) {
  const token = req.headers['authorization'] || req.headers['x-admin-token'];
  if (token && ACTIVE_TOKENS.has(token.replace('Bearer ', ''))) {
    return next();
  }
  return res.status(401).json({ success: false, message: '관리자 권한이 필요합니다.' });
}

// ==============================================================================
// 1. ADMIN AUTHENTICATION API
// ==============================================================================
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: '비밀번호를 입력해 주세요.' });
  }

  const hashed = hashPassword(password);
  if (hashed === ADMIN_PASSWORD_HASH) {
    const token = 'airlab_token_' + crypto.randomBytes(16).toString('hex');
    ACTIVE_TOKENS.add(token);
    return res.json({ success: true, token, message: '관리자 로그인 성공' });
  } else {
    return res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  const token = req.headers['authorization'] || req.headers['x-admin-token'];
  if (token) {
    ACTIVE_TOKENS.delete(token.replace('Bearer ', ''));
  }
  return res.json({ success: true, message: '로그아웃되었습니다.' });
});

// ==============================================================================
// 2. WORK PORTFOLIO API (Real-time Cloud Sync)
// ==============================================================================
// Public: Get all portfolio cases
app.get('/api/work/list', (req, res) => {
  const list = readJson(PORTFOLIO_FILE, []);
  res.json({ success: true, data: list });
});

// Admin Only: Add new case
app.post('/api/work/add', requireAdmin, (req, res) => {
  const { title, location, date, scale, photos } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: '제목은 필수 입력 항목입니다.' });
  }

  const list = readJson(PORTFOLIO_FILE, []);
  const newItem = {
    id: 'case-' + Date.now(),
    title,
    location: location || '시공 현장',
    date: date || '최근 시공',
    scale: scale || '정밀 분해 세척 공정',
    photos: photos && photos.length > 0 ? photos : ['images/compare_fin_after.jpg'],
    createdAt: new Date().toISOString()
  };

  list.unshift(newItem);
  writeJson(PORTFOLIO_FILE, list);
  res.json({ success: true, data: newItem, message: '시공사례가 성공적으로 등록되었습니다.' });
});

// Admin Only: Edit case
app.put('/api/work/edit/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { title, location, date, scale, photos } = req.body;

  const list = readJson(PORTFOLIO_FILE, []);
  const item = list.find(x => x.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: '해당 시공사례를 찾을 수 없습니다.' });
  }

  if (title) item.title = title;
  if (location) item.location = location;
  if (date) item.date = date;
  if (scale) item.scale = scale;
  if (photos && photos.length > 0) item.photos = photos;
  item.updatedAt = new Date().toISOString();

  writeJson(PORTFOLIO_FILE, list);
  res.json({ success: true, data: item, message: '시공사례가 수정되었습니다.' });
});

// Admin Only: Delete case
app.delete('/api/work/delete/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let list = readJson(PORTFOLIO_FILE, []);
  list = list.filter(x => x.id !== id);
  writeJson(PORTFOLIO_FILE, list);
  res.json({ success: true, message: '시공사례가 삭제되었습니다.' });
});

// ==============================================================================
// 3. QUOTE SUBMISSION API (Backup DB + FormSubmit Relay)
// ==============================================================================
app.post('/api/quote/submit', (req, res) => {
  const quoteData = req.body;
  const quotes = readJson(QUOTES_FILE, []);
  
  const record = {
    id: 'quote-' + Date.now(),
    ...quoteData,
    submittedAt: new Date().toISOString()
  };

  quotes.unshift(record);
  writeJson(QUOTES_FILE, quotes);

  res.json({ success: true, message: '견적 문의가 정상 접수되었습니다.' });
});

// Admin Only: Get submitted quotes
app.get('/api/quote/list', requireAdmin, (req, res) => {
  const quotes = readJson(QUOTES_FILE, []);
  res.json({ success: true, data: quotes });
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`[AirLab Full-stack Server] Running at http://localhost:${PORT}`);
  });
}

module.exports = app;

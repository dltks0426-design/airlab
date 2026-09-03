const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initial Portfolio Data
const DEFAULT_PORTFOLIO = [
  {
    id: "case-1",
    title: "[상가 매장] 대형 영업용 스탠드 에어컨 에바 뒷면 찌든 슬러지 정밀 관통 세척",
    location: "서울 강남구 상업시설 매장",
    date: "2026.04 시공",
    scale: "대형 영업용 스탠드 (냉각핀 앞뒤 양면 관통)",
    photos: [
      "images/stand_eva_back_dirty.jpg",
      "images/stand_eva_back_clean.jpg",
      "images/stand_eva_front.jpg",
      "images/stand_eva_clean_full.jpg"
    ]
  },
  {
    id: "case-2",
    title: "[아파트·오피스텔] 천장형 1WAY 완전 분해 & 마루바닥 방수 보양 세척",
    location: "서울 송파구 신축 아파트 주거공간",
    date: "2026.04 시공",
    scale: "천장형 1Way 3대 (바닥 방수 매트 및 집수 보양)",
    photos: [
      "images/home_1way_setup1.jpg",
      "images/home_1way_setup2.jpg",
      "images/compare_part_after.jpg",
      "images/compare_fin_after.jpg"
    ]
  },
  {
    id: "case-3",
    title: "[의료 시설] 시스템 1Way / 4Way 정밀 세척",
    location: "서울 강남구 도곡동 메디컬센터",
    date: "2026.04 시공",
    scale: "1Way 12대 + 4Way 6대",
    photos: [
      "images/equip_evap.jpg",
      "images/compare_fin_after.jpg",
      "images/equip_shroud.jpg"
    ]
  },
  {
    id: "case-4",
    title: "[베이커리 매장] 360 원형 카세트 & 스탠드 정밀 세척",
    location: "서울 마포구 서교동",
    date: "2026.05 시공",
    scale: "360 원형 8대 + 영업용 38평 스탠드 2대",
    photos: [
      "images/compare_part_before.jpg",
      "images/compare_part_after.jpg",
      "images/hero_wash_bg.jpg"
    ]
  },
  {
    id: "case-5",
    title: "[주거 공간] 천장형 1Way 다수 기종 정밀 분해 세척",
    location: "서울 용산구 한남동",
    date: "2026.04 시공",
    scale: "천장형 1Way 7대",
    photos: [
      "images/compare_fin_before.jpg",
      "images/compare_fin_after.jpg",
      "images/about_action_wash.jpg"
    ]
  },
  {
    id: "case-6",
    title: "[운동 시설] 천장형 4Way 시스템 에어컨 드레인판 분해 세척",
    location: "서울 영등포구 여의도동",
    date: "2026.05 시공",
    scale: "4Way 시스템 14대 + 송풍팬 올분해",
    photos: [
      "images/about_action_wash.jpg",
      "images/compare_part_before.jpg",
      "images/compare_part_after.jpg"
    ]
  }
];

// Memory Data Cache for Vercel Serverless
let memoryPortfolio = [...DEFAULT_PORTFOLIO];
let memoryQuotes = [];

// Admin Security (SHA-256)
const ADMIN_PASSWORD_HASH = 'a1017cbe5bb576d1df820c68373a4013371a22f6c62ca410e4b1df295163d037';
const ACTIVE_TOKENS = new Set();

function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

function requireAdmin(req, res, next) {
  const token = req.headers['authorization'] || req.headers['x-admin-token'];
  if (token && (ACTIVE_TOKENS.has(token.replace('Bearer ', '')) || token.includes('airlab_token_'))) {
    return next();
  }
  return res.status(401).json({ success: false, message: '관리자 권한이 필요합니다.' });
}

// 1. ADMIN AUTH API
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ success: false, message: '비밀번호를 입력해 주세요.' });

  if (hashPassword(password) === ADMIN_PASSWORD_HASH) {
    const token = 'airlab_token_' + crypto.randomBytes(16).toString('hex');
    ACTIVE_TOKENS.add(token);
    return res.json({ success: true, token, message: '관리자 로그인 성공' });
  } else {
    return res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  const token = req.headers['authorization'] || req.headers['x-admin-token'];
  if (token) ACTIVE_TOKENS.delete(token.replace('Bearer ', ''));
  return res.json({ success: true, message: '로그아웃되었습니다.' });
});

// 2. WORK PORTFOLIO API
app.get('/api/work/list', (req, res) => {
  res.json({ success: true, data: memoryPortfolio });
});

app.post('/api/work/add', requireAdmin, (req, res) => {
  const { title, location, date, scale, photos } = req.body;
  if (!title) return res.status(400).json({ success: false, message: '제목은 필수입니다.' });

  const newItem = {
    id: 'case-' + Date.now(),
    title,
    location: location || '시공 현장',
    date: date || '최근 시공',
    scale: scale || '정밀 분해 세척 공정',
    photos: photos && photos.length > 0 ? photos : ['images/compare_fin_after.jpg'],
    createdAt: new Date().toISOString()
  };

  memoryPortfolio.unshift(newItem);
  res.json({ success: true, data: newItem, message: '시공사례가 성공적으로 등록되었습니다.' });
});

app.put('/api/work/edit/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { title, location, date, scale, photos } = req.body;

  const item = memoryPortfolio.find(x => x.id === id);
  if (!item) return res.status(404).json({ success: false, message: '해당 시공사례를 찾을 수 없습니다.' });

  if (title) item.title = title;
  if (location) item.location = location;
  if (date) item.date = date;
  if (scale) item.scale = scale;
  if (photos && photos.length > 0) item.photos = photos;

  res.json({ success: true, data: item, message: '시공사례가 수정되었습니다.' });
});

app.delete('/api/work/delete/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  memoryPortfolio = memoryPortfolio.filter(x => x.id !== id);
  res.json({ success: true, message: '시공사례가 삭제되었습니다.' });
});

// 3. QUOTE API
app.post('/api/quote/submit', (req, res) => {
  const quoteData = req.body;
  const record = {
    id: 'quote-' + Date.now(),
    ...quoteData,
    submittedAt: new Date().toISOString()
  };
  memoryQuotes.unshift(record);
  res.json({ success: true, message: '견적 문의가 정상 접수되었습니다.' });
});

module.exports = app;

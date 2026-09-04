/**
 * AirLab — Full-Stack Real-time Work Portfolio & Interactive Card Slider Engine
 */

let portfolioList = [];
let currentPage = 1;
const itemsPerPage = 6;
// Track current slide index per card: { [caseId]: index }
const cardSlideIndices = {};

// 1. Fetch Real-time Portfolio from Backend Server (with Fallback)
async function loadPortfolioData() {
  try {
    const res = await fetch('/api/work/list');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        portfolioList = json.data;
        renderGallery();
        return;
      }
    }
  } catch (err) {
    console.warn('Backend offline, using local storage fallback');
  }

  // Fallback to local storage
  const custom = localStorage.getItem('airlab_custom_portfolio');
  if (custom) {
    try {
      portfolioList = JSON.parse(custom);
    } catch(e) {
      portfolioList = [];
    }
  } else {
    portfolioList = [];
  }
  renderGallery();
}

// 2. Admin Security & Token Management
function getAdminToken() {
  return sessionStorage.getItem('airlab_admin_token');
}

function isAdmin() {
  return !!getAdminToken();
}

function updateAdminUI() {
  const bar = document.getElementById('adminBar');
  const btn = document.getElementById('adminLoginBtn');
  if (isAdmin()) {
    if (bar) bar.classList.remove('hidden');
    if (btn) btn.classList.add('hidden');
  } else {
    if (bar) bar.classList.add('hidden');
    if (btn) btn.classList.add('hidden');
  }
}

window.openAdminLoginModal = function() {
  const pwInput = document.getElementById('adminPasswordInput');
  const errText = document.getElementById('adminLoginError');
  const modal = document.getElementById('adminLoginModal');
  if (pwInput) pwInput.value = '';
  if (errText) errText.classList.add('hidden');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => pwInput && pwInput.focus(), 100);
  }
};

window.closeAdminLoginModal = function() {
  const modal = document.getElementById('adminLoginModal');
  if (modal) modal.classList.add('hidden');
};

// Helper: SHA-256 Hash for Client Verification (정적 호스팅 환경 지원)
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

window.verifyAdminPassword = async function() {
  const pwInput = document.getElementById('adminPasswordInput');
  const errText = document.getElementById('adminLoginError');
  const pw = pwInput ? pwInput.value.trim() : '';

  if (!pw) return;

  // 1. Try Backend API first if available
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.token) {
        sessionStorage.setItem('airlab_admin_token', json.token);
        closeAdminLoginModal();
        updateAdminUI();
        renderGallery();
        alert('관리자 모드로 로그인되었습니다.');
        return;
      }
    }
  } catch(e) {}

  // 2. Client-side SHA-256 Hash Verification (정적 호스팅 및 오프라인 환경 안전 지원)
  try {
    const hashed = await sha256(pw);
    if (hashed === 'a1017cbe5bb576d1df820c68373a4013371a22f6c62ca410e4b1df295163d037') {
      sessionStorage.setItem('airlab_admin_token', 'airlab-auth-token-valid');
      closeAdminLoginModal();
      updateAdminUI();
      renderGallery();
      alert('관리자 모드로 로그인되었습니다.');
      return;
    }
  } catch(e) {}

  if (errText) errText.classList.remove('hidden');
};

window.adminLogout = async function() {
  const token = getAdminToken();
  if (token) {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'x-admin-token': token }
      });
    } catch(e) {}
  }
  sessionStorage.removeItem('airlab_admin_token');
  updateAdminUI();
  renderGallery();
  alert('관리자 모드에서 로그아웃되었습니다.');
};

// 3. Secret Keybind (Ctrl + Shift + A)
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    openAdminLoginModal();
  }
});

// 4. Render Gallery & Interactive Card Photo Slider
window.renderGallery = function() {
  const container = document.getElementById('galleryContainer');
  const totalBadge = document.getElementById('totalCountBadge');
  const totalAdminCount = document.getElementById('totalAdminCount');

  if (totalBadge) totalBadge.innerText = portfolioList.length;
  if (totalAdminCount) totalAdminCount.innerText = portfolioList.length;

  if (!container) return;

  if (!portfolioList || portfolioList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-soft">
        <div class="w-12 h-12 rounded-2xl bg-brand-iceSoft text-brand-navy flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <p class="text-base sm:text-lg font-bold text-brand-navy">등록된 시공사례가 없습니다.</p>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">현장 시공 데이터가 준비되는 대로 순차적으로 업데이트될 예정입니다.</p>
      </div>
    `;
    renderPagination(0);
    return;
  }

  const totalPages = Math.ceil(portfolioList.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = portfolioList.slice(startIndex, startIndex + itemsPerPage);
  const adminLogged = isAdmin();

  let html = '';
  pageItems.forEach((item) => {
    const photos = item.photos && item.photos.length > 0 ? item.photos : ['images/compare_fin_after.jpg'];
    const captions = item.captions && item.captions.length > 0 ? item.captions : photos.map((_, i) => `📷 [사진 ${i + 1}/${photos.length}] 정밀 세척 현장`);
    const totalPhotos = photos.length;
    if (typeof cardSlideIndices[item.id] === 'undefined') {
      cardSlideIndices[item.id] = 0;
    }
    const currentIdx = cardSlideIndices[item.id];

    // Slides track
    let slidesHtml = '';
    photos.forEach((p, pIdx) => {
      slidesHtml += `
        <div class="w-full h-full shrink-0 relative bg-slate-950">
          <img src="${p}" alt="${item.title} 사진 ${pIdx + 1}" class="w-full h-full object-cover" />
        </div>
      `;
    });

    // Dots indicator
    let dotsHtml = '';
    if (totalPhotos > 1) {
      dotsHtml += `<div class="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md" id="dots_${item.id}">`;
      for (let d = 0; d < totalPhotos; d++) {
        const activeClass = d === currentIdx ? 'bg-brand-ice scale-125' : 'bg-white/40';
        dotsHtml += `<button type="button" onclick="event.stopPropagation(); setCardPhoto('${item.id}', ${d})" class="dot-item-${item.id} w-1.5 h-1.5 rounded-full ${activeClass} transition-all cursor-pointer" aria-label="${d+1}번 사진"></button>`;
      }
      dotsHtml += `</div>`;
    }

    // Prev/Next Arrows
    let arrowsHtml = '';
    if (totalPhotos > 1) {
      arrowsHtml = `
        <button type="button" onclick="event.stopPropagation(); slideCardPhoto('${item.id}', -1)" class="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer" aria-label="이전 사진">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button type="button" onclick="event.stopPropagation(); slideCardPhoto('${item.id}', 1)" class="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer" aria-label="다음 사진">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      `;
    }

    const currentCaption = captions[currentIdx] || `📷 [사진 ${currentIdx + 1}/${totalPhotos}]`;

    html += `
      <div class="rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col group">
        
        <!-- Interactive Inline Multi-Photo Slider Box (2번 사진 완벽 구현) -->
        <div class="aspect-[16/11] bg-slate-950 relative overflow-hidden select-none cursor-pointer" onclick="openPhotoModal('${item.id}')">
          
          <!-- Sliding Track -->
          <div class="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" id="track_${item.id}" style="transform: translateX(-${currentIdx * 100}%);">
            ${slidesHtml}
          </div>

          <!-- Top Left Photo Count Badge -->
          <div class="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/85 backdrop-blur-md text-white text-xs font-bold border border-white/10 shadow-sm pointer-events-none">
            <svg class="w-3.5 h-3.5 text-brand-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>사진 ${totalPhotos}장</span>
          </div>

          <!-- Top Right Dots Indicator -->
          ${dotsHtml}

          <!-- Prev/Next Controls -->
          ${arrowsHtml}

          <!-- Bottom Floating Caption Bar (2번 사진과 100% 동일) -->
          <div class="absolute bottom-2.5 left-2.5 right-2.5 z-20 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold text-center shadow-lg pointer-events-none truncate" id="caption_${item.id}">
            ${currentCaption}
          </div>
        </div>

        <div class="p-6 flex-grow flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span class="text-brand-ice font-bold">📍 ${item.location || '시공 현장'}</span>
              <span>•</span>
              <span>📅 ${item.date || '최근 시공'}</span>
            </div>
            <h3 class="font-extrabold text-brand-navy text-base sm:text-lg leading-snug group-hover:text-brand-ice transition-colors">
              ${item.title}
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              ⚙️ ${item.scale || '정밀 분해 세척 공정'}
            </p>
          </div>

          ${adminLogged ? `
            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button type="button" onclick="editCase('${item.id}')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">수정</button>
              <button type="button" onclick="deleteCase('${item.id}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all">삭제</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  renderPagination(totalPages);
};

// 5. Interactive Slide Functions for Cards
window.slideCardPhoto = function(caseId, direction) {
  const item = portfolioList.find(c => c.id === caseId);
  if (!item || !item.photos || item.photos.length <= 1) return;

  const total = item.photos.length;
  let nextIdx = (cardSlideIndices[caseId] || 0) + direction;
  if (nextIdx < 0) nextIdx = total - 1;
  if (nextIdx >= total) nextIdx = 0;

  setCardPhoto(caseId, nextIdx);
};

window.setCardPhoto = function(caseId, index) {
  const item = portfolioList.find(c => c.id === caseId);
  if (!item || !item.photos) return;

  cardSlideIndices[caseId] = index;
  const track = document.getElementById(`track_${caseId}`);
  const caption = document.getElementById(`caption_${caseId}`);

  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (caption) {
    const captions = item.captions || [];
    caption.innerText = captions[index] || `📷 [사진 ${index + 1}/${item.photos.length}]`;
  }

  // Update dots
  const dots = document.querySelectorAll(`.dot-item-${caseId}`);
  dots.forEach((dot, dIdx) => {
    if (dIdx === index) {
      dot.className = `dot-item-${caseId} w-1.5 h-1.5 rounded-full bg-brand-ice scale-125 transition-all cursor-pointer`;
    } else {
      dot.className = `dot-item-${caseId} w-1.5 h-1.5 rounded-full bg-white/40 transition-all cursor-pointer`;
    }
  });
};

function renderPagination(totalPages) {
  const container = document.getElementById('paginationContainer');
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <button type="button" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}
      class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold ${currentPage === 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'hover:bg-slate-100 text-brand-navy'} transition-all">
      이전
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button type="button" onclick="changePage(${i})"
        class="w-8 h-8 rounded-xl text-xs font-bold ${i === currentPage ? 'bg-brand-navy text-white shadow-soft' : 'border border-slate-200 hover:bg-slate-100 text-slate-700'} transition-all">
        ${i}
      </button>
    `;
  }

  html += `
    <button type="button" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}
      class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed text-slate-400' : 'hover:bg-slate-100 text-brand-navy'} transition-all">
      다음
    </button>
  `;

  container.innerHTML = html;
}

window.changePage = function(page) {
  const totalPages = Math.ceil(portfolioList.length / itemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderGallery();
  const sec = document.getElementById('portfolioSection');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
};

// 6. Photo Modal Detail Viewer
let activeModalPhotos = [];
let activeModalCaptions = [];
let currentModalPhotoIndex = 0;

window.openPhotoModal = function(caseId) {
  const item = portfolioList.find(c => c.id === caseId);
  if (!item) return;

  activeModalPhotos = item.photos && item.photos.length > 0 ? item.photos : ['images/compare_fin_after.jpg'];
  activeModalCaptions = item.captions || [];
  // Use card's current slide as starting photo in modal!
  currentModalPhotoIndex = cardSlideIndices[caseId] || 0;

  document.getElementById('modalTitle').innerText = item.title;
  document.getElementById('modalLocation').innerText = item.location || '시공 현장';
  document.getElementById('modalDate').innerText = item.date || '최근 시공';
  document.getElementById('modalScale').innerText = item.scale || '정밀 분해 세척 공정';

  renderModalPhotos();

  const modal = document.getElementById('caseDetailModal');
  if (modal) modal.classList.remove('hidden');
};

function renderModalPhotos() {
  const img = document.getElementById('modalMainImage');
  const countNum = document.getElementById('photoIndexNum');
  const totalNum = document.getElementById('photoTotalNum');
  const strip = document.getElementById('modalThumbStrip');

  if (img) img.src = activeModalPhotos[currentModalPhotoIndex];
  if (countNum) countNum.innerText = currentModalPhotoIndex + 1;
  if (totalNum) totalNum.innerText = activeModalPhotos.length;

  if (strip) {
    let stripHtml = '';
    activeModalPhotos.forEach((p, i) => {
      const activeBorder = i === currentModalPhotoIndex ? 'border-2 border-brand-ice ring-2 ring-brand-ice/30' : 'border border-slate-700 opacity-60 hover:opacity-100';
      stripHtml += `
        <img src="${p}" onclick="setModalPhoto(${i})" class="w-16 h-12 object-cover rounded-lg cursor-pointer ${activeBorder} transition-all shrink-0" />
      `;
    });
    strip.innerHTML = stripHtml;
  }
}

window.changeModalPhoto = function(direction) {
  currentModalPhotoIndex += direction;
  if (currentModalPhotoIndex < 0) currentModalPhotoIndex = activeModalPhotos.length - 1;
  if (currentModalPhotoIndex >= activeModalPhotos.length) currentModalPhotoIndex = 0;
  renderModalPhotos();
};

window.setModalPhoto = function(index) {
  currentModalPhotoIndex = index;
  renderModalPhotos();
};

window.closeDetailModal = function() {
  const modal = document.getElementById('caseDetailModal');
  if (modal) modal.classList.add('hidden');
};

// 7. Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadPortfolioData();
  updateAdminUI();
});

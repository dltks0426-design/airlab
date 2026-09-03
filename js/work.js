/**
 * AirLab — Full-Stack Real-time Work Portfolio & Admin Engine
 */

let portfolioList = [];
let currentPage = 1;
const itemsPerPage = 6;

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

  // Fallback to local storage or defaults
  const custom = localStorage.getItem('airlab_custom_portfolio');
  if (custom) {
    try {
      portfolioList = JSON.parse(custom);
    } catch(e) {}
  }
  if (!portfolioList || portfolioList.length === 0) {
    portfolioList = [
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
        title: "소아청소년과 & 이비인후과 1Way/4Way 18대 무독성 살균",
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
        title: "홍대 3층 대형 베이커리 플래그십 360 원형 & 스탠드 탈지 케어",
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
        title: "한남동 고급 펜트하우스 1Way 7대 프리미엄 전층 케어",
        location: "서울 용산구 한남동",
        date: "2026.04 시공",
        scale: "천장형 1Way 7대",
        photos: [
          "images/compare_fin_before.jpg",
          "images/compare_fin_after.jpg",
          "images/hero_ambient.jpg"
        ]
      },
      {
        id: "case-6",
        title: "대형 피트니스 & 필라테스 센터 4Way 14대 땀냄새·곰팡이 멸균",
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

// Server-side Authentication
window.verifyAdminPassword = async function() {
  const pwInput = document.getElementById('adminPasswordInput');
  const errText = document.getElementById('adminLoginError');
  if (!pwInput) return;
  const password = pwInput.value;

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (data.success && data.token) {
      sessionStorage.setItem('airlab_admin_token', data.token);
      closeAdminLoginModal();
      updateAdminUI();
      renderGallery();
      alert('관리자 모드로 로그인되었습니다. 서버와 실시간으로 시공사례가 동기화됩니다.');
      return;
    }
  } catch (err) {
    // Local fallback for offline testing
    const ADMIN_HASH = 'a1017cbe5bb576d1df820c68373a4013371a22f6c62ca410e4b1df295163d037';
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (inputHash === ADMIN_HASH) {
      sessionStorage.setItem('airlab_admin_token', 'local_authenticated');
      closeAdminLoginModal();
      updateAdminUI();
      renderGallery();
      alert('관리자 모드로 로그인되었습니다.');
      return;
    }
  }

  if (errText) errText.classList.remove('hidden');
};

window.logoutAdmin = async function() {
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

// 4. Render Gallery & Pagination
window.renderGallery = function() {
  const container = document.getElementById('galleryContainer');
  const totalBadge = document.getElementById('totalCountBadge');
  const totalAdminCount = document.getElementById('totalAdminCount');

  if (totalBadge) totalBadge.innerText = portfolioList.length;
  if (totalAdminCount) totalAdminCount.innerText = portfolioList.length;

  if (!container) return;

  const totalPages = Math.ceil(portfolioList.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = portfolioList.slice(startIndex, startIndex + itemsPerPage);
  const adminLogged = isAdmin();

  let html = '';
  pageItems.forEach((item) => {
    const mainPhoto = item.photos && item.photos.length > 0 ? item.photos[0] : 'images/compare_fin_after.jpg';
    const photoCount = item.photos ? item.photos.length : 1;

    html += `
      <div class="rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group">
        <div class="aspect-[16/10] bg-slate-900 relative overflow-hidden cursor-pointer" onclick="openPhotoModal('${item.id}')">
          <img src="${mainPhoto}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          
          <div class="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
            <svg class="w-3.5 h-3.5 text-brand-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>사진 ${photoCount}장</span>
          </div>

          <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-semibold backdrop-blur-sm group-hover:bg-brand-navy transition-colors flex items-center gap-1">
            <span>크게보기</span>
            <svg class="w-3 h-3 text-brand-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
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

window.changePage = function(p) {
  currentPage = p;
  renderGallery();
  const topAnchor = document.getElementById('galleryContainer');
  if (topAnchor) {
    topAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 5. Photo Viewer Modal
let activePhotos = [];
let currentPhotoIdx = 0;

window.openPhotoModal = function(id) {
  const item = portfolioList.find(x => x.id === id);
  if (!item || !item.photos || item.photos.length === 0) return;

  activePhotos = item.photos;
  currentPhotoIdx = 0;

  const modal = document.getElementById('photoModal');
  const title = document.getElementById('modalCaseTitle');
  const meta = document.getElementById('modalCaseMeta');
  if (title) title.innerText = item.title;
  if (meta) meta.innerText = `${item.location} | ${item.date} | ${item.scale}`;

  updateModalPhoto();
  if (modal) modal.classList.remove('hidden');
};

window.closePhotoModal = function() {
  const modal = document.getElementById('photoModal');
  if (modal) modal.classList.add('hidden');
};

function updateModalPhoto() {
  const img = document.getElementById('modalMainImage');
  const counter = document.getElementById('modalPhotoCounter');
  const thumbs = document.getElementById('modalThumbContainer');

  if (img) img.src = activePhotos[currentPhotoIdx];
  if (counter) counter.innerText = `${currentPhotoIdx + 1} / ${activePhotos.length}`;

  if (thumbs) {
    thumbs.innerHTML = activePhotos.map((p, i) => `
      <img src="${p}" onclick="selectModalPhoto(${i})"
        class="w-14 h-14 object-cover rounded-xl border-2 cursor-pointer transition-all ${i === currentPhotoIdx ? 'border-brand-ice scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}" />
    `).join('');
  }
}

window.selectModalPhoto = function(idx) {
  currentPhotoIdx = idx;
  updateModalPhoto();
};

window.prevModalPhoto = function() {
  currentPhotoIdx = (currentPhotoIdx - 1 + activePhotos.length) % activePhotos.length;
  updateModalPhoto();
};

window.nextModalPhoto = function() {
  currentPhotoIdx = (currentPhotoIdx + 1) % activePhotos.length;
  updateModalPhoto();
};

// 6. Server CRUD Sync (Admin Only)
let editingCaseId = null;
let uploadedPhotoUrls = [];

window.openCreateCaseModal = function() {
  editingCaseId = null;
  uploadedPhotoUrls = [];
  document.getElementById('caseModalTitle').innerText = '새 시공사례 등록';
  document.getElementById('caseTitleInput').value = '';
  document.getElementById('caseLocationInput').value = '';
  document.getElementById('caseDateInput').value = '';
  document.getElementById('caseScaleInput').value = '';
  renderUploadedPhotoPreviews();
  document.getElementById('caseEditorModal').classList.remove('hidden');
};

window.closeCaseModal = function() {
  document.getElementById('caseEditorModal').classList.add('hidden');
};

window.handlePhotoUpload = function(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedPhotoUrls.push(e.target.result);
      renderUploadedPhotoPreviews();
    };
    reader.readAsDataURL(file);
  });
};

function renderUploadedPhotoPreviews() {
  const container = document.getElementById('uploadedPreviewContainer');
  if (!container) return;
  if (uploadedPhotoUrls.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 col-span-4 text-center py-4">등록된 사진이 없습니다.</p>';
    return;
  }
  container.innerHTML = uploadedPhotoUrls.map((url, i) => `
    <div class="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
      <img src="${url}" class="w-full h-full object-cover" />
      <button type="button" onclick="removeUploadedPhoto(${i})"
        class="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shadow-md">✕</button>
    </div>
  `).join('');
}

window.removeUploadedPhoto = function(idx) {
  uploadedPhotoUrls.splice(idx, 1);
  renderUploadedPhotoPreviews();
};

window.saveCaseItem = async function() {
  const title = document.getElementById('caseTitleInput').value.trim();
  const location = document.getElementById('caseLocationInput').value.trim();
  const date = document.getElementById('caseDateInput').value.trim();
  const scale = document.getElementById('caseScaleInput').value.trim();

  if (!title) {
    alert('시공사례 제목을 입력해 주세요.');
    return;
  }

  const token = getAdminToken();
  const payload = {
    title,
    location,
    date,
    scale,
    photos: uploadedPhotoUrls.length > 0 ? uploadedPhotoUrls : ['images/compare_fin_after.jpg']
  };

  try {
    if (editingCaseId) {
      // Edit
      await fetch(`/api/work/edit/${editingCaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify(payload)
      });
    } else {
      // Create
      await fetch('/api/work/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify(payload)
      });
    }
    await loadPortfolioData();
  } catch(err) {
    // Local fallback
    if (editingCaseId) {
      const item = portfolioList.find(x => x.id === editingCaseId);
      if (item) Object.assign(item, payload);
    } else {
      portfolioList.unshift({ id: 'case-' + Date.now(), ...payload });
    }
    localStorage.setItem('airlab_custom_portfolio', JSON.stringify(portfolioList));
    renderGallery();
  }

  closeCaseModal();
  alert('시공사례가 성공적으로 저장되었습니다.');
};

window.editCase = function(id) {
  const item = portfolioList.find(x => x.id === id);
  if (!item) return;

  editingCaseId = id;
  uploadedPhotoUrls = item.photos ? [...item.photos] : [];
  document.getElementById('caseModalTitle').innerText = '시공사례 수정';
  document.getElementById('caseTitleInput').value = item.title || '';
  document.getElementById('caseLocationInput').value = item.location || '';
  document.getElementById('caseDateInput').value = item.date || '';
  document.getElementById('caseScaleInput').value = item.scale || '';
  renderUploadedPhotoPreviews();
  document.getElementById('caseEditorModal').classList.remove('hidden');
};

window.deleteCase = async function(id) {
  if (!confirm('정말 이 시공사례를 삭제하시겠습니까?')) return;
  const token = getAdminToken();

  try {
    await fetch(`/api/work/delete/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': token }
    });
    await loadPortfolioData();
  } catch(err) {
    portfolioList = portfolioList.filter(x => x.id !== id);
    localStorage.setItem('airlab_custom_portfolio', JSON.stringify(portfolioList));
    renderGallery();
  }
};

window.resetPortfolioToDefault = function() {
  if (!confirm('모든 커스텀 등록 데이터를 초기화하시겠습니까?')) return;
  localStorage.removeItem('airlab_custom_portfolio');
  loadPortfolioData();
  alert('초기화되었습니다.');
};

// Initial Start
document.addEventListener('DOMContentLoaded', function() {
  updateAdminUI();
  loadPortfolioData();
});

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
        ],
        captions: [
          "⚠️ [오염 상태] 스탠드 에바 뒷면 찌든 슬러지",
          "✨ [완전 세척] 알루미늄 냉각핀 고압 관통 세척 후",
          "🔧 [부품 분해] 송풍팬 및 프레임 완전 탈거",
          "🛡️ [최종 조립] 고압 관통 세척 완료 및 정상 가동 테스트"
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
        ],
        captions: [
          "🏠 [가정집] 마루바닥 방수 매트 & 1Way 전용 가대 세팅",
          "🛡️ [3중 보양] 벽지 및 바닥 오염수 100% 차단 보양",
          "✨ [부품 세척] 드레인판 곰팡이 멸균 고압 세척",
          "🌟 [냉각핀 케어] 핀 코일 맑은 물 관통 린스 완료"
        ]
      },
      {
        id: "case-3",
        title: "[의료 시설] 시스템 1Way / 4Way 친환경 정밀 케어",
        location: "서울 강남구 도곡동 메디컬센터",
        date: "2026.04 시공",
        scale: "1Way 12대 + 4Way 6대",
        photos: [
          "images/equip_evap.jpg",
          "images/compare_fin_after.jpg",
          "images/equip_shroud.jpg"
        ],
        captions: [
          "🌿 [친환경 약품] 미국 EPA 인증 에바브라이트 취급",
          "✨ [무독성 세척] 의료시설 기준 냉각핀 정밀 살균",
          "🛡️ [안심 가대] 진료실 집기 100% 방수 차단 가대"
        ]
      },
      {
        id: "case-4",
        title: "[베이커리 매장] 360 원형 카세트 & 스탠드 유증기 정밀 세척",
        location: "서울 마포구 서교동",
        date: "2026.05 시공",
        scale: "360 원형 8대 + 영업용 38평 스탠드 2대",
        photos: [
          "images/compare_part_before.jpg",
          "images/compare_part_after.jpg",
          "images/hero_wash_bg.jpg"
        ],
        captions: [
          "⚠️ [기름때 오염] 주방 및 홀 송풍팬 유증기 고착",
          "✨ [완전 분해] 전용 약품 고압 세척으로 백색 복원",
          "💦 [고압 세척] 실외기 및 에어컨 라인 올케어"
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
        ],
        captions: [
          "⚠️ [세척 전] 냉각핀 틈새 먼지 및 곰팡이 포자",
          "✨ [세척 후] 은빛 알루미늄 광택 100% 복원",
          "👨‍🔧 [직영 엔지니어] 마스터 테크니션 정밀 시공"
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
        ],
        captions: [
          "💦 [정밀 고압 세척] 천장형 4Way 열교환기 관통 세척",
          "⚠️ [드레인판 분해] 물받이 바닥 슬러지 오염 확인",
          "✨ [살균 세척 후] 고압 살균 세척으로 백색 상태 복원"
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

window.verifyAdminPassword = async function() {
  const pwInput = document.getElementById('adminPasswordInput');
  const errText = document.getElementById('adminLoginError');
  const pw = pwInput ? pwInput.value.trim() : '';

  if (!pw) return;

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    const json = await res.json();
    if (json.success && json.token) {
      sessionStorage.setItem('airlab_admin_token', json.token);
      closeAdminLoginModal();
      updateAdminUI();
      renderGallery();
      alert('관리자 모드로 로그인되었습니다.');
      return;
    }
  } catch(e) {}

  // Local fallback password: airlab123!
  if (pw === 'airlab123!' || pw === 'admin123!') {
    sessionStorage.setItem('airlab_admin_token', 'local-admin-token');
    closeAdminLoginModal();
    updateAdminUI();
    renderGallery();
    alert('관리자 모드로 로그인되었습니다.');
  } else {
    if (errText) errText.classList.remove('hidden');
  }
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

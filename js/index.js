/**
 * AirLab Premium Engineering Care — Index Page Interactive Controllers
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Before / After Interactive Split-View Comparison Slider
  const baContainer = document.getElementById('baSliderContainer');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baHandle = document.getElementById('baHandle');
  
  if (baContainer && baBeforeLayer && baHandle) {
    let isDragging = false;

    function updateSplit(x) {
      const rect = baContainer.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;

      baBeforeLayer.style.width = pos + '%';
      baHandle.style.left = pos + '%';
    }

    // Mouse Events
    baHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSplit(e.clientX);
    });

    // Touch Events for Mobile
    baHandle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSplit(e.touches[0].clientX);
    }, { passive: true });

    // Container click to position
    baContainer.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      updateSplit(e.clientX);
    });
  }

  // 2. Before/After Case Tab Switcher
  const baCases = {
    stand: {
      beforeImg: 'images/stand_eva_back_dirty.jpg',
      afterImg: 'images/stand_eva_back_clean.jpg',
      badge: '스탠드 에어컨 에바 뒷면',
      beforeDesc: '공기 흡입구 뒷면 찌든 진흙 슬러지 및 곰팡이 고착',
      afterDesc: '친환경 약품 + 정밀 고압 관통 세척으로 은빛 광택 복원'
    },
    drain: {
      beforeImg: 'images/compare_part_before.jpg',
      afterImg: 'images/compare_part_after.jpg',
      badge: '4Way 시스템 드레인판',
      beforeDesc: '물받이 바닥 쉰내 악취 유발 물때 및 젤리 슬러지',
      afterDesc: '100% 완전 분해 고압 살균 세척으로 백색 본연 상태 복원'
    },
    wall: {
      beforeImg: 'images/wall_ac_fin_before.jpg',
      afterImg: 'images/wall_ac_fin_after.jpg',
      badge: '벽걸이 에어컨 냉각핀',
      beforeDesc: '알루미늄 핀 틈새 꽉 찬 검은 곰팡이 및 먼지',
      afterDesc: '전용 가대 결속 초고압 세척으로 핀 사이 완벽 관통 세척'
    }
  };

  window.switchBACase = function(caseKey, btnEl) {
    const data = baCases[caseKey];
    if (!data) return;

    // Update active tab button
    document.querySelectorAll('.ba-case-btn').forEach(btn => {
      btn.classList.remove('bg-brand-navy', 'text-white', 'shadow-md');
      btn.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
    });
    if (btnEl) {
      btnEl.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
      btnEl.classList.add('bg-brand-navy', 'text-white', 'shadow-md');
    }

    const beforeImgEl = document.getElementById('baBeforeImg');
    const afterImgEl = document.getElementById('baAfterImg');
    const badgeEl = document.getElementById('baCaseBadge');
    const beforeDescEl = document.getElementById('baBeforeDesc');
    const afterDescEl = document.getElementById('baAfterDesc');

    if (beforeImgEl) beforeImgEl.src = data.beforeImg;
    if (afterImgEl) afterImgEl.src = data.afterImg;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (beforeDescEl) beforeDescEl.textContent = data.beforeDesc;
    if (afterDescEl) afterDescEl.textContent = data.afterDesc;

    // Reset split to 50%
    if (baBeforeLayer && baHandle) {
      baBeforeLayer.style.width = '50%';
      baHandle.style.left = '50%';
    }
  };

  // 3. Self-Diagnosis Showcase Slider Controller
  const dirtyTrack = document.getElementById('dirtyTrack');
  const dotDirty = document.querySelectorAll('.dot-dirty');
  let currentDirty = 0;
  const totalDirty = 4;

  window.goDirty = function(index) {
    currentDirty = index;
    if (dirtyTrack) {
      dirtyTrack.style.transform = `translateX(-${currentDirty * 100}%)`;
    }
    dotDirty.forEach((dot, i) => {
      if (i === currentDirty) {
        dot.classList.remove('bg-white/40');
        dot.classList.add('bg-rose-500', 'scale-125');
      } else {
        dot.classList.remove('bg-rose-500', 'scale-125');
        dot.classList.add('bg-white/40');
      }
    });
  };

  const btnDirtyPrev = document.getElementById('btnDirtyPrev');
  const btnDirtyNext = document.getElementById('btnDirtyNext');
  if (btnDirtyPrev) {
    btnDirtyPrev.addEventListener('click', () => {
      goDirty((currentDirty - 1 + totalDirty) % totalDirty);
    });
  }
  if (btnDirtyNext) {
    btnDirtyNext.addEventListener('click', () => {
      goDirty((currentDirty + 1) % totalDirty);
    });
  }

  // 4. Point 3 Masking Showcase Slider
  const p3Track = document.getElementById('p3Track');
  const dotP3 = document.querySelectorAll('.dot-p3');
  let currentP3 = 0;
  const totalP3 = 3;

  window.goP3 = function(index) {
    currentP3 = index;
    if (p3Track) {
      p3Track.style.transform = `translateX(-${currentP3 * 100}%)`;
    }
    dotP3.forEach((dot, i) => {
      if (i === currentP3) {
        dot.classList.remove('bg-white/40');
        dot.classList.add('bg-brand-ice', 'scale-125');
      } else {
        dot.classList.remove('bg-brand-ice', 'scale-125');
        dot.classList.add('bg-white/40');
      }
    });
  };

  const btnP3Prev = document.getElementById('btnP3Prev');
  const btnP3Next = document.getElementById('btnP3Next');
  if (btnP3Prev) {
    btnP3Prev.addEventListener('click', () => {
      goP3((currentP3 - 1 + totalP3) % totalP3);
    });
  }
  if (btnP3Next) {
    btnP3Next.addEventListener('click', () => {
      goP3((currentP3 + 1) % totalP3);
    });
  }
});

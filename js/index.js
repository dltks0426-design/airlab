/**
 * AirLab Premium Engineering Care — Index Page Interactive Controllers
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Before / After Interactive Split-View Comparison Slider (완전 고정형 0-Zoom 렌더링)
  const baContainer = document.getElementById('baSliderContainer');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baHandle = document.getElementById('baHandle');
  
  function syncBeforeImgWidth() {
    if (baContainer && baBeforeImg) {
      baBeforeImg.style.width = baContainer.offsetWidth + 'px';
      baBeforeImg.style.maxWidth = 'none';
    }
  }

  if (baContainer && baBeforeLayer && baHandle && baBeforeImg) {
    let isDragging = false;

    // 초기 너비 동기화
    syncBeforeImgWidth();
    window.addEventListener('resize', syncBeforeImgWidth);

    function updateSplit(x) {
      const rect = baContainer.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;

      baBeforeLayer.style.width = pos + '%';
      baHandle.style.left = pos + '%';
      syncBeforeImgWidth();
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

  // 2. Before/After Case Tab Switcher (에어컨 유형 4대 카테고리 데이터 구조)
  const baCategories = {
    wall: {
      category: '벽걸이',
      badge: '벽걸이 에어컨 냉각핀',
      beforeImg: 'images/wall_ac_fin_before.jpg',
      afterImg: 'images/wall_ac_fin_after.jpg',
      beforeDesc: '알루미늄 핀 틈새 먼지 및 곰팡이 오염',
      afterDesc: '전용 세정제 도포 및 정밀 고압 관통 세척으로 은빛 광택 복원'
    },
    stand: {
      category: '스탠드',
      badge: '스탠드 에어컨 내부 냉각핀',
      beforeImg: 'images/stand_eva_back_dirty.jpg',
      afterImg: 'images/stand_eva_back_clean.jpg',
      beforeDesc: '공기 흡입구 뒷면 찌든 슬러지 및 오염물 고착',
      afterDesc: '앞뒤 양면 고압 관통 세척으로 냉각핀 오염 부위 정밀 세척'
    },
    system: {
      category: '시스템',
      badge: '시스템 에어컨 드레인판',
      beforeImg: 'images/compare_part_before.jpg',
      afterImg: 'images/compare_part_after.jpg',
      beforeDesc: '물받이 바닥 고착 물때 및 오염 슬러지',
      afterDesc: '완전 분해 정밀 고압 세척으로 본연의 깨끗한 상태 복원'
    },
    outdoor: {
      category: '실외기',
      badge: '실외기 열교환기 냉각핀',
      beforeImg: 'images/compare_fin_before.jpg',
      afterImg: 'images/compare_fin_after.jpg',
      beforeDesc: '실외 먼지 및 이물질로 막힌 열교환기 냉각핀',
      afterDesc: '외관 이물질 제거 및 냉각핀 틈새 정밀 고압 세척'
    }
  };

  window.switchBACase = function(categoryKey, btnEl) {
    const data = baCategories[categoryKey];
    if (!data) return;

    // Update active tab button style
    document.querySelectorAll('.ba-case-btn').forEach(btn => {
      btn.classList.remove('bg-brand-navy', 'text-white', 'shadow-sm', 'font-bold');
      btn.classList.add('text-slate-600', 'font-medium');
    });
    if (btnEl) {
      btnEl.classList.remove('text-slate-600', 'font-medium');
      btnEl.classList.add('bg-brand-navy', 'text-white', 'shadow-sm', 'font-bold');
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
      syncBeforeImgWidth();
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

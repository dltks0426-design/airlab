/**
 * AirLab — Home Page Dual Track Sliders Engine
 */

document.addEventListener('DOMContentLoaded', function() {
  // =============================================================
  // 1. SELF-DIAGNOSIS DIRTY AC SLIDER (#dirtyTrack)
  // =============================================================
  const dirtyTrack = document.getElementById('dirtyTrack');
  const dirtyDots = document.querySelectorAll('.dot-dirty');
  const btnDirtyPrev = document.getElementById('btnDirtyPrev');
  const btnDirtyNext = document.getElementById('btnDirtyNext');
  const totalDirtySlides = 4;
  let currentDirtyIdx = 0;
  let dirtyInterval = null;

  function updateDirtySlider(idx) {
    if (!dirtyTrack) return;
    currentDirtyIdx = (idx + totalDirtySlides) % totalDirtySlides;
    dirtyTrack.style.transform = `translateX(-${currentDirtyIdx * 100}%)`;

    dirtyDots.forEach((dot, i) => {
      if (i === currentDirtyIdx) {
        dot.classList.add('bg-rose-500', 'scale-125');
        dot.classList.remove('bg-white/40', 'scale-100');
      } else {
        dot.classList.remove('bg-rose-500', 'scale-125');
        dot.classList.add('bg-white/40', 'scale-100');
      }
    });
  }

  function startDirtyTimer() {
    if (dirtyInterval) clearInterval(dirtyInterval);
    dirtyInterval = setInterval(() => {
      updateDirtySlider(currentDirtyIdx + 1);
    }, 3600);
  }

  window.goDirty = function(idx) {
    updateDirtySlider(idx);
    startDirtyTimer();
  };

  window.prevDirtySlide = function() {
    updateDirtySlider(currentDirtyIdx - 1);
    startDirtyTimer();
  };

  window.nextDirtySlide = function() {
    updateDirtySlider(currentDirtyIdx + 1);
    startDirtyTimer();
  };

  if (btnDirtyPrev) btnDirtyPrev.addEventListener('click', window.prevDirtySlide);
  if (btnDirtyNext) btnDirtyNext.addEventListener('click', window.nextDirtySlide);

  if (dirtyTrack) {
    updateDirtySlider(0);
    startDirtyTimer();
  }

  // =============================================================
  // 2. POINT 03 PROTECTION SHOWCASE SLIDER (#p3Track)
  // =============================================================
  const p3Track = document.getElementById('p3Track');
  const p3Dots = document.querySelectorAll('.dot-p3');
  const btnP3Prev = document.getElementById('btnP3Prev');
  const btnP3Next = document.getElementById('btnP3Next');
  const totalP3Slides = 3;
  let currentP3Idx = 0;
  let p3Interval = null;

  function updateP3Slider(idx) {
    if (!p3Track) return;
    currentP3Idx = (idx + totalP3Slides) % totalP3Slides;
    p3Track.style.transform = `translateX(-${currentP3Idx * 100}%)`;

    p3Dots.forEach((dot, i) => {
      if (i === currentP3Idx) {
        dot.classList.add('bg-brand-ice', 'scale-125');
        dot.classList.remove('bg-white/40', 'scale-100');
      } else {
        dot.classList.remove('bg-brand-ice', 'scale-125');
        dot.classList.add('bg-white/40', 'scale-100');
      }
    });
  }

  function startP3Timer() {
    if (p3Interval) clearInterval(p3Interval);
    p3Interval = setInterval(() => {
      updateP3Slider(currentP3Idx + 1);
    }, 4000);
  }

  window.goP3 = function(idx) {
    updateP3Slider(idx);
    startP3Timer();
  };

  window.prevP3Slide = function() {
    updateP3Slider(currentP3Idx - 1);
    startP3Timer();
  };

  window.nextP3Slide = function() {
    updateP3Slider(currentP3Idx + 1);
    startP3Timer();
  };

  if (btnP3Prev) btnP3Prev.addEventListener('click', window.prevP3Slide);
  if (btnP3Next) btnP3Next.addEventListener('click', window.nextP3Slide);

  if (p3Track) {
    updateP3Slider(0);
    startP3Timer();
  }
});

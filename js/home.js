/**
 * AirLab — Home Page Interactivity (Dual Sliders)
 */

document.addEventListener('DOMContentLoaded', function() {
  // -------------------------------------------------------------
  // Slider 1: Point 03 Protection Interactive Slider
  // -------------------------------------------------------------
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slider-item');
  const dots = document.querySelectorAll('.slider-dot');
  const buttons = document.querySelectorAll('.slider-btn');
  const totalSlides = slides.length;
  let slideInterval = null;

  function showSlide(index) {
    if (totalSlides === 0) return;
    currentSlide = (index + totalSlides) % totalSlides;
    
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.remove('opacity-0', 'pointer-events-none');
        slide.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        slide.classList.add('opacity-0', 'pointer-events-none');
        slide.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('bg-brand-ice', 'w-8');
        dot.classList.remove('bg-slate-300', 'w-2.5');
      } else {
        dot.classList.remove('bg-brand-ice', 'w-8');
        dot.classList.add('bg-slate-300', 'w-2.5');
      }
    });

    buttons.forEach((btn, i) => {
      if (i === currentSlide) {
        btn.classList.add('border-brand-navy', 'bg-white', 'text-brand-navy', 'shadow-sm');
        btn.classList.remove('border-transparent', 'text-slate-600');
      } else {
        btn.classList.remove('border-brand-navy', 'bg-white', 'text-brand-navy', 'shadow-sm');
        btn.classList.add('border-transparent', 'text-slate-600');
      }
    });
  }

  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 3500);
  }

  window.goToSlide = function(idx) {
    showSlide(idx);
    startAutoSlide();
  };

  window.prevSlide = function() {
    showSlide(currentSlide - 1);
    startAutoSlide();
  };

  window.nextSlide = function() {
    showSlide(currentSlide + 1);
    startAutoSlide();
  };

  if (totalSlides > 0) {
    showSlide(0);
    startAutoSlide();
  }

  // -------------------------------------------------------------
  // Slider 2: Self-Diagnosis Dirty Contamination Slider
  // -------------------------------------------------------------
  let currentDirtyIdx = 0;
  const dirtyItems = document.querySelectorAll('.dirty-slide-item');
  const dirtyDots = document.querySelectorAll('.dirty-slider-dot');
  const totalDirty = dirtyItems.length;
  let dirtyInterval = null;

  function showDirtySlide(idx) {
    if (totalDirty === 0) return;
    currentDirtyIdx = (idx + totalDirty) % totalDirty;
    
    dirtyItems.forEach((item, i) => {
      if (i === currentDirtyIdx) {
        item.classList.remove('opacity-0', 'pointer-events-none');
        item.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        item.classList.add('opacity-0', 'pointer-events-none');
        item.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    dirtyDots.forEach((dot, i) => {
      if (i === currentDirtyIdx) {
        dot.classList.add('bg-brand-ice', 'w-6');
        dot.classList.remove('bg-white/40', 'w-2');
      } else {
        dot.classList.remove('bg-brand-ice', 'w-6');
        dot.classList.add('bg-white/40', 'w-2');
      }
    });
  }

  function startDirtyAutoSlide() {
    if (dirtyInterval) clearInterval(dirtyInterval);
    dirtyInterval = setInterval(() => {
      showDirtySlide(currentDirtyIdx + 1);
    }, 3800);
  }

  window.goDirtySlide = function(idx) {
    showDirtySlide(idx);
    startDirtyAutoSlide();
  };

  window.prevDirtySlide = function() {
    showDirtySlide(currentDirtyIdx - 1);
    startDirtyAutoSlide();
  };

  window.nextDirtySlide = function() {
    showDirtySlide(currentDirtyIdx + 1);
    startDirtyAutoSlide();
  };

  if (totalDirty > 0) {
    showDirtySlide(0);
    startDirtyAutoSlide();
  }
});

/**
 * AirLab Premium Engineering Care — Common Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const openIco = document.getElementById('menuOpenIcon');
  const closeIco = document.getElementById('menuCloseIcon');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      if (openIco) openIco.classList.toggle('hidden', isHidden);
      if (closeIco) closeIco.classList.toggle('hidden', !isHidden);
    });
  }

  // 2. Header Shadow on Scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }
});

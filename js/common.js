/**
 * AirLab Premium Engineering Care — Common Clean Scripts
 */

// -------------------------------------------------------------
// Universal Mobile Device Detection (Strict Mobile OS Check)
// -------------------------------------------------------------
window.isMobileDevice = function() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// -------------------------------------------------------------
// Universal Phone Call Handler (Desktop Alert vs Mobile Dialer)
// -------------------------------------------------------------
window.handlePhoneCall = function(phoneNum, e) {
  if (!window.isMobileDevice()) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    alert('📞 에어랩 (AirLab) 전화 상담 안내\n\n• 대표번호: 1522-0000\n• 담당 직통: 010-2678-4477\n• 운영시간: 09:00 ~ 19:00 (연중무휴)\n\n※ 모바일 기기에서는 터치 시 기본 전화 앱으로 바로 연결됩니다.');
    return false;
  }
  return true;
};

document.addEventListener('DOMContentLoaded', function() {
  // Global Event Delegation: Capture any tel: link click across the entire page
  document.addEventListener('click', function(e) {
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      if (!window.isMobileDevice()) {
        e.preventDefault();
        e.stopPropagation();
        const href = telLink.getAttribute('href') || 'tel:1522-0000';
        const num = href.replace('tel:', '');
        window.handlePhoneCall(num, e);
        return false;
      }
    }
  }, true);

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

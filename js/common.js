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
    const targetNum = phoneNum || '1522-0000';
    alert('📞 에어랩 (AirLab) 전화 상담 안내\n\n• 대표번호: 1522-0000\n• 운영시간: 09:00 ~ 19:00 (연중무휴)\n\n※ 모바일 기기에서는 터치 시 기본 전화 앱으로 바로 연결됩니다.');
    return false;
  }
  return true;
};

// -------------------------------------------------------------
// Universal Mobile Menu Toggle Controller
// -------------------------------------------------------------
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const openIco = document.getElementById('menuOpenIcon');
  const closeIco = document.getElementById('menuCloseIcon');
  
  if (mobileBtn && mobileMenu) {
    // Reset to closed state on initial load / page transition
    mobileMenu.classList.add('hidden');
    if (openIco) openIco.classList.remove('hidden');
    if (closeIco) closeIco.classList.add('hidden');

    // Attach direct onclick handler (idempotent, prevents duplicate event listeners)
    mobileBtn.onclick = function(e) {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (openIco) openIco.classList.add('hidden');
        if (closeIco) closeIco.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (openIco) openIco.classList.remove('hidden');
        if (closeIco) closeIco.classList.add('hidden');
      }
    };
  }
}

// -------------------------------------------------------------
// Header Scroll Shadow Controller
// -------------------------------------------------------------
function initHeaderScroll() {
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
}

// -------------------------------------------------------------
// Lifecycle Listeners
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initHeaderScroll();

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
});

// Support back/forward cache navigation (bfcache)
window.addEventListener('pageshow', function() {
  initMobileMenu();
});

/**
 * AirLab — Service & Pricing Table Interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
  window.toggleServiceFaq = function(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.faq-arrow');
    if (body) {
      const isOpen = !body.classList.contains('hidden');
      if (isOpen) {
        body.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        body.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    }
  };
});

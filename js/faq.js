/**
 * AirLab — FAQ Interactivity & Search
 */

document.addEventListener('DOMContentLoaded', function() {
  // Category Filtering
  window.filterCategory = function(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.remove('bg-brand-navy', 'text-white', 'shadow-soft');
      b.classList.add('bg-slate-100', 'text-slate-600');
    });
    btn.classList.remove('bg-slate-100', 'text-slate-600');
    btn.classList.add('bg-brand-navy', 'text-white', 'shadow-soft');

    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      if (cat === 'all' || item.getAttribute('data-cat') === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  };

  // Search Filtering
  window.handleFaqSearch = function(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes(q)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  };

  // Accordion Toggle
  window.toggleFaq = function(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.faq-icon');
    const isExpanded = !content.classList.contains('hidden');

    // Close all other faqs in the same group (optional)
    if (!isExpanded) {
      content.classList.remove('hidden');
      if (icon) icon.classList.add('rotate-180');
    } else {
      content.classList.add('hidden');
      if (icon) icon.classList.remove('rotate-180');
    }
  };
});

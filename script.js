
document.querySelectorAll('button:not([data-scroll])').forEach(btn => {
  btn.addEventListener('click', () => alert('ボタンがクリックされました！'));
});


function smoothScrollTo(targetSelector) {
  try {
    const el = document.querySelector(targetSelector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
  }
}


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    }
  });
});


document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.getAttribute('data-scroll');
    if (target) smoothScrollTo(target);
  });
});

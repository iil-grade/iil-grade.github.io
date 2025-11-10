// ボタンに簡単なクリックイベント（試験的）
// ボタンに簡単なクリックイベント（試験的）
// data-scroll 属性を持つボタンはスクロール処理を優先するため、
// アラートは data-scroll を持たないボタンにのみ付与します。
document.querySelectorAll('button:not([data-scroll])').forEach(btn => {
  btn.addEventListener('click', () => alert('ボタンがクリックされました！'));
});

// ページ内リンクと data-scroll 属性を持つ要素に対してスムーズスクロールを実装
function smoothScrollTo(targetSelector) {
  try {
    const el = document.querySelector(targetSelector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    // silent
  }
}

// a[href^="#"] の処理
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

// data-scroll を持つボタン等
document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.getAttribute('data-scroll');
    if (target) smoothScrollTo(target);
  });
});

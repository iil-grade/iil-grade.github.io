// document.querySelectorAll('button:not([data-scroll])').forEach(btn => {
//   btn.addEventListener('click', () => alert('ボタンがクリックされました！'));
// });

function smoothScrollTo(targetSelector) {
  try {
    const el = document.querySelector(targetSelector);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {}
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, "", href);
    }
  });
});

document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    const target = el.getAttribute("data-scroll");
    if (target) smoothScrollTo(target);
  });
});

// ================================
// 生産情報検索（デモ用）
// ================================

// ================================
// 生産情報検索（デモ用）
// ================================

// ================================
// 生産情報検索（デモ用）
// ================================

const sampleData = {
  12345678900: {
    producer: {
      name: "サンプル水産株式会社",
      representative: "山田 太郎",
      address: "愛知県〇〇市サンプル町1丁目2番3号",
      contact: "052-0000-0000",
      photo: "producer-sample.png",

      comment:
        "安心・安全な養殖にこだわり、品質管理を徹底した魚をお届けしています。",
    },

    product: {
      id: "12345678900",
      startDate: "平成19年01月19日",
      harvestDate: "平成19年05月18日",
      seedType: "人工",
      feed: [
        "サンプル配合飼料A2（サンプル飼料株式会社）",
        "テスト用高栄養飼料1号（サンプル飼料株式会社）",
        "デモ用養殖飼料No.2（サンプル飼料株式会社）",
      ],
      medicine: "使用なし",
      residueTest: "合格",
      safEel: true,
    },
  },
};

const searchBtn = document.getElementById("searchBtn");
const lotInput = document.getElementById("lotInput");
const result = document.getElementById("result");
const errorEl = document.getElementById("errorMessage");

function runSearch() {
  const input = lotInput.value.trim();

  // エラー初期化
  errorEl.style.display = "none";
  errorEl.innerHTML = "";

  // ① 11桁チェック
  if (!/^\d{11}$/.test(input)) {
    errorEl.innerHTML = "【識別番号】は数字11桁で入力して下さい。";
    errorEl.style.display = "block";
    result.innerHTML = "";
    return;
  }

  // ② 該当なし
  if (!sampleData[input]) {
    errorEl.textContent =
      "入力された識別番号に該当する生産情報データはありません。";
    errorEl.style.display = "block";
    result.innerHTML = "";
    return;
  }

  // ③ 正常時
  errorEl.style.display = "none";

  const d = sampleData[input];

  result.innerHTML = `
<div class="card" style="max-width: 900px; margin: 0 auto; text-align:left;">
  <h3>生産者情報</h3>

  <!-- 写真エリア（横並びはここまで） -->
  <div class="producer-profile">
    <img
      src="${d.producer.photo}"
      alt="生産者 ${d.producer.representative}"
      class="producer-photo"
    />
    <p class="photo-note">※掲載写真はサンプルです</p>
  </div>

  <!-- 👇 ここからは通常の縦レイアウト -->
  <div class="producer-info">
    <p><strong>識別番号：</strong>${d.product.id}</p>
    <p><strong>生産者名：</strong>${d.producer.name}</p>
    <p><strong>代表者名：</strong>${d.producer.representative}</p>
    <p><strong>住所：</strong>${d.producer.address}</p>
    <p><strong>連絡先：</strong>${d.producer.contact}</p>
    <p>
      <strong>SAF-EEL マーク：</strong>
      <span style="color:#16a34a; font-weight:600;">付与</span>
    </p>
  </div>

  <p><strong>生産者コメント：</strong>${d.producer.comment}</p>

  <hr style="margin:1.5rem 0;">

  <h3>生産情報</h3>

  <p><strong>給餌した飼料：</strong></p>
  <ul>
    ${d.product.feed.map((f) => `<li>${f}</li>`).join("")}
  </ul>

  <p><strong>使用医薬品：</strong>${d.product.medicine}</p>
  <p><strong>残留検査：</strong>合格</p>

  <button class="btn-outline" onclick="window.print()">
    生産情報データを印刷する
  </button>
</div>
`;


  // 検索結果が表示されたら少しスクロール
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

searchBtn.addEventListener("click", runSearch);

lotInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    runSearch();
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

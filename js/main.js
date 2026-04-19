// CLEARMAX PRO - 메인 스크립트
// 번호는 data.js에서 관리, 페이지에 텍스트로 노출하지 않음

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  renderTable();
  initFAQ();
  initScrollAnimation();
  initFilters();
});

// ======================== NAVIGATION
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // 메뉴 링크 클릭 시 닫기
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }
}

// ======================== TABLE & CARDS
let filteredData = [...wiperData];

function renderTable() {
  renderDesktopTable(filteredData);
  renderMobileCards(filteredData);
  document.getElementById('resultCount').textContent = `${filteredData.length}개 차종 표시 중`;
}

function renderDesktopTable(data) {
  const tbody = document.getElementById('wiperTableBody');
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="no-result">검색 결과가 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(row => {
    const color = brandColors[row.brand] || '#666';
    return `<tr>
      <td><span class="brand-badge" style="background:${color}">${row.brand}</span></td>
      <td>${row.model}</td>
      <td><span class="adapter-badge">${row.adapter}</span></td>
      <td class="size-text">${row.size}</td>
      <td>
        <button class="btn-sms" onclick="sendSMS('${escapeQuotes(row.brand)}', '${escapeQuotes(row.model)}', '${row.adapter}', '${row.size}')">
          📱 문자로 주문하기
        </button>
      </td>
    </tr>`;
  }).join('');
}

function renderMobileCards(data) {
  const container = document.getElementById('mobileCards');
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p class="no-result">검색 결과가 없습니다.</p>';
    return;
  }

  container.innerHTML = data.map(row => {
    const color = brandColors[row.brand] || '#666';
    return `<div class="mobile-card fade-in">
      <div class="mobile-card-header">
        <span class="brand-badge" style="background:${color}">${row.brand}</span>
        <span class="mobile-card-model">${row.model}</span>
      </div>
      <div class="mobile-card-info">
        <span><span class="adapter-badge">${row.adapter}</span></span>
        <span class="size-text">${row.size}</span>
        <button class="btn-sms" onclick="sendSMS('${escapeQuotes(row.brand)}', '${escapeQuotes(row.model)}', '${row.adapter}', '${row.size}')">
          📱 문자로 주문하기
        </button>
      </div>
    </div>`;
  }).join('');

  // 카드 fade-in 재적용
  setTimeout(() => {
    container.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }, 50);
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ======================== FILTERS
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const brandFilter = document.getElementById('brandFilter');

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  if (brandFilter) {
    brandFilter.addEventListener('change', applyFilters);
  }
}

function applyFilters() {
  const keyword = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const brand = document.getElementById('brandFilter')?.value || '';

  filteredData = wiperData.filter(row => {
    const matchBrand = !brand || row.brand === brand;
    const matchKeyword = !keyword || [row.brand, row.model, row.adapter, row.size].join(' ').toLowerCase().includes(keyword);
    return matchBrand && matchKeyword;
  });

  renderTable();
}

// ======================== FAQ
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // 모두 닫기
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // 클릭한 항목 열기
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ======================== SCROLL ANIMATION
function initScrollAnimation() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────────────
   ui.js — 헤더 + 플로팅 도크 공유 컴포넌트 (모든 페이지 공통)
   디자인 변경은 이 파일 하나만 수정하면 전 페이지에 반영됩니다.
   기준: index.html 헤더·도크 디자인 (Tailwind 수치를 px로 환산)
───────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var IS_PREV  = params.get('preview') === 'draft';
  var PREV_SFX = IS_PREV ? '?preview=draft' : '';

  var file = location.pathname.split('/').pop() || 'index.html';
  if (file === '') file = 'index.html';
  var ON_INDEX   = file === 'index.html';
  var ON_ARCHIVE = file === 'contents_spot.html';
  var ON_SPOT    = file === 'spot.html';
  var ON_CONTACT = file === 'contact.html';

  /* ═══════════════════════════════════════════════════════════════
     CSS — 모든 값은 index.html Tailwind 클래스를 px로 환산한 것
     ▸ py-5 = 20px  ▸ px-8 = 32px  ▸ py-3.5 = 14px  ▸ px-4 = 16px
     ▸ w-10/h-10 = 40px  ▸ text-xl = 20px  ▸ font-black = 900
     ▸ tracking-tighter = -0.05em  ▸ bottom-8 = 32px
  ═══════════════════════════════════════════════════════════════ */
  var css = [
    /* ── 헤더 공통 컨테이너 ── */
    '#ui-header{',
      'position:fixed;top:0;left:50%;transform:translateX(-50%);',
      'width:100%;max-width:480px;',
      'padding:20px 32px;',          /* py-5 px-8 */
      'min-height:80px;',            /* 버튼 유무 관계없이 동일 헤더 높이 */
      'z-index:50;pointer-events:none;',
      'display:flex;justify-content:space-between;align-items:center;',
    '}',

    /* ── 헤더 배경 베일 ── */
    '.ui-hdr-veil{',
      'position:absolute;inset:0;pointer-events:none;',
      'background:linear-gradient(to bottom,rgba(0,0,0,0.55),transparent);',
      '-webkit-backdrop-filter:blur(10px) saturate(120%);',
      'backdrop-filter:blur(10px) saturate(120%);',
      '-webkit-mask-image:linear-gradient(to bottom,#000 50%,transparent 100%);',
      'mask-image:linear-gradient(to bottom,#000 50%,transparent 100%);',
    '}',

    /* ── 폰트 렌더링 통일 (index.html Tailwind antialiased 기준) ── */
    'body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}',

    /* ── 브랜드명 (font-black text-xl tracking-tighter drop-shadow-md) ── */
    '.ui-brand{',
      'font-size:20px;',
      'line-height:1;',              /* Tailwind preflight(1.5) vs 브라우저 기본(~1.2) 상속 차단 */
      'font-weight:900;',
      'letter-spacing:-0.05em;',
      'color:#fff;',
      'filter:drop-shadow(0 4px 3px rgba(0,0,0,.07)) drop-shadow(0 2px 2px rgba(0,0,0,.06));',
      'z-index:10;',
    '}',

    /* ── 글래스 원형 버튼 (w-10 h-10 + .glass-circle) ── */
    '.ui-btn{',
      'width:40px;height:40px;border-radius:50%;',
      'display:flex;align-items:center;justify-content:center;',
      'pointer-events:auto;cursor:pointer;z-index:10;',
      'margin:0;padding:0;',
      '-webkit-appearance:none;appearance:none;',
      'background:rgba(255,255,255,0.04);',
      '-webkit-backdrop-filter:blur(8px) saturate(135%) brightness(0.9);',
      'backdrop-filter:blur(8px) saturate(135%) brightness(0.9);',
      'border:1px solid rgba(255,255,255,0.09);',
      'box-shadow:0 18px 40px rgba(0,0,0,0.18);',
      'color:#fff;',
      'flex-shrink:0;',
      'transition:background .25s,transform .15s;',
    '}',
    '.ui-btn:hover{background:rgba(255,255,255,0.09);}',
    '.ui-btn:active{transform:scale(.92);}',
    '.ui-btn.liked{background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.35);}',
    '.ui-btn.liked svg{fill:#f87171;stroke:#f87171;}',

    /* ── 버튼 행 (like + share) ── */
    '.ui-btn-row{display:flex;gap:10px;z-index:10;pointer-events:auto;}',

    /* ── 플로팅 도크 (glass fixed bottom-8 … py-3.5 px-4) ── */
    '#main-dock{',
      'position:fixed;bottom:32px;',  /* bottom-8 = 32px */
      'left:50%;transform:translateX(-50%);',
      'width:80%;max-width:300px;',
      'border-radius:26px;',
      'display:flex;justify-content:space-around;align-items:center;',
      'padding:14px 16px;',           /* py-3.5 = 14px  px-4 = 16px */
      'z-index:50;',
      'background:rgba(255,255,255,0.04);',
      '-webkit-backdrop-filter:blur(10px) saturate(135%) brightness(0.9);',
      'backdrop-filter:blur(10px) saturate(135%) brightness(0.9);',
      'border:1px solid rgba(255,255,255,0.09);',
      'box-shadow:0 30px 64px rgba(0,0,0,0.30);',
    '}',
    /* ── 버튼: 브라우저 기본값·Tailwind 상속값 완전 차단 ── */
    '.dock-btn{',
      'display:flex;flex-direction:column;align-items:center;',
      'padding:0 12px;',
      'margin:0;',
      'background:none;border:none;outline:none;',
      '-webkit-appearance:none;appearance:none;',  /* 네이티브 버튼 패딩/높이 제거 */
      'cursor:pointer;',
      'color:rgba(255,255,255,0.55);',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'font-size:0;',          /* 버튼 자체 font-size 0으로 고정, 자식에만 명시 */
      'line-height:1;',        /* Tailwind(1.5) vs 브라우저 기본(normal) 차이 차단 */
      'transition:color .18s;',
    '}',
    '.dock-btn:hover{color:rgba(255,255,255,0.90);}',
    '.dock-btn:hover .dock-icon{transform:translateY(-2px);}',
    '.dock-btn.dock-active{color:#fff;}',
    '.dock-icon{display:block;flex-shrink:0;transition:transform .18s;}',  /* block: 인라인 gap 제거 */
    '.dock-label{',
      'font-size:10px;',       /* 절대px — 부모 font-size:0 상관없음 */
      'line-height:1;',        /* 명시 고정 — 상속 차단 */
      'font-weight:700;letter-spacing:.01em;white-space:nowrap;margin-top:4px;',
      'display:block;',
    '}',
    '.dock-btn.dock-active .dock-label{font-weight:800;}',

    /* ── 페이지 공통 컨테이너 + 타이틀 (아카이브 기준) ── */
    '.ui-container{max-width:480px;margin:0 auto;padding:96px 32px 120px;background:#111116;min-height:100dvh;}',
    '.page-head{margin-bottom:20px;}',
    '.page-title{font-size:24px;font-weight:900;color:rgba(255,255,255,0.90);letter-spacing:-.02em;line-height:1.25;margin-bottom:6px;display:flex;align-items:center;gap:10px;}',
    '.page-sub{font-size:13px;color:rgba(255,255,255,0.28);font-weight:500;}',
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ═══════════════════════════════════════════════════════════════
     SVG 헬퍼
  ═══════════════════════════════════════════════════════════════ */
  function hdrSvg(paths, sw, sz) {
    sz = sz || 20;
    return '<svg width="'+sz+'" height="'+sz+'" fill="none" stroke="currentColor" viewBox="0 0 24 24">'
      + paths.map(function(d){
          return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="'+sw+'" d="'+d+'"/>';
        }).join('')
      + '</svg>';
  }
  function dockSvg(paths, sw) {
    return '<svg class="dock-icon" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">'
      + paths.map(function(d){
          return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="'+sw+'" d="'+d+'"/>';
        }).join('')
      + '</svg>';
  }

  /* 아이콘 경로 */
  var D_BACK   = ['M15 19l-7-7 7-7'];
  var D_SEARCH = ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'];
  var D_HEART  = ['M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'];
  var D_SHARE  = ['M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'];
  var D_HOME   = ['M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'];
  var D_ARCH   = ['M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'];
  var D_REPORT = ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'];

  /* ═══════════════════════════════════════════════════════════════
     헤더 생성 (페이지별)
  ═══════════════════════════════════════════════════════════════ */
  var hdr = document.createElement('header');
  hdr.id = 'ui-header';

  if (ON_INDEX) {
    /* index: 브랜드(좌) + 검색(우) */
    hdr.innerHTML =
      '<div class="ui-hdr-veil"></div>'
      + '<div class="ui-brand" id="brand-name">심야 드라이브</div>'
      + '<button class="ui-btn" id="ui-search-btn">'
        + hdrSvg(D_SEARCH, '2')
      + '</button>';

  } else if (ON_ARCHIVE) {
    /* archive: 브랜드(좌) + 검색(우) */
    hdr.innerHTML =
      '<div class="ui-hdr-veil"></div>'
      + '<div class="ui-brand" id="brand-name">심야 드라이브</div>'
      + '<button class="ui-btn" id="ui-search-btn">'
        + hdrSvg(D_SEARCH, '2')
      + '</button>';

  } else if (ON_CONTACT) {
    /* contact: 브랜드(좌) */
    hdr.innerHTML =
      '<div class="ui-hdr-veil"></div>'
      + '<div class="ui-brand" id="brand-name">심야 드라이브</div>';

  } else if (ON_SPOT) {
    /* spot: 뒤로(좌) + 브랜드(중앙, 절대위치) + 좋아요·공유(우) */
    hdr.style.position = 'fixed';
    hdr.innerHTML =
      '<div class="ui-hdr-veil"></div>'
      + '<button class="ui-btn" id="ui-back-btn">'
        + hdrSvg(D_BACK, '2.5', 20)
      + '</button>'
      + '<div class="ui-brand" id="brand-name"'
        + ' style="position:absolute;left:50%;transform:translateX(-50%);text-align:center;pointer-events:none;">'
        + '심야 드라이브'
      + '</div>'
      + '<div class="ui-btn-row">'
        + '<button class="ui-btn" id="like-btn">' + hdrSvg(D_HEART, '1.8', 19) + '</button>'
        + '<button class="ui-btn" id="share-btn">' + hdrSvg(D_SHARE, '1.8', 19) + '</button>'
      + '</div>';
  }

  document.body.insertBefore(hdr, document.body.firstChild);

  /* ── 헤더 버튼 이벤트 ── */
  if (ON_INDEX || ON_ARCHIVE) {
    document.getElementById('ui-search-btn').addEventListener('click', function () {
      if (ON_ARCHIVE) {
        /* archive: 페이지 내 검색창 포커스 */
        var inp = document.getElementById('search-input');
        if (inp) { inp.focus(); inp.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      } else {
        /* index 등: contents_spot.html 검색 모드로 이동 */
        var qs = 'search=1' + (IS_PREV ? '&preview=draft' : '');
        location.href = 'contents_spot.html?' + qs;
      }
    });
  }
  if (ON_SPOT) {
    document.getElementById('ui-back-btn').addEventListener('click', function () {
      if (history.length > 1) history.back();
      else location.href = 'index.html' + PREV_SFX;
    });
    document.getElementById('like-btn').addEventListener('click', function () {
      this.classList.toggle('liked');
    });
    document.getElementById('share-btn').addEventListener('click', function () {
      var title = document.title || '심야 드라이브';
      if (navigator.share) {
        navigator.share({ title: title, url: location.href });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href);
      }
    });
  }

  /* ── 브랜드명을 localStorage에서 로드 ── */
  setTimeout(function () {
    try {
      var key = IS_PREV ? 'nightDriveConfig_draft' : 'nightDriveConfig';
      var d = JSON.parse(localStorage.getItem(key) || '{}');
      var el = document.getElementById('brand-name');
      if (el && d.brandName) el.textContent = d.brandName;
    } catch (e) {}
  }, 0);

  /* ═══════════════════════════════════════════════════════════════
     도크 생성
  ═══════════════════════════════════════════════════════════════ */
  var dockHomeIcon = dockSvg(D_HOME, ON_INDEX ? '2.5' : '2');
  var nav = document.createElement('nav');
  nav.id = 'main-dock';
  nav.setAttribute('role', 'navigation');
  nav.innerHTML =
    '<button class="dock-btn' + (ON_INDEX   ? ' dock-active' : '') + '" id="dock-home">'
      + dockHomeIcon + '<span class="dock-label">홈</span>'
    + '</button>'
    + '<button class="dock-btn' + (ON_ARCHIVE ? ' dock-active' : '') + '" id="dock-archive">'
      + dockSvg(D_ARCH, '2') + '<span class="dock-label">아카이브</span>'
    + '</button>'
    + '<button class="dock-btn' + (ON_CONTACT ? ' dock-active' : '') + '" id="dock-report">'
      + dockSvg(D_REPORT, ON_CONTACT ? '2.5' : '2') + '<span class="dock-label">제보</span>'
    + '</button>';
  document.body.appendChild(nav);

  document.getElementById('dock-home').addEventListener('click', function () {
    if (ON_INDEX) {
      var mc = document.getElementById('main-container');
      var first = mc && mc.querySelector('section');
      if (first) first.scrollIntoView({ behavior: 'smooth' });
    } else {
      location.href = 'index.html' + PREV_SFX;
    }
  });
  document.getElementById('dock-archive').addEventListener('click', function () {
    if (!ON_ARCHIVE) location.href = 'contents_spot.html' + PREV_SFX;
  });
  document.getElementById('dock-report').addEventListener('click', function () {
    location.href = 'contact.html' + PREV_SFX;
  });

})();

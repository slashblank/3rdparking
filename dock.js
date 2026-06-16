/* ─────────────────────────────────────────────
   dock.js — 공유 플로팅 도크 (모든 페이지 공통)
   디자인·메뉴 변경은 이 파일 하나만 수정하면 됩니다.
───────────────────────────────────────────── */
(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var IS_PREV  = params.get('preview') === 'draft';
  var PREV_SFX = IS_PREV ? '?preview=draft' : '';

  var file = location.pathname.split('/').pop() || 'index.html';
  // Vercel root '/' → treat as index
  if (file === '') file = 'index.html';

  var ON_INDEX   = file === 'index.html';
  var ON_ARCHIVE = file === 'contents_spot.html';

  /* ── CSS (index.html .glass 클래스와 동일 스펙) ── */
  var style = document.createElement('style');
  style.textContent = [
    '#main-dock{',
      'position:fixed;bottom:32px;',
      'left:50%;transform:translateX(-50%);',
      'width:80%;max-width:300px;',
      'border-radius:26px;',
      'display:flex;justify-content:space-around;align-items:center;',
      'padding:12px 16px;',
      'z-index:50;',
      'background:rgba(255,255,255,0.04);',
      '-webkit-backdrop-filter:blur(10px) saturate(135%) brightness(0.9);',
      'backdrop-filter:blur(10px) saturate(135%) brightness(0.9);',
      'border:1px solid rgba(255,255,255,0.09);',
      'box-shadow:0 30px 64px rgba(0,0,0,0.30);',
    '}',
    '.dock-btn{',
      'display:flex;flex-direction:column;align-items:center;',
      'padding:0 12px;background:none;border:none;cursor:pointer;',
      'color:rgba(255,255,255,0.55);',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'transition:color .18s;',
    '}',
    '.dock-btn:hover{color:rgba(255,255,255,0.90);}',
    '.dock-btn:hover .dock-icon{transform:translateY(-2px);}',
    '.dock-btn.dock-active{color:#fff;}',
    '.dock-icon{transition:transform .18s;}',
    '.dock-label{font-size:10px;font-weight:700;letter-spacing:.01em;white-space:nowrap;margin-top:4px;}',
    '.dock-btn.dock-active .dock-label{font-weight:800;}',
  ].join('');
  document.head.appendChild(style);

  /* ── SVG helpers ── */
  function svg(paths, sw) {
    return '<svg class="dock-icon" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">'
      + paths.map(function(d){ return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="'+sw+'" d="'+d+'"/>'; }).join('')
      + '</svg>';
  }

  var ICO_HOME    = svg(['M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'], ON_INDEX?'2.5':'2');
  var ICO_ARCHIVE = svg(['M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'], '2');
  var ICO_SAVE    = svg(['M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'], '2');

  /* ── DOM ── */
  var nav = document.createElement('nav');
  nav.id = 'main-dock';
  nav.setAttribute('role', 'navigation');
  nav.innerHTML =
    '<button class="dock-btn'+(ON_INDEX?' dock-active':'')+'" id="dock-home">'
      + ICO_HOME + '<span class="dock-label">홈</span>'
    + '</button>'
    + '<button class="dock-btn'+(ON_ARCHIVE?' dock-active':'')+'" id="dock-archive">'
      + ICO_ARCHIVE + '<span class="dock-label">아카이브</span>'
    + '</button>'
    + '<button class="dock-btn" id="dock-save">'
      + ICO_SAVE + '<span class="dock-label">저장</span>'
    + '</button>';
  document.body.appendChild(nav);

  /* ── 이벤트 ── */
  document.getElementById('dock-home').addEventListener('click', function () {
    if (ON_INDEX) {
      // index: 첫 섹션으로 스크롤
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

  // 저장: 추후 기능 연결
  document.getElementById('dock-save').addEventListener('click', function () {});

})();

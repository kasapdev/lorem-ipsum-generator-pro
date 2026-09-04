/* =====================================================================
   Lorem Ipsum Generator Pro — app.js
   Generates placeholder text (words/sentences/paragraphs/list items)
   from a classic Latin bank or original themed word banks.
   Classic script (no modules). Depends on window.WUS (core.js).
   ===================================================================== */
(function () {
  'use strict';

  var WUS = window.WUS;
  var STORE_KEY = 'loremipsum.state';

  /* ----------------------------- DOM refs ---------------------------- */
  var unitSelect    = document.getElementById('unitSelect');
  var countInput    = document.getElementById('countInput');
  var bankSelect    = document.getElementById('bankSelect');
  var startClassic  = document.getElementById('startClassic');
  var htmlOutput    = document.getElementById('htmlOutput');

  var outputCode    = document.getElementById('outputCode');
  var outputStats   = document.getElementById('outputStats');
  var emptyState    = document.getElementById('emptyState');

  var statusBadge   = document.getElementById('statusBadge');
  var statusText    = document.getElementById('statusText');

  var btnGenerate      = document.getElementById('btnGenerate');
  var btnGenerateEmpty = document.getElementById('btnGenerateEmpty');
  var btnCopy           = document.getElementById('btnCopy');
  var btnDownload        = document.getElementById('btnDownload');

  var lastOutputPlain = ''; // raw text/HTML used for copy/download

  /* =================================================================
     WORD BANKS
     ================================================================= */
  var CLASSIC_OPENER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  var BANKS = {
    classic: {
      label: 'Classic Latin',
      opener: CLASSIC_OPENER,
      words: ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud ' +
        'exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure ' +
        'in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint ' +
        'occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est ' +
        'laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis praesentium ' +
        'voluptatum deleniti atque corrupti quos quas molestias excepturi').split(/\s+/)
    },
    tech: {
      label: 'Tech Jargon',
      opener: 'Refactor the microservice before the endpoint hits production.',
      words: ('microservice kubernetes container endpoint latency refactor deploy pipeline ' +
        'containerize orchestrate cluster namespace webhook middleware payload async cache ' +
        'throttle scalable serverless bandwidth backend frontend repository commit merge ' +
        'branch rollback rollout canary telemetry observability latency uptime throughput ' +
        'idempotent stateless queue broker schema migration sharding replica failover ' +
        'kernel runtime compiler linter bundler transpile hotfix regression').split(/\s+/)
    },
    corporate: {
      label: 'Corporate Buzzwords',
      opener: 'Let us leverage synergy to unlock actionable stakeholder value.',
      words: ('synergy leverage bandwidth actionable stakeholder deliverable paradigm pivot ' +
        'circle back touch base low hanging fruit bleeding edge scalable growth mindset ' +
        'value add core competency best practice thought leadership disrupt streamline ' +
        'optimize incentivize monetize onboard alignment roadmap milestone runway pipeline ' +
        'headcount bandwidth ideate iterate empower holistic proactive robust seamless ' +
        'granular cross functional net new quick win').split(/\s+/)
    },
    scifi: {
      label: 'Space & Sci-Fi',
      opener: 'The starship drifted past the nebula toward an unknown galaxy.',
      words: ('starship nebula galaxy asteroid wormhole android hyperspace quantum photon ' +
        'plasma reactor cryosleep colony terraform exoplanet orbit gravity singularity ' +
        'android sentient android alien signal transmission airlock thruster warp drive ' +
        'meteor comet supernova nebula pulsar quasar rover probe satellite station crew ' +
        'commander navigator android robot android console corridor bulkhead beacon relic ' +
        'artifact expedition frontier voyage').split(/\s+/)
    }
  };

  /* =================================================================
     RANDOM HELPERS
     ================================================================= */
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pickWord(words) {
    return words[randInt(0, words.length - 1)];
  }
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* =================================================================
     GENERATION
     Build sentences -> paragraphs -> words/list-items, with realistic
     length variance, from a bank's word pool.
     ================================================================= */
  function buildSentence(words) {
    var len = randInt(8, 16);
    var picked = [];
    for (var i = 0; i < len; i++) picked.push(pickWord(words));
    var text = picked.join(' ');
    return capitalize(text) + '.';
  }

  function buildParagraph(words) {
    var count = randInt(3, 7);
    var sentences = [];
    for (var i = 0; i < count; i++) sentences.push(buildSentence(words));
    return sentences.join(' ');
  }

  function buildListItem(words) {
    var len = randInt(3, 8);
    var picked = [];
    for (var i = 0; i < len; i++) picked.push(pickWord(words));
    return capitalize(picked.join(' '));
  }

  /* Returns an array of raw text units (words | sentences | paragraphs | list items). */
  function generateUnits(unit, count, bankKey, prependClassic) {
    var bank = BANKS[bankKey] || BANKS.classic;
    var words = bank.words;
    var units = [];

    if (unit === 'words') {
      for (var i = 0; i < count; i++) units.push(pickWord(words));
      if (prependClassic && units.length) {
        var openerWords = bank.opener.replace(/[.,]/g, '').split(/\s+/);
        units = openerWords.slice(0, count);
        for (var j = units.length; j < count; j++) units.push(pickWord(words));
      }
    } else if (unit === 'sentences') {
      for (var s = 0; s < count; s++) units.push(buildSentence(words));
      if (prependClassic && units.length) units[0] = bank.opener;
    } else if (unit === 'paragraphs') {
      for (var p = 0; p < count; p++) units.push(buildParagraph(words));
      if (prependClassic && units.length) units[0] = bank.opener + ' ' + units[0];
    } else if (unit === 'list') {
      for (var l = 0; l < count; l++) units.push(buildListItem(words));
      if (prependClassic && units.length) units[0] = capitalize(bank.opener.replace(/\.$/, ''));
    }
    return units;
  }

  /* =================================================================
     RENDERING — plain text or literal HTML-tag source (shown as text)
     ================================================================= */
  function wrapTag(tag, content) {
    return '&lt;' + tag + '&gt;' + WUS.escapeHtml(content) + '&lt;/' + tag + '&gt;';
  }

  function renderPlain(unit, units) {
    if (unit === 'words') return units.join(' ');
    if (unit === 'sentences') return units.join(' ');
    if (unit === 'paragraphs') return units.join('\n\n');
    if (unit === 'list') return units.map(function (u) { return '- ' + u; }).join('\n');
    return '';
  }

  function renderHtmlMarkupSource(unit, units) {
    // Literal HTML source, escaped so it displays as visible text.
    if (unit === 'words') return WUS.escapeHtml(units.join(' '));
    if (unit === 'sentences') return WUS.escapeHtml(units.join(' '));
    if (unit === 'paragraphs') {
      return units.map(function (u) { return wrapTag('p', u); }).join('\n');
    }
    if (unit === 'list') {
      var items = units.map(function (u) { return '  ' + wrapTag('li', u); }).join('\n');
      return '&lt;ul&gt;\n' + items + '\n&lt;/ul&gt;';
    }
    return '';
  }

  function renderHtmlMarkupPlain(unit, units) {
    // Actual HTML markup (unescaped) — used for the downloaded/copied file content.
    if (unit === 'words') return units.join(' ');
    if (unit === 'sentences') return units.join(' ');
    if (unit === 'paragraphs') {
      return units.map(function (u) { return '<p>' + u + '</p>'; }).join('\n');
    }
    if (unit === 'list') {
      var items = units.map(function (u) { return '  <li>' + u + '</li>'; }).join('\n');
      return '<ul>\n' + items + '\n</ul>';
    }
    return '';
  }

  /* =================================================================
     UI actions
     ================================================================= */
  function currentCount() {
    var v = Math.round(Number(countInput.value));
    if (!isFinite(v) || v < 1) v = 1;
    if (v > 500) v = 500;
    countInput.value = v;
    return v;
  }

  function setStatus(text, ready) {
    statusBadge.classList.toggle('is-ready', !!ready);
    statusText.textContent = text;
  }

  function updateStats(plainForCount) {
    var words = plainForCount.trim() ? plainForCount.trim().split(/\s+/).length : 0;
    var chars = plainForCount.length;
    outputStats.textContent = words.toLocaleString() + ' words · ' + chars.toLocaleString() + ' chars';
  }

  function generate() {
    var unit = unitSelect.value;
    var count = currentCount();
    var bankKey = bankSelect.value;
    var prepend = startClassic.checked;
    var useHtml = htmlOutput.checked;

    var units = generateUnits(unit, count, bankKey, prepend);
    var displaySource = useHtml ? renderHtmlMarkupSource(unit, units) : WUS.escapeHtml(renderPlain(unit, units));
    var copyContent = useHtml ? renderHtmlMarkupPlain(unit, units) : renderPlain(unit, units);

    outputCode.innerHTML = displaySource;
    emptyState.classList.add('is-hidden');
    lastOutputPlain = copyContent;

    updateStats(renderPlain(unit, units));
    setStatus('Generated ' + count + ' ' + unit, true);
    persist();
  }

  function copyOutput() {
    if (!lastOutputPlain) { WUS.toast('Nothing to copy yet', 'error'); return; }
    WUS.copy(lastOutputPlain, 'Output copied to clipboard');
  }

  function downloadOutput() {
    if (!lastOutputPlain) { WUS.toast('Nothing to download yet', 'error'); return; }
    var useHtml = htmlOutput.checked;
    var name = 'lorem-ipsum-' + new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-') + (useHtml ? '.html' : '.txt');
    WUS.download(name, lastOutputPlain, useHtml ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8');
    WUS.toast('Downloaded ' + name);
  }

  /* =================================================================
     PERSISTENCE
     ================================================================= */
  function persist() {
    WUS.store.set(STORE_KEY, {
      unit: unitSelect.value,
      count: countInput.value,
      bank: bankSelect.value,
      startClassic: startClassic.checked,
      htmlOutput: htmlOutput.checked
    });
  }

  function restore() {
    var saved = WUS.store.get(STORE_KEY, null);
    if (!saved) return;
    if (saved.unit) unitSelect.value = saved.unit;
    if (saved.count) countInput.value = saved.count;
    if (saved.bank) bankSelect.value = saved.bank;
    startClassic.checked = saved.startClassic !== false;
    htmlOutput.checked = !!saved.htmlOutput;
  }

  /* =================================================================
     SHORTCUTS HELP MODAL
     ================================================================= */
  var helpBackdrop = document.getElementById('helpBackdrop');
  var helpClose    = document.getElementById('helpClose');
  var shortcutRows = document.getElementById('shortcutRows');

  var SHORTCUTS = [
    { keys: ['mod', '⏎'], desc: 'Generate text' },
    { keys: ['mod', 'C'], desc: 'Copy output (when focused outside inputs)' },
    { keys: ['?'], desc: 'Show this help' },
    { keys: ['Esc'], desc: 'Close dialog' }
  ];

  function buildShortcutTable() {
    var html = '';
    SHORTCUTS.forEach(function (s) {
      var kbds = s.keys.map(function (k) { return '<kbd>' + WUS.escapeHtml(k) + '</kbd>'; }).join('');
      html += '<tr><td>' + WUS.escapeHtml(s.desc) + '</td><td>' + kbds + '</td></tr>';
    });
    shortcutRows.innerHTML = html;
  }

  function openHelp() { helpBackdrop.hidden = false; helpClose.focus(); }
  function closeHelp() { helpBackdrop.hidden = true; }

  helpClose.addEventListener('click', closeHelp);
  helpBackdrop.addEventListener('click', function (e) {
    if (e.target === helpBackdrop) closeHelp();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !helpBackdrop.hidden) closeHelp();
  });

  var helpBtns = document.querySelectorAll('[data-shortcut-help]');
  for (var i = 0; i < helpBtns.length; i++) helpBtns[i].addEventListener('click', openHelp);

  /* =================================================================
     WIRING
     ================================================================= */
  btnGenerate.addEventListener('click', generate);
  btnGenerateEmpty.addEventListener('click', generate);
  btnCopy.addEventListener('click', copyOutput);
  btnDownload.addEventListener('click', downloadOutput);

  unitSelect.addEventListener('change', function () { persist(); generate(); });
  bankSelect.addEventListener('change', function () { persist(); generate(); });
  startClassic.addEventListener('change', function () { persist(); generate(); });
  htmlOutput.addEventListener('change', function () { persist(); generate(); });
  countInput.addEventListener('change', function () { persist(); generate(); });

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });

  WUS.registerShortcut('mod+enter', function () { generate(); }, 'Generate text');
  WUS.registerShortcut('?', function () { openHelp(); }, 'Show shortcuts');

  /* =================================================================
     INIT
     ================================================================= */
  buildShortcutTable();
  restore();
  generate();
})();

// ╔══════════════════════════════════════════════════╗
// ║  Wail Rhazouani — Portfolio JS                   ║
// ╚══════════════════════════════════════════════════╝

// ── CLOCK ─────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 10000);

// ── FAKE SYSTEM STATS ─────────────────────────────────
function updateStats() {
  const mem = 58 + Math.floor(Math.random() * 14);
  const cpu = 4  + Math.floor(Math.random() * 18);
  document.getElementById('mem-display').textContent = `MEM ${mem}%`;
  document.getElementById('cpu-display').textContent = `CPU ${cpu}%`;
}
setInterval(updateStats, 4000);

// ── SCROLL PROGRESS ───────────────────────────────────
document.getElementById('main').addEventListener('scroll', function () {
  const pct = this.scrollTop / (this.scrollHeight - this.clientHeight) || 0;
  document.getElementById('scroll-progress').style.width = (pct * 100) + '%';
});

// ── WORKSPACE DOTS ────────────────────────────────────
const pages = ['home', 'about', 'portfolio', 'pitch'];
const wsContainer = document.getElementById('ws-dots');
pages.forEach((p, i) => {
  const dot = document.createElement('div');
  dot.className = 'ws-dot' + (i === 0 ? ' active' : '');
  dot.dataset.page = p;
  dot.title = p;
  dot.addEventListener('click', () => showPage(p));
  wsContainer.appendChild(dot);
});

// ── PAGE SWITCHER ─────────────────────────────────────
function showPage(name, triggerEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.ws-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.page === name);
  });
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  if (triggerEl) {
    triggerEl.classList.add('active');
  } else {
    const match = document.querySelector('.nav-item[onclick*="' + name + '"]');
    if (match) match.classList.add('active');
  }
  document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('scroll-progress').style.width = '0';
  return false;
}

// ── TYPEWRITER ────────────────────────────────────────
const phrases = [
  'kafka-topics.sh --create --topic events --partitions 6',
  'pyspark --master local[*] etl_pipeline.py',
  'podman run -d --rm --name kafka kafka-broker:kraft',
  'git push origin feature/stream-processor',
  'nvim ~/notes/distributed-systems.md',
  'docker compose up -d --scale worker=3',
  'curl -s localhost:8000/api/health | jq .',
  'htop  # monitoring the beast...',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(type, 2400); return; }
  } else {
    tw.textContent = phrase.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 24 : 52);
}
type();

// ── PROJECTS DATA ─────────────────────────────────────
const projects = [
  {
    num: '01',
    name: 'JobBridge MA — University-to-Job Platform',
    type: 'full-stack · data pipeline · ALX GCGO',
    purpose: "Address Morocco's 38% youth unemployment (ages 15-24) through an AI-powered three-sided platform connecting students, universities, and companies. Built with team 'Eclectic Innovators' for ALX GCGO 2026.",
    challenge: 'Schema-flexible database for 40+ university formats; real-time job ingestion handling bursty traffic; aligning three distinct stakeholder groups; cold-start matching for new graduate profiles.',
    solution: 'MongoDB for graduate profiles; Kafka KRaft for job posting streams; PySpark ALS nightly matching; FastAPI on DigitalOcean. Features: AI job matching, skill-gap analysis dashboard, verified talent profiles, mentor network.',
    chips: [{ l: 'Kafka', c: 'accent' }, { l: 'PySpark', c: 'purple' }, { l: 'FastAPI', c: 'green' }, { l: 'MongoDB', c: 'yellow' }, { l: 'ALX GCGO', c: '' }],
    hasModal: true,
  },
  {
    num: '02',
    name: 'Kafka Real-Time Pipeline — KRaft Mode',
    type: 'data engineering · streaming',
    purpose: 'Production-grade event streaming demo with Apache Kafka 3.9.0 in KRaft mode (no ZooKeeper). Showcases real-time consumer group management, multi-partition topics, and live Python producer/consumer pairs.',
    challenge: 'KRaft configuration in WSL2, partition rebalancing during consumer restarts, sub-100ms latency with kafka-python-ng, debugging offsets via KafkaAdminClient.',
    solution: 'Custom server.properties for KRaft, kafka-consumer-groups.sh for offset management, live Jupyter/VS Code demo with configurable partitions and replication, 15-slide dark navy/mint presentation deck.',
    chips: [{ l: 'Kafka KRaft', c: 'accent' }, { l: 'Python', c: 'green' }, { l: 'WSL2', c: '' }, { l: 'kafka-python-ng', c: 'yellow' }],
    hasModal: false,
  },
  {
    num: '03',
    name: 'Deep Learning from Scratch — NumPy Series',
    type: 'ml · education · research',
    purpose: 'Full neural architecture series — MLP, CNN, RNN, LSTM, GRU, Transformer Encoder — built with only NumPy and Matplotlib. Intuition-first, heavily commented, beginner-friendly with toy datasets.',
    challenge: 'Correct LSTM/GRU gate gradients without autodiff; Scaled Dot-Product Attention with causal masking; keeping code readable at every level of mathematical depth.',
    solution: 'All gradients derived analytically; numerically stable softmax; causal masks for the Transformer Encoder; progressive Jupyter notebooks with inline equations and step-by-step visualizations.',
    chips: [{ l: 'NumPy', c: 'purple' }, { l: 'Matplotlib', c: 'orange' }, { l: 'LSTM/GRU', c: 'accent' }, { l: 'Transformer', c: 'cyan' }],
    hasModal: false,
  },
  {
    num: '04',
    name: 'Blockchain dApp — 8-Contract EVM',
    type: 'blockchain · web3 · solidity',
    purpose: 'Full decentralized application (TP 3) with 8 Solidity contracts covering ownership, access control, token minting, and inter-contract calls. React + Web3.js frontend with live on-chain state.',
    challenge: 'Gas optimization across 8 interdependent contracts; React frontend sync via Web3.js event subscriptions; Hardhat test coverage for all interactions.',
    solution: 'Minimal proxy pattern for factory contracts, event-driven React state, Ganache local dev, Truffle + Web3.js stack, structured Hardhat test suite.',
    chips: [{ l: 'Solidity', c: 'cyan' }, { l: 'Web3.js', c: 'accent' }, { l: 'React', c: 'green' }, { l: 'Hardhat', c: 'yellow' }],
    hasModal: false,
  },
  {
    num: '05',
    name: 'PySpark ALS Recommendation System',
    type: 'big data · ml · spark',
    purpose: 'Collaborative filtering at scale using PySpark MLlib ALS on MovieLens ratings. End-to-end distributed ML pipeline: ingest, transform, train, evaluate, recommend.',
    challenge: 'Cold-start for new users/items; hyperparameter tuning (rank, reg, iterations) on single-node cluster; converting MovieLens u.data format for Spark ingestion.',
    solution: 'CrossValidator grid search for ALS params, popularity fallback for cold-start, DataFrame API throughout, documented Jupyter notebook with RMSE analysis and live recommendation examples.',
    chips: [{ l: 'PySpark', c: 'orange' }, { l: 'MLlib ALS', c: 'purple' }, { l: 'MovieLens', c: 'accent' }, { l: 'DataFrame API', c: '' }],
    hasModal: false,
  },
];

// ── RENDER PROJECT CARDS ──────────────────────────────
function renderProjects() {
  const container = document.getElementById('projects-list');
  container.innerHTML = projects.map((p, i) => {
    const isFirst = i === 0, isLast = i === projects.length - 1;
    const radius  = isFirst && isLast ? '4px' : isFirst ? '4px 4px 0 0' : isLast ? '0 0 4px 4px' : '0';
    const bTop    = i > 0 ? 'border-top:none;' : '';

    const actionBtns = p.hasModal ? `
      <button onclick="event.stopPropagation();openJobBridgeModal('pdf')"
        style="font-family:inherit;font-size:10px;background:transparent;border:1px solid var(--border);color:var(--muted);padding:3px 10px;border-radius:2px;cursor:pointer"
        onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--muted)'">
        &#128196; Slide Deck
      </button>
      <button onclick="event.stopPropagation();openJobBridgeModal('video')"
        style="font-family:inherit;font-size:10px;background:transparent;border:1px solid var(--border);color:var(--muted);padding:3px 10px;border-radius:2px;cursor:pointer"
        onmouseover="this.style.borderColor='var(--green)';this.style.color='var(--green)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--muted)'">
        &#9654; Pitch Video
      </button>
      <a href="assets/jobbridge-deck.pdf" download="JobBridge_Presentation.pdf"
        style="font-family:inherit;font-size:10px;color:var(--muted);border:1px solid var(--border);padding:3px 10px;border-radius:2px;text-decoration:none;display:inline-flex;align-items:center;gap:4px"
        onmouseover="this.style.borderColor='var(--yellow)';this.style.color='var(--yellow)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--muted)'">
        &#8595; Download PDF
      </a>` : '';

    const featuredBadge = p.hasModal
      ? '<span style="font-size:9px;color:var(--accent);border:1px solid var(--accent);padding:1px 6px;border-radius:2px;margin-right:8px;letter-spacing:.06em;flex-shrink:0">FEATURED</span>'
      : '';

    return `
    <div class="project-card" style="${bTop}border-radius:${radius}">
      <div class="project-header" onclick="toggleProject(${i})">
        <div class="proj-num">${p.num}</div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-type">${p.type}</div>
        ${featuredBadge}
        <div class="proj-toggle" id="toggle-${i}">&#9654;</div>
      </div>
      <div class="project-body" id="body-${i}">
        <div>
          <div class="proj-section-label">Purpose</div>
          <div class="proj-section-text">${p.purpose}</div>
        </div>
        <div>
          <div class="proj-section-label">Challenges</div>
          <div class="proj-section-text">${p.challenge}</div>
        </div>
        <div>
          <div class="proj-section-label">Solutions</div>
          <div class="proj-section-text">${p.solution}</div>
        </div>
      </div>
      <div class="project-footer" id="footer-${i}" style="display:none;flex-wrap:wrap;gap:6px;align-items:center">
        ${p.chips.map(c => `<span class="chip ${c.c}">${c.l}</span>`).join('')}
        ${actionBtns}
      </div>
    </div>`;
  }).join('');
}

function toggleProject(i) {
  const body   = document.getElementById('body-' + i);
  const footer = document.getElementById('footer-' + i);
  const toggle = document.getElementById('toggle-' + i);
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  footer.style.display = isOpen ? 'none' : 'flex';
  toggle.classList.toggle('open', !isOpen);
}

renderProjects();

// ── JOBBRIDGE MODAL ───────────────────────────────────
let modalOpen = false;

function openJobBridgeModal(tab) {
  tab = tab || 'pdf';
  const modal = document.getElementById('jb-modal');
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  modalOpen = true;
  switchJBTab(tab);
}

function closeJobBridgeModal() {
  const modal = document.getElementById('jb-modal');
  modal.classList.remove('open');
  var ytIframe = document.getElementById('jb-yt-iframe');
  if (ytIframe) ytIframe.src = '';
  setTimeout(function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 200);
  modalOpen = false;
}

function switchJBTab(tab) {
  const pdfPane   = document.getElementById('jb-pane-pdf');
  const videoPane = document.getElementById('jb-pane-video');
  const tabPdf    = document.getElementById('tab-pdf');
  const tabVideo  = document.getElementById('tab-video');
  const ytIframe  = document.getElementById('jb-yt-iframe');

  if (tab === 'pdf') {
    pdfPane.style.display    = 'block';
    videoPane.style.display  = 'none';
    tabPdf.setAttribute('data-active', 'true');
    tabVideo.removeAttribute('data-active');
    if (ytIframe) ytIframe.src = '';
  } else {
    pdfPane.style.display    = 'none';
    videoPane.style.display  = 'flex';
    tabVideo.setAttribute('data-active', 'true');
    tabPdf.removeAttribute('data-active');
    if (ytIframe && !ytIframe.src.includes('youtube')) {
      ytIframe.src = ytIframe.dataset.src;
    }
  }
}

// ── TOAST ─────────────────────────────────────────────
function showToast(msg, duration) {
  duration = duration || 2500;
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, duration);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(function() { showToast('Copied: ' + text); })
    .catch(function() { showToast('Copy failed'); });
}

// ── COMMAND PALETTE ───────────────────────────────────
const cmdCommands = [
  { icon: '&#8962;',  label: 'Go to Home',             hint: 'page',    action: function() { showPage('home'); } },
  { icon: '&#167;',   label: 'Go to About',             hint: 'page',    action: function() { showPage('about'); } },
  { icon: '&#10792;', label: 'Go to Projects',          hint: 'page',    action: function() { showPage('portfolio'); } },
  { icon: '&#9658;',  label: 'Go to Pitch',             hint: 'page',    action: function() { showPage('pitch'); } },
  { icon: '&#128196;',label: 'View JobBridge Deck',     hint: 'project', action: function() { showPage('portfolio'); setTimeout(function(){ openJobBridgeModal('pdf'); }, 300); } },
  { icon: '&#127910;',label: 'Watch JobBridge Pitch',   hint: 'project', action: function() { showPage('portfolio'); setTimeout(function(){ openJobBridgeModal('video'); }, 300); } },
  { icon: '@',        label: 'Send Email',              hint: 'contact', action: function() { window.open('mailto:wail.rhazouani@uit.ac.ma'); } },
  { icon: '&#8997;',  label: 'Open GitHub',             hint: 'link',    action: function() { window.open('https://github.com/wailrhazouani-tech','_blank'); } },
  { icon: 'in',       label: 'Open LinkedIn',           hint: 'link',    action: function() { window.open('https://www.linkedin.com/in/wail-rhazouani','_blank'); } },
  { icon: '&#8595;',  label: 'Download Resume',         hint: 'file',    action: function() { var a=document.createElement('a'); a.href='assets/resume.pdf'; a.download='Resume_Wail_Rhazouani.pdf'; a.click(); showToast('Downloading resume...'); } },
  { icon: '&#8595;',  label: 'Download JobBridge PDF',  hint: 'file',    action: function() { var a=document.createElement('a'); a.href='assets/jobbridge-deck.pdf'; a.download='JobBridge_Presentation.pdf'; a.click(); showToast('Downloading deck...'); } },
  { icon: '&#9711;',  label: 'Copy Email',              hint: 'copy',    action: function() { copyToClipboard('wail.rhazouani@uit.ac.ma'); } },
];

let cmdSelected = 0;
let cmdFiltered = cmdCommands.slice();

function openCmd() {
  document.getElementById('cmd-overlay').classList.add('open');
  var input = document.getElementById('cmd-input');
  input.value = '';
  renderCmdResults('');
  setTimeout(function() { input.focus(); }, 50);
}

function closeCmd(e) {
  if (!e || e.target === document.getElementById('cmd-overlay')) {
    document.getElementById('cmd-overlay').classList.remove('open');
    document.getElementById('cmd-input').value = '';
  }
}

function renderCmdResults(query) {
  var q = query.toLowerCase().trim();
  cmdFiltered = q
    ? cmdCommands.filter(function(c) { return c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q); })
    : cmdCommands.slice();
  cmdSelected = 0;
  var container = document.getElementById('cmd-results');
  if (!cmdFiltered.length) {
    container.innerHTML = '<div style="padding:20px 16px;text-align:center;color:var(--muted);font-size:12px">No results for "' + query + '"</div>';
    return;
  }
  container.innerHTML = cmdFiltered.map(function(c, i) {
    return '<div class="cmd-result ' + (i === 0 ? 'selected' : '') + '" onclick="execCmd(' + i + ')">' +
      '<span class="cmd-result-icon">' + c.icon + '</span>' +
      '<span class="cmd-result-label">' + c.label + '</span>' +
      '<span class="cmd-result-hint">' + c.hint + '</span>' +
      '</div>';
  }).join('');
}

function execCmd(i) {
  var cmd = cmdFiltered[i];
  if (cmd) { closeCmd(); cmd.action(); }
}

function updateCmdSelection(delta) {
  var items = document.querySelectorAll('.cmd-result');
  if (!items.length) return;
  items[cmdSelected] && items[cmdSelected].classList.remove('selected');
  cmdSelected = (cmdSelected + delta + items.length) % items.length;
  items[cmdSelected] && items[cmdSelected].classList.add('selected');
  items[cmdSelected] && items[cmdSelected].scrollIntoView({ block: 'nearest' });
}

document.getElementById('cmd-input').addEventListener('input', function(e) { renderCmdResults(e.target.value); });
document.getElementById('cmd-input').addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); updateCmdSelection(1); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); updateCmdSelection(-1); }
  if (e.key === 'Enter')     { execCmd(cmdSelected); }
  if (e.key === 'Escape')    { closeCmd({}); document.getElementById('cmd-overlay').classList.remove('open'); }
});

// ── KEYBOARD SHORTCUTS ────────────────────────────────
document.addEventListener('keydown', function(e) {
  var tag = document.activeElement && document.activeElement.tagName;
  var typing = tag === 'INPUT' || tag === 'TEXTAREA';
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    var overlay = document.getElementById('cmd-overlay');
    overlay.classList.contains('open') ? closeCmd({}) : openCmd();
    return;
  }
  if (e.key === 'Escape') {
    document.getElementById('cmd-overlay').classList.remove('open');
    if (modalOpen) closeJobBridgeModal();
    return;
  }
  if (!typing) {
    if (e.key === '1') showPage('home');
    if (e.key === '2') showPage('about');
    if (e.key === '3') showPage('portfolio');
    if (e.key === '4') showPage('pitch');
  }
});

// ── SKILL BAR ANIMATION ON VIEW ───────────────────────
var skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(function(bar) {
        var w = bar.style.width;
        bar.style.width = '0';
        setTimeout(function() { bar.style.width = w; }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.about-block').forEach(function(b) { skillObserver.observe(b); });

// ── WELCOME TOAST ─────────────────────────────────────
setTimeout(function() { showToast('Ctrl+K to open command palette'); }, 1800);

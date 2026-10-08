// Backend URL: localhost while developing, your Render URL once deployed.
const API_BASE = ['localhost', '127.0.0.1', ''].includes(location.hostname)
  ? 'http://localhost:5000'
  : 'https://YOUR-BACKEND.onrender.com';   // <-- change after deploying the backend

// Shown if the API is unreachable, so the page never looks empty.
const FALLBACK_PROJECTS = [
  { title: 'Movie Recommendation System', description: 'Installable Python package with a menu-driven interface. Add movies with ratings and genres, search them, filter by genre, view everything stored, and get top-rated recommendations.',
    tech: ['Python', 'Packaging'], post: 'https://lnkd.in/p/g4yitU6j' },
  { title: 'Restaurant Management System', description: 'DSA project in C that manages restaurant menu categories with a Binary Search Tree: insertion, deletion, searching and traversal, covering full CRUD.',
    tech: ['C', 'Data Structures', 'BST'], post: 'https://lnkd.in/p/g_vUzVGK' },
  { title: 'Event Management System', description: 'Menu-driven C console application to add events (name, date and venue, up to 50), list all events and search by name. Uses arrays of structures with in-memory storage and input validation.',
    tech: ['C', 'Structures', 'Arrays'], github: 'https://github.com/karthikeya7428/Event-management' },
  { title: 'AI Interfaces (UI Template Collection)', description: 'Team hackathon project: a collection of reusable AI-interface UI templates built with HTML, CSS and JavaScript, developed collaboratively through GitHub.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Git'], github: 'https://github.com/karthikeya7428/Hackthon' },
  { title: 'Personal Portfolio', description: 'Full-stack portfolio with a Node/Express API, MongoDB storage and an interactive canvas hero.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'], github: 'https://github.com/karthikeya7428' }
];

const FALLBACK_CERTS = [
  { title: 'Bharatiya Antariksh Hackathon 2026', issuer: 'ISRO, powered by Hack2skill', type: 'Hackathon', description: 'Participated in the Bharatiya Antariksh Hackathon 2026, presented by ISRO.', link: 'https://lnkd.in/p/gaGtdxfN' },
  { title: 'Explore Generative AI', issuer: 'Microsoft Learn', type: 'Badge', description: 'Earned the Microsoft Learn Explore Generative AI badge.', skills: ['Generative AI'], link: 'https://lnkd.in/p/gWgAKqZX' },
  { title: 'Building Generative AI Apps to Talk to Your Data', issuer: 'GeeksforGeeks', type: 'Course', description: 'Practical course on building AI-powered applications that interact with data.', skills: ['Generative AI', 'LLMs', 'RAG', 'Prompt engineering'], link: 'https://lnkd.in/p/guTxHfHS' },
  { title: 'Trust and Security with Google Cloud', issuer: 'Google Cloud', type: 'Course', description: 'Completed the Trust and Security with Google Cloud course.', link: 'https://lnkd.in/p/g473q2ts' },
  { title: 'Course completion', issuer: 'IBM Skills Network / Cognitive Class', type: 'Course', description: 'Completed a course offered by IBM Skills Network and Cognitive Class.', link: 'https://lnkd.in/p/gUpqPB35' },
  { title: 'Ctrl C + Ctrl V Hackathon', issuer: 'FOSS Club, Sai University', type: 'Hackathon', description: 'Participated in the Ctrl C + Ctrl V Hackathon conducted by the FOSS Club at Sai University.', link: 'https://lnkd.in/p/g5dEgYVD' }
];

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Projects ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => /^https?:\/\//i.test(u || '') ? esc(u) : '';

function renderProjects(list) {
  const box = document.getElementById('project-list');
  if (!list.length) { box.innerHTML = '<p class="muted">No projects yet.</p>'; return; }
  box.innerHTML = list.map(p => `
    <article class="project">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <ul class="chips">${(p.tech || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="project-links">
        ${safeUrl(p.github) ? `<a href="${safeUrl(p.github)}" target="_blank" rel="noopener">Code</a>` : ''}
        ${safeUrl(p.live) ? `<a href="${safeUrl(p.live)}" target="_blank" rel="noopener">Live demo</a>` : ''}
        ${safeUrl(p.post) ? `<a href="${safeUrl(p.post)}" target="_blank" rel="noopener">LinkedIn post</a>` : ''}
      </div>
    </article>`).join('');
}

fetch(`${API_BASE}/api/projects`)
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(renderProjects)
  .catch(() => renderProjects(FALLBACK_PROJECTS));

/* ---------- Certifications ---------- */
function renderCerts(items) {
  const box = document.getElementById('cert-list');
  if (!items.length) { box.innerHTML = '<p class="muted">No certifications yet.</p>'; return; }
  box.innerHTML = items.map(c => `
    <article class="project cert">
      <span class="tag">${esc(c.type || 'Certificate')}</span>
      <h3>${esc(c.title)}</h3>
      <p class="issuer">${esc(c.issuer)}</p>
      <p>${esc(c.description)}</p>
      ${(c.skills || []).length ? `<ul class="chips">${c.skills.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="project-links">
        ${safeUrl(c.link) ? `<a href="${safeUrl(c.link)}" target="_blank" rel="noopener">View credential</a>` : ''}
      </div>
    </article>`).join('');
}

fetch(`${API_BASE}/api/certifications`)
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(renderCerts)
  .catch(() => renderCerts(FALLBACK_CERTS));

/* ---------- Contact form ---------- */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const btn = form.querySelector('button');
  status.className = ''; status.textContent = '';
  if (!data.name.trim() || !data.message.trim() || !form.email.checkValidity()) {
    status.className = 'err'; status.textContent = 'Enter your name, a valid email and a message.'; return;
  }
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const res = await fetch(`${API_BASE}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || 'Could not send your message. Try again.');
    status.className = 'ok'; status.textContent = 'Message sent. I will reply by email.'; form.reset();
  } catch (err) {
    status.className = 'err'; status.textContent = err.message;
  } finally {
    btn.disabled = false; btn.textContent = 'Send message';
  }
});

/* ---------- Hero: network that reacts to the cursor ---------- */
(() => {
  const canvas = document.getElementById('net');
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = { x: -999, y: -999 };
  let w, h, nodes = [];

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(110, Math.floor(w * h / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      if (!reduce) { n.x += n.vx; n.y += n.vy; }
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { ctx.strokeStyle = `rgba(232,176,74,${(1 - d / 130) * .28})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (m < 170) { ctx.strokeStyle = `rgba(243,237,228,${(1 - m / 170) * .6})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      ctx.fillStyle = m < 170 ? '#f3ede4' : 'rgba(232,176,74,.85)';
      ctx.beginPath(); ctx.arc(a.x, a.y, 2, 0, 6.283); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  canvas.parentElement.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  addEventListener('resize', () => { resize(); if (reduce) draw(); });
  resize(); draw();
})();

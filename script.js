// THEME
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
themeBtn?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// YEAR
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// SKILL BARS
function animateBars() {
  document.querySelectorAll('.fill').forEach(el => { el.style.width = el.dataset.fill + '%'; });
  document.querySelectorAll('.pct').forEach(el => {
    const target = parseInt(el.dataset.pct);
    let current = 0;
    const step = () => { current = Math.min(current + 2, target); el.textContent = current + '%'; if (current < target) requestAnimationFrame(step); };
    step();
  });
}

// INTERSECTION OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'skills' || entry.target.closest('#skills')) setTimeout(animateBars, 300);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card, .comp-card, .t-card, .skill').forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
document.querySelectorAll('#skills').forEach(el => observer.observe(el));

// CANVAS PARTICLES
const canvas = document.getElementById('fx');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function Particle() { this.x = Math.random()*W; this.y = Math.random()*H; this.vx = (Math.random()-0.5)*0.3; this.vy = (Math.random()-0.5)*0.3; this.r = Math.random()*1.5+0.3; this.alpha = Math.random()*0.5+0.1; this.color = Math.random()>0.5?'#00e5ff':'#7b2fff'; }
  Particle.prototype.update = function() { this.x+=this.vx; this.y+=this.vy; if(this.x<0)this.x=W; if(this.x>W)this.x=0; if(this.y<0)this.y=H; if(this.y>H)this.y=0; };
  Particle.prototype.draw = function() { ctx.save(); ctx.globalAlpha=this.alpha; ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); ctx.restore(); };
  function init() { resize(); particles = Array.from({length:80}, ()=>new Particle()); }
  function drawConnections() {
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){ ctx.save(); ctx.globalAlpha=(1-dist/120)*0.08; ctx.strokeStyle='#00e5ff'; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); ctx.restore(); }
    }
  }
  function loop() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); drawConnections(); requestAnimationFrame(loop); }
  window.addEventListener('resize', resize);
  init(); loop();
}

// NAV ACTIVE
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if(entry.isIntersecting){ navLinks.forEach(l=>l.classList.remove('active')); const link=document.querySelector(`.nav-link[href="#${entry.target.id}"]`); if(link)link.classList.add('active'); } });
}, { threshold: 0.3 });
sections.forEach(s => navObserver.observe(s));

 
 

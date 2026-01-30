// ====== YEAR ======

document.getElementById("year").textContent = new Date().getFullYear();
 
// ====== THEME (simple toggle) ======

const themeBtn = document.getElementById("themeBtn");

let light = false;
 
themeBtn.addEventListener("click", () => {

  light = !light;

  document.documentElement.style.setProperty("--bg", light ? "#f6f8ff" : "#070a12");

  document.documentElement.style.setProperty("--fg", light ? "#0b1020" : "#e7ecff");

  document.documentElement.style.setProperty("--muted", light ? "#344067" : "#98a2c9");

  document.body.style.background = light

    ? "radial-gradient(1200px 800px at 20% 15%, rgba(176,107,255,.10), transparent 55%), radial-gradient(900px 700px at 80% 30%, rgba(93,222,255,.08), transparent 55%), #f6f8ff"

    : "";

});
 
// ====== NAV UNDERLINE + SCROLLSPY ======

const navLinks = Array.from(document.querySelectorAll(".nav-link"));

const underline = document.getElementById("underline");

const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
 
function moveUnderline(el){

  const r = el.getBoundingClientRect();

  const parentR = el.parentElement.getBoundingClientRect();

  underline.style.width = `${r.width * 0.7}px`;

  underline.style.transform = `translateX(${(r.left - parentR.left) + (r.width*0.15)}px)`;

}
 
navLinks.forEach(a => {

  a.addEventListener("mouseenter", () => moveUnderline(a));

});

window.addEventListener("resize", () => {

  const active = document.querySelector(".nav-link.active");

  if(active) moveUnderline(active);

});
 
const obs = new IntersectionObserver((entries) => {

  entries.forEach(e => {

    if(!e.isIntersecting) return;

    const id = "#" + e.target.id;

    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));

    const active = document.querySelector(".nav-link.active");

    if(active) moveUnderline(active);

  });

}, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
 
sections.forEach(s => obs.observe(s));

moveUnderline(document.querySelector(".nav-link.active"));
 
// ====== SKILLS ANIMATE (bars + % counter) ======

const skillObserver = new IntersectionObserver((entries) => {

  entries.forEach((e) => {

    if (!e.isIntersecting) return;
 
    document.querySelectorAll(".fill").forEach(fill => {

      const val = fill.getAttribute("data-fill");

      fill.style.width = `${val}%`;

    });
 
    document.querySelectorAll(".pct").forEach(p => {

      const target = Number(p.getAttribute("data-pct"));

      let current = 0;

      const step = Math.max(1, Math.round(target / 40));

      const timer = setInterval(() => {

        current += step;

        if(current >= target){

          current = target;

          clearInterval(timer);

        }

        p.textContent = `${current}%`;

      }, 18);

    });
 
    skillObserver.disconnect();

  });

}, { threshold: 0.2 });
 
const skillsSection = document.getElementById("skills");

if (skillsSection) skillObserver.observe(skillsSection);
 
// ====== PARTICLES CANVAS (lightweight) ======

const canvas = document.getElementById("fx");

const ctx = canvas.getContext("2d");

let w, h;
 
function resize(){

  w = canvas.width = window.innerWidth;

  h = canvas.height = window.innerHeight;

}

window.addEventListener("resize", resize);

resize();
 
const N = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 18000));

const pts = Array.from({length:N}).map(() => ({

  x: Math.random()*w,

  y: Math.random()*h,

  vx: (Math.random()-0.5)*0.45,

  vy: (Math.random()-0.5)*0.45,

  r: Math.random()*1.6 + 0.6

}));
 
function draw(){

  ctx.clearRect(0,0,w,h);
 
  // points

  for (const p of pts){

    p.x += p.vx; p.y += p.vy;
 
    if(p.x < 0 || p.x > w) p.vx *= -1;

    if(p.y < 0 || p.y > h) p.vy *= -1;
 
    ctx.beginPath();

    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);

    ctx.fillStyle = "rgba(93,222,255,.55)";

    ctx.fill();

  }
 
  // links

  for (let i=0;i<pts.length;i++){

    for (let j=i+1;j<pts.length;j++){

      const a = pts[i], b = pts[j];

      const dx = a.x-b.x, dy = a.y-b.y;

      const d2 = dx*dx + dy*dy;

      const max = 150*150;

      if(d2 < max){

        const alpha = 1 - (d2/max);

        ctx.strokeStyle = `rgba(176,107,255,${alpha*0.12})`;

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(a.x,a.y);

        ctx.lineTo(b.x,b.y);

        ctx.stroke();

      }

    }

  }
 
  requestAnimationFrame(draw);

}

draw();

 
 

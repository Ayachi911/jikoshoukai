/* ================================================================
   AYACHI SAMYAL — PORTFOLIO
   main.js
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   THEME TOGGLE
---------------------------------------------------------------- */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// load saved preference or system default
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
html.setAttribute('data-theme', initialTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


/* ----------------------------------------------------------------
   NAV — add .scrolled class after 80px
---------------------------------------------------------------- */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });


/* ----------------------------------------------------------------
   SCROLL REVEAL
   Adds .reveal class to elements, JS triggers .revealed on enter
---------------------------------------------------------------- */
const revealTargets = [
  { selector: '.hero-content',    delay: 0   },
  { selector: '.about-text',      delay: 0   },
  { selector: '.about-scrapbook', delay: 100 },
  { selector: '.project-card',    delay: 0,  stagger: 80 },
  { selector: '.japan-header',    delay: 0   },
  { selector: '.film-frame',      delay: 0,  stagger: 60 },
  { selector: '.ink-piece',       delay: 0,  stagger: 60 },
  { selector: '.contact-inner',   delay: 0   },
];

function initReveal() {
  revealTargets.forEach(({ selector, stagger }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (stagger) {
        el.style.transitionDelay = `${i * stagger}ms`;
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ----------------------------------------------------------------
   OMIKUJI FORTUNE GENERATOR
   EDIT: swap in your own fortunes — the more specific to your
   life / aesthetic the better
---------------------------------------------------------------- */
const fortunes = [
  // EDIT — change these to whatever speaks to you
  '大吉 — Something you wrote will matter more than you know.',
  '中吉 — The ink dries; the thought stays.',
  '小吉 — Today is a good day to start the thing you keep not starting.',
  '吉 — Yokohama will make sense eventually.',
  '末吉 — The research is worth it. So is the nap.',
  '大吉 — Your next project is already inside you.',
  '中吉 — A stranger will read your work and feel less alone.',
  '吉 — The fluoride in the data is real. Keep going.',
  '小吉 — Draw something today. Even small.',
  '末吉 — Not every answer needs to be in English.',
  '大吉 — You are exactly specific enough.',
  '吉 — The chapter will end. Write the next one.',
];

const omikujiBtn  = document.getElementById('omikujiBtn');
const omikujiResult = document.getElementById('omikujiResult');
let lastIndex = -1;

omikujiBtn.addEventListener('click', () => {
  let idx;
  do { idx = Math.floor(Math.random() * fortunes.length); }
  while (idx === lastIndex && fortunes.length > 1);
  lastIndex = idx;

  omikujiResult.style.opacity = '0';
  setTimeout(() => {
    omikujiResult.textContent = fortunes[idx];
    omikujiResult.style.opacity = '1';
  }, 200);
});


/* ----------------------------------------------------------------
   FILM STRIP — drag to scroll (desktop)
---------------------------------------------------------------- */
function initFilmStripDrag() {
  const strip = document.querySelector('.film-strip-wrap');
  if (!strip) return;

  let isDown = false;
  let startX, scrollLeft;

  strip.addEventListener('mousedown', e => {
    isDown = true;
    strip.style.cursor = 'grabbing';
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
  });

  strip.addEventListener('mouseleave', () => {
    isDown = false;
    strip.style.cursor = 'grab';
  });

  strip.addEventListener('mouseup', () => {
    isDown = false;
    strip.style.cursor = 'grab';
  });

  strip.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.4;
    strip.scrollLeft = scrollLeft - walk;
  });

  strip.style.cursor = 'grab';
}


/* ----------------------------------------------------------------
   POLAROID — subtle parallax on mouse move (about section)
---------------------------------------------------------------- */
function initPolaroidParallax() {
  const scrapbook = document.querySelector('.about-scrapbook');
  const polaroids  = document.querySelectorAll('.polaroid');
  if (!scrapbook || !polaroids.length) return;

  const factors = [0.012, -0.009, 0.008, -0.011];

  scrapbook.addEventListener('mousemove', e => {
    const rect = scrapbook.getBoundingClientRect();
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top  - cy;

    polaroids.forEach((p, i) => {
      const f = factors[i] ?? 0.01;
      const x = dx * f;
      const y = dy * f;
      // preserve base rotation from CSS
      const baseRot = ['-2deg', '3.5deg', '-1.5deg', '2deg'][i] ?? '0deg';
      p.style.transform = `rotate(${baseRot}) translate(${x}px, ${y}px)`;
    });
  });

  scrapbook.addEventListener('mouseleave', () => {
    polaroids.forEach((p, i) => {
      const baseRot = ['-2deg', '3.5deg', '-1.5deg', '2deg'][i] ?? '0deg';
      p.style.transform = `rotate(${baseRot})`;
    });
  });
}


/* ----------------------------------------------------------------
   ACTIVE NAV LINK — highlight based on scroll position
---------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}


/* ----------------------------------------------------------------
   INIT
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFilmStripDrag();
  initPolaroidParallax();
  initActiveNav();
});

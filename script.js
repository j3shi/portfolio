// CURSOR
const cursor    = document.getElementById('cursor');
const ring      = document.getElementById('cursorRing');
const blob      = document.getElementById('glowBlob');

const isMobile = () => window.innerWidth <= 768;

document.addEventListener('mousemove', e => {
  if (isMobile()) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  ring.style.left   = e.clientX + 'px';
  ring.style.top    = e.clientY + 'px';
  blob.style.left   = e.clientX + 'px';
  blob.style.top    = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'var(--accent2)';
    ring.style.width = '48px';
    ring.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// SCROLL PROGRESS
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
}, { passive: true });

// NAV SHRINK + ACTIVE LINK
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Shrink nav
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active section highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
  document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
});

navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// SCROLL REVEAL with stagger
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 100);
    revealObserver.unobserve(entry.target);

    // Trigger skill chip stagger when About section reveals
    if (entry.target.classList.contains('reveal')) {
      const grid = entry.target.querySelector('.skills-grid');
      if (grid) grid.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// HERO PARTICLES
const particleContainer = document.getElementById('heroParticles');
if (particleContainer) {
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${40 + Math.random() * 55}%;
      --dur: ${3 + Math.random() * 5}s;
      --delay: ${Math.random() * 6}s;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      opacity: ${0.2 + Math.random() * 0.5};
    `;
    particleContainer.appendChild(p);
  }
}

// TYPEWRITER — terminal motto line
function typewriter(el, text, speed = 45) {
  let i = 0;
  el.innerHTML = '<span class="out">"</span>';
  const interval = setInterval(() => {
    if (i < text.length) {
      el.querySelector('.out').textContent += text[i++];
    } else {
      el.querySelector('.out').textContent += '"';
      clearInterval(interval);
    }
  }, speed);
}

const typingObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    typewriter(entry.target, 'Kirjoita koodia jonka voit ylpeänä näyttää.', 42);
    typingObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const typingLine = document.getElementById('typingLine');
if (typingLine) typingObserver.observe(typingLine);

// 3D TILT on project cards (desktop only)
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    if (isMobile()) return;
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// FORM SUBMIT
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    setTimeout(() => contactForm.reset(), 100);
  });
}

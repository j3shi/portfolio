// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
const blob = document.getElementById('glowBlob');

let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
  ring.style.left   = mx - 18 + 'px';
  ring.style.top    = my - 18 + 'px';
  blob.style.left   = mx - 300 + 'px';
  blob.style.top    = my - 300 + 'px';
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    cursor.style.background = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'var(--accent)';
  });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// FORM RESET
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    setTimeout(() => {
      contactForm.reset();
    }, 100);
  });
}

// TERMINAL BLINK
setInterval(() => {
  document.querySelectorAll('.terminal-line').forEach(line => {
    if (line.textContent.includes('█')) {
      line.innerHTML = line.innerHTML.includes('█')
        ? line.innerHTML.replace('█', '&nbsp;')
        : line.innerHTML.replace('&nbsp;', '█');
    }
  });
}, 600);

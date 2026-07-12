// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const header = document.querySelector('.site-header');
navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
document.querySelectorAll('.nav-mobile a').forEach((a) => {
  a.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((el) => counterObserver.observe(el));

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form (no backend — demo confirmation only)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'お問い合わせありがとうございます。担当者より2営業日以内にご連絡いたします。';
  formNote.classList.add('success');
  contactForm.reset();
});

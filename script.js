/* =======================================================
   📁 script.js
   تعليمات:
   - هذا الملف مسؤول عن التفاعلات والحركات (JS).
   - يمكنك تعديل قيم العدادات أو إضافة بطاقات جديدة بلا تغيير الكود.
   ======================================================= */

// فتح/إغلاق قائمة الجوال
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
}

// تأثير spotlight على بطاقات التصنيفات (يتبع مؤشر الفأرة)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--x', x + '%');
    card.style.setProperty('--y', y + '%');
  });
});

// كاشف الظهور على التمرير (Reveal on Scroll)
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// عدادات الإحصائيات (مرة واحدة عند ظهورها)
function animateNumber(el, target = 0, duration = 1600) {
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const value = Math.floor(start + (target - start) * eased);
    el.textContent = value.toLocaleString('ar-IQ');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsBox = document.querySelector('.stats');
if (statsBox) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat__number').forEach(num => {
          const target = Number(num.getAttribute('data-counter') || '0');
          animateNumber(num, target, 1600);
        });
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statObserver.observe(statsBox);
}

// تمرير سلس للروابط الداخلية (مع تعويض الهيدر الثابت)
document.querySelectorAll('a[href^=\"#\"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerH = document.getElementById('header')?.offsetHeight || 80;
    const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 10);
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// لمسات جمالية على الأزرار
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
});

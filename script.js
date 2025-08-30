document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Mobile menu
  // =====================
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // =====================
  // Dynamic year
  // =====================
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // =====================
  // Smooth scrolling
  // =====================
  document.documentElement.style.scrollBehavior = "smooth";

  // =====================
  // Scroll reveal
  // =====================
  (() => {
    const items = document.querySelectorAll('[data-animate]');
    if (!items.length) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          requestAnimationFrame(() => el.classList.add('in'));
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  })();
});

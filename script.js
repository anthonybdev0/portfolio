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
  // Effet TILT
  // =====================
  const tiltImages = document.querySelectorAll(".tilt");
  if (tiltImages.length) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tiltImages.forEach((img) => {
      if (prefersReduced) return;
      const maxTilt = window.innerWidth < 768 ? 3 : 8;
      const scale = 1.05;
      let rafId = null, lastRX = 0, lastRY = 0;

      const onMove = (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        const nx = x / rect.width - 0.5;
        const ny = y / rect.height - 0.5;
        const targetRY = nx * (maxTilt * 2);
        const targetRX = ny * -(maxTilt * 2);

        const ease = 0.18;
        lastRX += (targetRX - lastRX) * ease;
        lastRY += (targetRY - lastRY) * ease;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            img.style.transform = `rotateX(${lastRX.toFixed(2)}deg) rotateY(${lastRY.toFixed(2)}deg) scale(${scale})`;
            rafId = null;
          });
        }
      };

      const onLeave = () => {
        img.style.transition = "transform 0.3s ease";
        img.style.transform = "rotateX(0) rotateY(0) scale(1)";
        setTimeout(() => (img.style.transition = "transform 0.05s ease"), 310);
      };

      img.addEventListener("mousemove", onMove);
      img.addEventListener("mouseleave", onLeave);
      img.addEventListener("touchstart", onMove, { passive: true });
      img.addEventListener("touchmove", onMove, { passive: true });
      img.addEventListener("touchend", onLeave);
    });
  }

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

// =====================
// Mobile menu (déjà présent)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // =====================
  // Dynamic year (déjà présent)
  // =====================
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // =====================
  // Smooth scrolling (déjà présent)
  // =====================
  document.documentElement.style.scrollBehavior = "smooth";

  // =====================
  // Effet TILT (nouveau)
  // =====================
  const tiltImages = document.querySelectorAll(".tilt");
  if (tiltImages.length) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    tiltImages.forEach((img) => {
      if (prefersReduced) return; // respect accessibilité

      const maxTilt = 3;  // degrés max
      const scale = 1.05;  // zoom léger
      let rafId = null;
      let lastRX = 0, lastRY = 0;

      const onMove = (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        const nx = x / rect.width - 0.5;   // -0.5..0.5
        const ny = y / rect.height - 0.5;  // -0.5..0.5

        const targetRY = nx * (maxTilt * 2);     // gauche/droite
        const targetRX = ny * -(maxTilt * 2);    // haut/bas

        // petite inertie (lissage)
        const ease = 0.18;
        lastRX += (targetRX - lastRX) * ease;
        lastRY += (targetRY - lastRY) * ease;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            img.style.boxShadow = `${(-lastRY).toFixed(0)}px ${lastRX.toFixed(0)}px 28px rgba(0,0,0,.25)`;
            img.style.transform = `rotateX(${lastRX.toFixed(2)}deg) rotateY(${lastRY.toFixed(2)}deg) scale(${scale})`;
            rafId = null;
          });
        }
      };

      const onLeave = () => {
        img.style.transition = "transform 0.3s ease";
        img.style.transform = "rotateX(0) rotateY(0) scale(1)";
        // reset après l'anim pour éviter d'empiler les transitions
        setTimeout(() => (img.style.transition = "transform 0.05s ease"), 310);
      };

      // PC
      img.addEventListener("mousemove", onMove);
      img.addEventListener("mouseleave", onLeave);
      // Mobile (tilt léger quand on glisse le doigt)
      img.addEventListener("touchstart", onMove, { passive: true });
      img.addEventListener("touchmove", onMove, { passive: true });
      img.addEventListener("touchend", onLeave);
    });
  }
});
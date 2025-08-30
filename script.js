// script.js
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
  // Scroll reveal (Framer-like) via data-animate
  // =====================
  (() => {
    const items = document.querySelectorAll("[data-animate]");
    if (!items.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      items.forEach(el => el.classList.add("in")); // tout visible si reduce motion
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => entry.target.classList.add("in"));
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    items.forEach(el => io.observe(el));
  })();

  // =====================
  // Parallax léger du Hero (blobs via --p)
  // =====================
  (() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // inView: 0..1 selon la proximité du centre du hero avec le centre viewport
      const inView = Math.min(1, Math.max(0, 1 - Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh / 2)));
      hero.style.setProperty("--p", inView.toFixed(3)); // utilisé par .hero::before/::after en CSS
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  })();

  // =====================
  // Scrollspy (nav active selon section visible)
  // =====================
  (() => {
    const sectionIds = ["projects", "about", "contact"];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const linkMap = new Map(); // id -> <a>
    sections.forEach(sec => {
      const a = document.querySelector(`.nav a[href="#${sec.id}"]`);
      if (a) linkMap.set(sec.id, a);
    });

    const unsetAll = () => linkMap.forEach(a => a.classList.remove("active"));

    const io = new IntersectionObserver((entries) => {
      // choisir la plus visible
      let best = null, bestRatio = 0;
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > bestRatio) {
          best = e.target;
          bestRatio = e.intersectionRatio;
        }
      });
      if (best) {
        unsetAll();
        const a = linkMap.get(best.id);
        if (a) a.classList.add("active");
      }
    }, { threshold: [0.25, 0.5, 0.75] });

    sections.forEach(s => io.observe(s));
  })();
});

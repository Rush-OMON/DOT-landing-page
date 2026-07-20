/*==================================================
DOT — SHARED SITE SCRIPT
Preloader + scroll reveal + mobile menu
==================================================*/

/* ---------- PRELOADER ---------- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("loaded");
      document.body.classList.add("is-loaded");
    }, 500);
  } else {
    document.body.classList.add("is-loaded");
  }
});

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---------- MOBILE MENU (homepage only) ---------- */
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu-overlay");

if (menuToggle && mobileMenu) {
  const mobileLinks = document.querySelectorAll(".mobile-links a");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-active");
      mobileMenu.classList.remove("is-active");
    });
  });
}

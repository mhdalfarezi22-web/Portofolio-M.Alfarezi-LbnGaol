document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav__links");
  const navLinkItems = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll(".section");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Reveal sections on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => revealObserver.observe(section));

  // Scrollspy: highlight active nav link
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinkItems.forEach((link) => {
            link.classList.toggle("active", link.dataset.nav === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((section) => spyObserver.observe(section));
});

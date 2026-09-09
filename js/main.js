(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navIconUse = navToggle ? navToggle.querySelector("use") : null;
  function setNavOpen(open) {
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (navIconUse) navIconUse.setAttribute("href", open ? "#icon-x" : "#icon-menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!siteNav.classList.contains("is-open"));
    });
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNavOpen(false); });
    });
  }

  // Accordion (FAQ) — only one item open at a time
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll(".accordion-item"));
    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion-trigger");
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (i) { i.classList.remove("is-open"); });
        if (!isOpen) item.classList.add("is-open");
      });
    });
  }

  // Reveal-on-scroll for section headings and cards
  var revealEls = document.querySelectorAll(".reveal-io");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();

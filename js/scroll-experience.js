/* =========================================================
   SCROLL EXPERIENCE
   Scroll suave com inércia (Lenis), contador numérico e
   parallax discreto no Hero — inspirado no tipo de animação
   de "showcase" de sites como naocodei.com/free-code, adaptado
   ao ritmo lento/luxuoso já usado no resto do site (mesmo
   easing, sem bounce, sem movimento agressivo).

   Nada aqui depende de HTML extra: some completamente se este
   arquivo (e o <script> do Lenis) forem removidos — o scroll
   volta a ser o nativo do navegador e as revelações continuam
   funcionando via js/main.js.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isWide = window.matchMedia && window.matchMedia("(min-width: 861px)").matches;

  /* ---------- 1) Scroll suave com inércia (Lenis) ----------
     Só em telas largas e sem "reduzir movimento": no mobile o
     scroll nativo por toque já é bom e mais leve/confiável. */
  var lenis = null;
  if (!reduceMotion && isWide && typeof window.Lenis === "function") {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); }, // easeOutCubic — suave, sem bounce
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2
    });
    document.documentElement.classList.add("lenis", "lenis-smooth");

    var raf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Links internos (menu, footer) passam a rolar pelo Lenis, mantendo a mesma inércia
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.2, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
      });
    });
  }

  /* ---------- 2) Contador numérico (ex.: "2.000" pessoas) ---------- */
  var counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    var animateCount = function (el) {
      var to = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      var locale = el.getAttribute("data-count-format") || "pt-BR";
      if (reduceMotion) {
        el.textContent = to.toLocaleString(locale);
        return;
      }
      var start = null;
      var duration = 1500;
      var from = 0;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min(1, (ts - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        var value = Math.round(from + (to - from) * eased);
        el.textContent = value.toLocaleString(locale);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = to.toLocaleString(locale);
      }
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      var countIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { countIo.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- 3) Parallax discreto no fundo do Hero ---------- */
  var heroBg = document.querySelector(".hero .hero-bg");
  var hero = document.querySelector(".hero");
  if (heroBg && hero && !reduceMotion && isWide) {
    var ticking = false;
    var updateParallax = function () {
      var rect = hero.getBoundingClientRect();
      // só calcula enquanto o Hero está (ao menos parcialmente) visível
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var shift = rect.top * -0.08; // bem discreto
        heroBg.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      }
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }
})();

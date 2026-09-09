/* =========================================================
   HERO CHARACTER — parallax discreto (opcional)
   Desloca sutilmente a figura conforme o cursor, apenas em
   telas com mouse (pointer: fine) e apenas se o usuário não
   pediu movimento reduzido. Sem dependências externas.
   Remover este arquivo (e o <script> correspondente) não
   quebra nada: a figura continua com a animação de flutuação
   em CSS puro.
   ========================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-hero-character]");
  if (!root) return;
  var el = root.querySelector(".hero-character__parallax");
  if (!el) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (reduceMotion || !hasFinePointer) return;

  var hero = root.closest(".hero");
  if (!hero) return;

  var raf = null;
  var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  var MAX_SHIFT = 10; // px — deslocamento máximo, bem discreto

  function onMove(e) {
    var rect = hero.getBoundingClientRect();
    var relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    var relY = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = relX * MAX_SHIFT * 2;
    targetY = relY * MAX_SHIFT;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    el.style.transform = "translate(" + currentX.toFixed(2) + "px," + currentY.toFixed(2) + "px)";
    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  hero.addEventListener("mousemove", onMove);
  hero.addEventListener("mouseleave", function () {
    targetX = 0;
    targetY = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  });
})();

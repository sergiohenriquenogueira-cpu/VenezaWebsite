/* Veneza v3 — vídeo de fundo da obra (JS puro) */
(function () {
  'use strict';
  var video = document.querySelector('.stage__video');
  if (!video) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  // Com animações reduzidas ou economia de dados, fica só a imagem parada.
  if (reduceMotion || saveData) return;

  video.src = video.getAttribute('data-src');
  video.muted = true;
  var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
  play();

  // Pausa quando a aba não está visível (economiza bateria)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) video.pause(); else play();
  });
})();

/* Menu: fica sólido quando a página sai do vídeo (usado na página de teste da hero) */
(function () {
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero');
  if (!header || !hero) return;
  var onScroll = function () {
    header.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 160);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

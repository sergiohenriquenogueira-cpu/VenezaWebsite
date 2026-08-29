/* Veneza — comportamentos progressivos.
   Seções: hero (vídeo + contador), passo-a-passo (hover, só CSS),
   entregues-e-andamento (carrossel horizontal com overflow — translateX),
   hub-regional (contador dos números do card + parallax do título no scroll). */
(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ----------------------------------------------------------------------
     Hero: respeitar "prefers-reduced-motion" — pausa o vídeo de fundo.
     ---------------------------------------------------------------------- */
  var heroVideo = document.querySelector('.hero__bg');
  if (heroVideo) {
    var applyMotionPreference = function () {
      if (motionQuery.matches) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.pause();
      } else {
        var playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () { /* autoplay bloqueado pelo navegador */ });
        }
      }
    };

    applyMotionPreference();

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', applyMotionPreference);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(applyMotionPreference);
    }
  }

  /* ----------------------------------------------------------------------
     Contador crescente — indicadores do hero E números do card do HUB.
     0 → valor real, ~1,8s, curva ease-out (sem bounce), uma única vez,
     disparado quando o grupo entra no viewport. Suporta sufixo e casas
     decimais (separador PT-BR ","). Sem bibliotecas.
     ---------------------------------------------------------------------- */
  var COUNTER_DURATION = 1800;

  var formatCount = function (value, decimals) {
    if (decimals > 0) return value.toFixed(decimals).replace('.', ',');
    return String(Math.round(value));
  };

  var renderCount = function (el, value) {
    var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
    el.textContent = formatCount(value, decimals) + (el.getAttribute('data-count-suffix') || '');
  };

  var animateCount = function (el) {
    var target = parseFloat(String(el.getAttribute('data-count-to')).replace(',', '.')) || 0;
    var start = null;

    var step = function (now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / COUNTER_DURATION);
      var eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic — sem overshoot */
      renderCount(el, eased * target);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        renderCount(el, target); /* valor final exato */
      }
    };

    requestAnimationFrame(step);
  };

  /* Dispara a contagem de um grupo quando o elemento-gatilho entra no viewport. */
  var setupCounterGroup = function (gate, els) {
    if (!gate || !els.length) return;
    if (motionQuery.matches || !('requestAnimationFrame' in window)) return;
    /* Sem animação: mantém os valores finais já presentes no HTML. */

    /* Reserva a largura final de cada número ANTES de zerar (trava anti-deslocamento,
       somada ao tabular-nums do CSS). */
    els.forEach(function (el) {
      el.style.minWidth = Math.ceil(el.getBoundingClientRect().width) + 'px';
    });

    var started = false;
    var observer = null;

    var begin = function () {
      if (started) return;
      started = true;
      if (observer) observer.disconnect();
      els.forEach(function (el) { renderCount(el, 0); }); /* só zera quando a contagem vai começar */
      els.forEach(animateCount);
    };

    var inViewport = function (el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    };

    if (inViewport(gate)) {
      begin(); /* já visível no carregamento → conta uma vez */
    } else if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) { begin(); break; }
        }
      }, { threshold: 0.4 });
      observer.observe(gate);
    } else {
      var onScroll = function () {
        if (inViewport(gate)) {
          window.removeEventListener('scroll', onScroll);
          begin();
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  };

  var heroStats = document.querySelector('.hero__stats');
  if (heroStats) {
    setupCounterGroup(heroStats, Array.prototype.slice.call(
      heroStats.querySelectorAll('.hero__stat-value[data-count-to]')));
  }

  var hubCard = document.querySelector('.hub-regional__card');
  if (hubCard) {
    setupCounterGroup(hubCard, Array.prototype.slice.call(
      hubCard.querySelectorAll('[data-count-to]')));
  }

  /* ----------------------------------------------------------------------
     HUB regional: parallax ligado ao scroll.
     Enquanto a seção passa pelo viewport, a coluna do título + botão
     desliza para baixo (translateY), em direção à base do card. Movimento
     sutil, scrubado pelo scroll (sem transição CSS). Só no layout de 2
     colunas (> 1280px); desativado em reduced-motion.
     ---------------------------------------------------------------------- */
  var hubSection = document.querySelector('.hub-regional');
  if (hubSection && !motionQuery.matches) {
    var hubIntro = hubSection.querySelector('.hub-regional__intro-text');
    var hubCardEl = hubSection.querySelector('.hub-regional__card');
    var twoCols = window.matchMedia('(min-width: 1281px)');

    if (hubIntro && hubCardEl) {
      var parallaxTicking = false;

      var applyHubParallax = function () {
        parallaxTicking = false;
        if (!twoCols.matches) { hubIntro.style.transform = ''; return; }

        var vh = window.innerHeight || document.documentElement.clientHeight;
        var rect = hubSection.getBoundingClientRect();
        var total = rect.height + vh;               /* percurso: entrar → sair do viewport */
        var progress = Math.min(1, Math.max(0, (vh - rect.top) / total));

        /* desloca até a base da intro alcançar a base do card (tops alinhados) */
        var slack = Math.max(0, hubCardEl.offsetHeight - hubIntro.offsetHeight);
        var shift = Math.round(progress * slack);
        hubIntro.style.transform = 'translateY(' + shift + 'px)';
      };

      var onHubParallax = function () {
        if (!parallaxTicking) {
          parallaxTicking = true;
          requestAnimationFrame(applyHubParallax);
        }
      };

      window.addEventListener('scroll', onHubParallax, { passive: true });
      window.addEventListener('resize', onHubParallax);
      applyHubParallax();
    }
  }

  /* ----------------------------------------------------------------------
     Entregues e Andamento: carrossel horizontal com overflow.
     - o track desliza via translateX (transição ~600ms ease-out no CSS);
     - avança 1 card por passo; o track ultrapassa o grid p/ a direita;
     - dots gerados dinamicamente (1 por posição navegável), clicáveis;
     - setas prev/next, teclado (← →) e swipe (pointer events).
     Sem autoplay. Sem bibliotecas.
     ---------------------------------------------------------------------- */
  var carousel = document.querySelector('.entregues-e-andamento');
  if (carousel) {
    var viewport = carousel.querySelector('.entregues-e-andamento__list');
    var track = carousel.querySelector('.entregues-e-andamento__track');
    var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.entregues-e-andamento__card')) : [];
    var prevBtn = carousel.querySelector('.entregues-e-andamento__pagination-prev');
    var nextBtn = carousel.querySelector('.entregues-e-andamento__pagination-next');
    var progress = carousel.querySelector('.entregues-e-andamento__pagination-progress');

    if (viewport && track && cards.length > 1) {
      var index = 0;
      var positions = 1;
      var dots = [];

      var cardPitch = function () {
        return cards.length > 1
          ? Math.round(cards[1].offsetLeft - cards[0].offsetLeft)
          : cards[0].offsetWidth;
      };
      /* quanto o track pode deslizar até o último card encostar na borda */
      var maxOffset = function () {
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };
      var offsetForIndex = function (i) {
        return Math.min(i * cardPitch(), maxOffset());
      };

      var render = function () {
        track.style.transform = 'translateX(' + (-offsetForIndex(index)) + 'px)';
        if (prevBtn) prevBtn.disabled = index <= 0;
        if (nextBtn) nextBtn.disabled = index >= positions - 1;
        for (var d = 0; d < dots.length; d++) {
          var on = d === index;
          dots[d].classList.toggle('is-active', on);
          dots[d].setAttribute('aria-current', on ? 'true' : 'false');
        }
      };

      var go = function (i) {
        index = Math.max(0, Math.min(positions - 1, i));
        render();
      };

      /* (re)gera os dots conforme o nº real de posições navegáveis */
      var buildDots = function () {
        var pitch = cardPitch() || 1;
        positions = Math.max(1, Math.round(maxOffset() / pitch) + 1);
        if (dots.length !== positions) {
          if (progress) progress.textContent = '';
          dots = [];
          for (var i = 0; i < positions; i++) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'entregues-e-andamento__pagination-dot';
            b.setAttribute('aria-label', 'Ir para a posição ' + (i + 1) + ' de ' + positions);
            (function (n) {
              b.addEventListener('click', function () { go(n); });
            })(i);
            if (progress) progress.appendChild(b);
            dots.push(b);
          }
        }
        if (index > positions - 1) index = positions - 1;
      };

      if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); });

      viewport.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      });

      /* swipe / arrasto (pointer events) */
      var dragStartX = null;
      var dragStartOffset = 0;
      var dragging = false;

      viewport.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragStartX = e.clientX;
        dragStartOffset = offsetForIndex(index);
        dragging = true;
        track.style.transition = 'none';
        try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      });
      viewport.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var next = Math.max(0, Math.min(maxOffset(), dragStartOffset - (e.clientX - dragStartX)));
        track.style.transform = 'translateX(' + (-next) + 'px)';
      });
      var endDrag = function (e) {
        if (!dragging) return;
        dragging = false;
        track.style.transition = '';
        var dx = e.clientX - dragStartX;
        if (Math.abs(dx) > cardPitch() * 0.18) {
          go(index + (dx < 0 ? 1 : -1));
        } else {
          render();
        }
      };
      viewport.addEventListener('pointerup', endDrag);
      viewport.addEventListener('pointercancel', endDrag);

      var relayout = function () { buildDots(); render(); };

      /* ResizeObserver dispara já na observação inicial (garante medidas certas
         mesmo se o layout ainda não assentou) e a cada mudança de tamanho. */
      if ('ResizeObserver' in window) {
        new ResizeObserver(relayout).observe(viewport);
      } else {
        window.addEventListener('resize', relayout);
      }
      window.addEventListener('load', relayout);

      buildDots();
      render();
    }
  }

  /* ----------------------------------------------------------------------
     Rodapé: "Voltar ao topo" — rola até o topo (respeita reduced-motion).
     ---------------------------------------------------------------------- */
  var footerTop = document.querySelector('.footer__top');
  if (footerTop) {
    footerTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: motionQuery.matches ? 'auto' : 'smooth' });
    });
  }
})();

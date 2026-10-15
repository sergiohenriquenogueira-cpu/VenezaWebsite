/* Veneza — comportamentos da página (JS puro, sem dependências) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------- Portfólio: filtro por status + barra de progresso (seção 4) ---------- */
  var works = Array.prototype.slice.call(document.querySelectorAll('.work'));
  if (works.length) {
    // barras crescem quando o card aparece
    if ('IntersectionObserver' in window && !reduceMotion) {
      var workIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); workIO.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      works.forEach(function (w) { workIO.observe(w); });
    } else {
      works.forEach(function (w) { w.classList.add('is-in'); });
    }

    var filterBtns = document.querySelectorAll('.filters__btn');
    var statusMsg = document.querySelector('[data-filter-status]');
    var labels = { todos: '', lancamento: 'em lançamento', construcao: 'em construção', concluido: 'concluídos' };
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        var shown = 0;
        works.forEach(function (w) {
          var match = f === 'todos' || w.getAttribute('data-status').split(' ').indexOf(f) !== -1;
          w.hidden = !match;
          w.classList.remove('is-entering');
          if (match) {
            shown++;
            if (!reduceMotion) { void w.offsetWidth; w.classList.add('is-entering'); }
            w.classList.add('is-in');
          }
        });
        if (statusMsg) {
          statusMsg.textContent = 'Mostrando ' + shown + (shown === 1 ? ' empreendimento ' : ' empreendimentos ') + (labels[f] || '');
        }
      });
    });
  }

  /* ---------- Menu: fundo sólido ao rolar + abrir/fechar no celular ---------- */
  var header = document.querySelector('.header');
  if (header) {
    var toggle = header.querySelector('.header__toggle');
    var nav = header.querySelector('.header__nav');

    var onScroll = function () {
      header.classList.toggle('is-solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var setOpen = function (open) {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        setOpen(!header.classList.contains('is-open'));
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
      });
    }
  }

  /* ---------- Barras de progresso genéricas (seção 8): crescem ao aparecer ---------- */
  var bars = document.querySelectorAll('.progress');
  if (bars.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var barIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); barIO.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { barIO.observe(b); });
    } else {
      bars.forEach(function (b) { b.classList.add('is-in'); });
    }
  }

  /* ---------- Fluxo de aportes: abas no celular (seção 9) ---------- */
  var flowWrap = document.querySelector('.flow__tables');
  if (flowWrap) {
    var tabs = flowWrap.querySelectorAll('.flow__tab');
    var selectTab = function (tab) {
      flowWrap.setAttribute('data-active', tab.getAttribute('data-tab'));
      tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
          selectTab(next); next.focus();
        }
      });
    });
  }

  /* ---------- Passo a passo: linha dourada se preenche ao rolar (seção 11) ---------- */
  var stepsList = document.querySelector('.steps');
  if (stepsList) {
    var stepItems = stepsList.querySelectorAll('.step');
    var maxFill = 0; // a linha só avança, não volta
    var updateSteps = function () {
      var r = stepsList.getBoundingClientRect();
      var vh = window.innerHeight;
      var mark = vh * 0.75; // ponto de leitura: a linha cresce conforme cada número passa por aqui
      var start = r.top + 50, span = r.height - 100;
      var fill = Math.max(0, Math.min(1, (mark - start) / span));
      var atPageEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
      if (reduceMotion || (atPageEnd && r.bottom <= vh)) fill = 1; // fim da página: não dá para rolar mais
      maxFill = Math.max(maxFill, fill);
      stepsList.style.setProperty('--fill', maxFill.toFixed(3));
      var filledTo = start + maxFill * span; // altura que a linha já alcançou
      stepItems.forEach(function (st) {
        st.classList.toggle('is-reached', st.getBoundingClientRect().top + 50 <= filledTo + 1);
      });
    };
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { updateSteps(); ticking = false; }); }
    }, { passive: true });
    window.addEventListener('resize', updateSteps);
    updateSteps();
  }

  /* ---------- Botão flutuante some no chamado final e no rodapé (já têm WhatsApp) ---------- */
  var floatBtn = document.querySelector('.whatsapp-float');
  var endZones = document.querySelectorAll('.cta, .footer');
  if (floatBtn && endZones.length && 'IntersectionObserver' in window) {
    var visibleZones = new Set();
    var zoneIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visibleZones.add(e.target); else visibleZones.delete(e.target); });
      floatBtn.classList.toggle('is-hidden', visibleZones.size > 0);
    }, { threshold: 0.15 });
    endZones.forEach(function (z) { zoneIO.observe(z); });
  }

  /* ---------- Carrossel contínuo (seção 2) ----------
     Duplica os cards para o loop não ter emenda. As cópias ficam ocultas para leitores de tela.
     Com animações desativadas no sistema, a faixa fica parada e pode ser arrastada. */
  document.querySelectorAll('[data-marquee]').forEach(function (marquee) {
    if (reduceMotion) return;
    var track = marquee.querySelector('.marquee__track');
    var items = Array.prototype.slice.call(track.children);
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    var addCopy = function () {
      items.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('[data-count]').forEach(function (el) { el.removeAttribute('data-count'); });
        track.appendChild(clone);
      });
    };
    var setup = function () {
      // volta ao conjunto original e recalcula (ex.: ao girar o celular)
      while (track.children.length > items.length) track.removeChild(track.lastChild);
      var setWidth = track.scrollWidth + gap; // largura de uma volta completa
      do { addCopy(); } while (track.scrollWidth < setWidth + marquee.clientWidth);
      marquee.style.setProperty('--shift', -setWidth + 'px');
      marquee.style.setProperty('--speed', Math.round(setWidth / 45) + 's'); // ~45px por segundo
      marquee.classList.add('is-running');
    };
    setup();
    var resizeTimer, lastWidth = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) return; // ignora a barra do navegador no celular
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 250);
    });
  });

  /* ---------- Contadores: sobem até o valor quando aparecem na tela ----------
     O valor final já está no HTML; sem JS ou com animação reduzida, ele fica como está. */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var fmt = { minimumFractionDigits: dec, maximumFractionDigits: dec };
      var start = null, DUR = 1400;
      var step = function (t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / DUR, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (dec ? target * eased : Math.round(target * eased)).toLocaleString('pt-BR', fmt);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Vídeo da história (seção 3) ----------
     Toca sem som só enquanto está na tela. Com animações reduzidas ou economia de
     dados, fica parado na imagem e o visitante decide se quer tocar. */
  var hVideo = document.querySelector('.history__video');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (hVideo && !reduceMotion && !saveData) { // nesses casos fica a imagem parada
    var play = function () {
      var p = hVideo.play();
      if (p && p.catch) p.catch(function () {}); // navegador bloqueou: mantém a imagem
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play();
          else if (!hVideo.paused) hVideo.pause();
        });
      }, { threshold: 0.35 }).observe(hVideo);
    } else {
      play();
    }
  }

  /* ---------- Hero: troca automática das imagens + contador 01 — 0N ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var slides = hero.querySelectorAll('.hero__slide');
    var current = hero.querySelector('.hero__counter-current');
    var total = hero.querySelector('.hero__counter-total');
    var bar = hero.querySelector('.hero__counter-bar');
    var DURATION = 6500;
    var index = 0;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };

    if (total) total.textContent = pad(slides.length);
    hero.style.setProperty('--slide-ms', DURATION + 'ms');

    var restartBar = function () {
      if (!bar) return;
      bar.classList.remove('is-running');
      void bar.offsetWidth; // reinicia a animação
      bar.classList.add('is-running');
    };

    var show = function (i) {
      slides[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      if (current) current.textContent = pad(index + 1);
      restartBar();
    };

    if (slides.length > 1 && !reduceMotion) {
      restartBar();
      var timer = setInterval(function () { show(index + 1); }, DURATION);
      // pausa quando a aba não está visível
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { clearInterval(timer); }
        else { clearInterval(timer); restartBar(); timer = setInterval(function () { show(index + 1); }, DURATION); }
      });
    }
  }
})();

/**
 * animations.ts
 * Sistema central de animaciones interactivas utilizando Motion v12.
 * Desacopla la lógica de animación del maquetado HTML y se ejecuta de forma optimizada una sola vez desde Layout.astro.
 */
import { animate, inView, hover, scroll } from 'motion';

// ─── Curvas de Aceleración y Constantes Reutilizables ────────────────────────

// EASE_OUT proporciona una entrada enérgica pero con un frenado ultra-suave
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
// EASE_SOFT ofrece una curva sutil ideal para efectos de elevación al hacer hover
const EASE_SOFT = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Helper: Revelado Mixto (Fade + Slide) al entrar en Viewport ──────────────

function revealOnScroll(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  { y = 32, delay = 0, stagger = 0.09, duration = 0.7 } = {}
) {
  const els = Array.from(elements);
  if (!els.length) return;

  // Se prepara el estado inicial oculto antes de que el usuario haga scroll
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
  });

  // Se activa la animación únicamente cuando los elementos entran en el área visible
  els.forEach((el, i) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: 'translateY(0px)' },
          { duration, delay: delay + i * stagger, ease: EASE_OUT }
        );
      },
      { amount: 0.12 }
    );
  });
}

// ─── Hero: Secuencia de Entrada Progresiva al Cargar ──────────────────────────

function initHero() {
  // Se seleccionan los elementos del Hero asegurando coherencia con los atributos de datos en el HTML
  const targets = [
    document.querySelector<HTMLElement>('[data-hero="badge"]'),
    document.querySelector<HTMLElement>('[data-hero="title"]'),
    document.querySelector<HTMLElement>('[data-hero="desc"]'),
    document.querySelector<HTMLElement>('[data-hero="actions"]'),
    document.querySelector<HTMLElement>('[data-hero="card"]'),
  ].filter(Boolean) as HTMLElement[];

  if (!targets.length) return;

  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
  });

  targets.forEach((el, i) => {
    const isCard = el.dataset.hero === 'card';
    animate(
      el,
      {
        opacity: 1,
        transform: isCard && window.innerWidth >= 1024
          ? ['translateX(40px) translateY(0px)', 'translateX(0px) translateY(0px)']
          : 'translateY(0px)',
      },
      { duration: 0.75, delay: 0.08 + i * 0.12, ease: EASE_OUT }
    );
  });
}

// ─── Navbar: Interpolación Continua Píxel a Píxel al Hacer Scroll ────────────

function initNavbar() {
  let ticking = false;

  function updateNavbar() {
    const nav = document.getElementById('main-navbar');
    const navPill = document.getElementById('nav-pill');
    const statusPill = document.getElementById('status-pill');
    if (!nav) return;

    // Se calcula el progreso continuo t (de 0 a 1) en un rango extendido de 0px a 150px de scroll
    const scrollDistance = 150;
    const rawT = Math.min(1, Math.max(0, window.scrollY / scrollDistance));
    // Curva cúbica smoothstep para garantizar un deslizamiento verdaderamente líquido
    const t = rawT * rawT * (3 - 2 * rawT);
    const invT = 1 - t;

    // 1. Interpolación para el contenedor principal del Navbar (#main-navbar)
    nav.style.backgroundColor = `rgba(26, 16, 41, ${(0.82 * t).toFixed(3)})`;
    nav.style.backdropFilter = `blur(${(24 * t).toFixed(1)}px) saturate(${(1 + 0.5 * t).toFixed(2)})`;
    nav.style.borderColor = `rgba(255, 255, 255, ${(0.12 * t).toFixed(3)})`;
    nav.style.boxShadow = `0 ${(20 * t).toFixed(1)}px ${(50 * t).toFixed(1)}px rgba(0, 0, 0, ${(0.5 * t).toFixed(3)})`;

    // 2. Interpolación inversa para la píldora central (#nav-pill) para que se integre al contenedor
    if (navPill) {
      navPill.style.backgroundColor = `rgba(255, 255, 255, ${(0.04 * invT).toFixed(3)})`;
      navPill.style.borderColor = `rgba(255, 255, 255, ${(0.09 * invT).toFixed(3)})`;
      navPill.style.backdropFilter = invT > 0.01 ? `blur(${(12 * invT).toFixed(1)}px)` : 'none';
      navPill.style.boxShadow = `0 ${(10 * invT).toFixed(1)}px ${(25 * invT).toFixed(1)}px rgba(0, 0, 0, ${(0.2 * invT).toFixed(3)})`;
    }

    // 3. Interpolación inversa para el indicador de disponibilidad (#status-pill)
    if (statusPill) {
      statusPill.style.backgroundColor = `rgba(255, 255, 255, ${(0.04 * invT).toFixed(3)})`;
      statusPill.style.borderColor = `rgba(255, 255, 255, ${(0.08 * invT).toFixed(3)})`;
      statusPill.style.backdropFilter = invT > 0.01 ? `blur(${(12 * invT).toFixed(1)}px)` : 'none';
      statusPill.style.boxShadow = `0 ${(4 * invT).toFixed(1)}px ${(15 * invT).toFixed(1)}px rgba(0, 0, 0, ${(0.1 * invT).toFixed(3)})`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNavbar(); // Estado inicial al montar
}

// ─── Revelado por Secciones ───────────────────────────────────────────────────

function initSectionReveals() {
  // Sección Experiencia
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience h2, #experience span.uppercase'), { y: 20, duration: 0.55 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience .grid > *'), { y: 44, delay: 0.15, stagger: 0.1 });

  // Sección Proyectos
  revealOnScroll(document.querySelectorAll<HTMLElement>('#projects [data-section-label]'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#projects .w-full.mt-0'), { y: 52, delay: 0.1, duration: 0.85 });

  // Sección Comunidad
  revealOnScroll(document.querySelectorAll<HTMLElement>('#community span.uppercase'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#community .grid > *'), { y: 40, delay: 0.12, stagger: 0.12 });

  // Sección Testimonios
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials h2, #testimonials p'), { y: 28, duration: 0.65 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials .rounded-\\[32px\\]'), { y: 40, delay: 0.2, stagger: 0.15 });

  // Sección CTA y Contacto
  revealOnScroll(document.querySelectorAll<HTMLElement>('#contact h2'), { y: 36, duration: 0.8 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#contact a.rounded-full'), { y: 20, delay: 0.2, duration: 0.6 });

  // Blog índice y vista individual
  revealOnScroll(document.querySelectorAll<HTMLElement>('.blog-card-element'), { y: 36, stagger: 0.07, duration: 0.6 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('.article-prose > p, .article-prose > h2, .article-prose > ul'), {
    y: 20,
    stagger: 0.05,
    duration: 0.5,
  });
}

// ─── Efectos Hover en Tarjetas Interactivas ───────────────────────────────────

function initCardHovers() {
  // Elevación elástica suave para tarjetas del Blog
  document.querySelectorAll<HTMLElement>('.blog-card-element').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'translateY(-8px)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'translateY(0px)' }, { duration: 0.3, ease: EASE_SOFT });
    });
  });

  // Micro-escalado para Testimonios
  document.querySelectorAll<HTMLElement>('#testimonials .rounded-\\[32px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'scale(1.025)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'scale(1)' }, { duration: 0.28, ease: EASE_SOFT });
    });
  });

  // Elevación sutil para tarjetas de Comunidad
  document.querySelectorAll<HTMLElement>('#community .rounded-\\[20px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'scale(1.03) translateY(-5px)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'scale(1) translateY(0px)' }, { duration: 0.3, ease: EASE_SOFT });
    });
  });

  // Reacción dinámica en tarjetas de Experiencia
  document.querySelectorAll<HTMLElement>('#experience .rounded-\\[24px\\], #experience .rounded-\\[20px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'scale(1.015) translateY(-4px)' }, { duration: 0.3, ease: EASE_SOFT });
      return () => animate(card, { transform: 'scale(1) translateY(0px)' }, { duration: 0.28, ease: EASE_SOFT });
    });
  });
}

// ─── Hover Elástico en Botones Primarios ───────────────────────────────────────

function initButtonHovers() {
  const skip = ['nav-link', 'filter-btn', 'mobile-nav-link', 'mobile-link'];

  document.querySelectorAll<HTMLElement>('a.rounded-full[href], button.rounded-full').forEach((btn) => {
    if (skip.some((cls) => btn.classList.contains(cls))) return;

    hover(btn, () => {
      animate(btn, { transform: 'scale(1.05)' }, { duration: 0.22, ease: EASE_SOFT });
      return () => animate(btn, { transform: 'scale(1)' }, { duration: 0.18, ease: EASE_SOFT });
    });
  });
}

// ─── Parallax Sutil en Orbs Atmosféricos del Fondo ─────────────────────────────

function initOrbParallax() {
  if (window.innerWidth < 768) return; // Se omite en móviles para preservar el rendimiento

  const orbs = document.querySelectorAll<HTMLElement>(
    '[class*="bg-brand-orange"][class*="blur-[120px]"], [class*="bg-brand-purple"][class*="blur-[120px]"]'
  );
  if (!orbs.length) return;

  scroll((progress: number) => {
    orbs.forEach((orb, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const offset = progress * 70 * dir;
      orb.style.transform = `translateY(${offset}px)`;
    });
  });
}

// ─── Punto de Entrada Principal ───────────────────────────────────────────────

function run() {
  initNavbar();
  initHero();
  initSectionReveals();
  initCardHovers();
  initButtonHovers();
  initOrbParallax();
}

export function initAnimations() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

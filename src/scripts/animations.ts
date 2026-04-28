/**
 * animations.ts
 * Animaciones globales con Motion v12.
 * Importado una sola vez desde Layout.astro.
 */
import { animate, inView, hover, scroll, spring } from 'motion';

// ─── Constantes ─────────────────────────────────────────────────────────────

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_SOFT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INITIAL_HIDDEN = { opacity: 0 };
const VISIBLE = { opacity: 1 };

// ─── Helper: reveal con fade+slide al entrar en viewport ────────────────────

function revealOnScroll(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  { y = 32, delay = 0, stagger = 0.09, duration = 0.7 } = {}
) {
  const els = Array.from(elements);
  if (!els.length) return;

  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
  });

  els.forEach((el, i) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: 'translateY(0px)' },
          { duration, delay: delay + i * stagger, easing: EASE_OUT }
        );
      },
      { amount: 0.12 }
    );
  });
}

// ─── Hero: entrada en secuencia al cargar ───────────────────────────────────

function initHero() {
  const targets = [
    document.querySelector<HTMLElement>('[data-hero="badge"]'),
    document.querySelector<HTMLElement>('[data-hero="title"]'),
    document.querySelector<HTMLElement>('[data-hero="desc"]'),
    document.querySelector<HTMLElement>('[data-hero="buttons"]'),
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
      { duration: 0.75, delay: 0.08 + i * 0.12, easing: EASE_OUT }
    );
  });
}

// ─── Navbar: intensidad de blur al hacer scroll ──────────────────────────────

function initNavbar() {
  const nav = document.querySelector<HTMLElement>('nav');
  if (!nav) return;

  scroll((progress) => {
    const scrolled = progress > 0.015;
    nav.style.backdropFilter = scrolled ? 'blur(24px) saturate(1.5)' : 'blur(12px)';
    nav.style.boxShadow = scrolled ? '0 8px 40px rgba(0,0,0,0.45)' : 'none';
    nav.style.borderColor = scrolled
      ? 'rgba(123, 94, 167, 0.25)'
      : 'rgba(123, 94, 167, 0.15)';
  });
}

// ─── Reveal por sección ──────────────────────────────────────────────────────

function initSectionReveals() {
  // Experience
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience h2, #experience span.uppercase'), { y: 20, duration: 0.55 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience .grid > *'), { y: 44, delay: 0.15, stagger: 0.1 });

  // Projects
  revealOnScroll(document.querySelectorAll<HTMLElement>('#projects [data-section-label]'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#projects .w-full.mt-0'), { y: 52, delay: 0.1, duration: 0.85 });

  // Community
  revealOnScroll(document.querySelectorAll<HTMLElement>('#community span.uppercase'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#community .grid > *'), { y: 40, delay: 0.12, stagger: 0.12 });

  // Testimonials
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials h2, #testimonials p'), { y: 28, duration: 0.65 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials .rounded-\\[32px\\]'), { y: 40, delay: 0.2, stagger: 0.15 });

  // CTA
  revealOnScroll(document.querySelectorAll<HTMLElement>('#contact h2'), { y: 36, duration: 0.8 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#contact a.rounded-full'), { y: 20, delay: 0.2, duration: 0.6 });

  // Blog índice: hero text + grid de posts
  revealOnScroll(document.querySelectorAll<HTMLElement>('.blog-card-element'), { y: 36, stagger: 0.07, duration: 0.6 });

  // Blog slug: párrafos del artículo
  revealOnScroll(document.querySelectorAll<HTMLElement>('.article-prose > p, .article-prose > h2, .article-prose > ul'), {
    y: 20,
    stagger: 0.05,
    duration: 0.5,
  });
}

// ─── Hover en cards interactivas ─────────────────────────────────────────────

function initCardHovers() {
  // Blog cards — Motion ya hace el lift, Tailwind el border glow
  document.querySelectorAll<HTMLElement>('.blog-card-element').forEach((card) => {
    hover(card, () => {
      animate(card, { y: -8 }, { duration: 0.35, easing: spring({ stiffness: 260, damping: 22 }) });
      return () => animate(card, { y: 0 }, { duration: 0.3, easing: EASE_SOFT });
    });
  });

  // Testimonial cards
  document.querySelectorAll<HTMLElement>('#testimonials .rounded-\\[32px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { scale: 1.025 }, { duration: 0.35, easing: spring({ stiffness: 300, damping: 25 }) });
      return () => animate(card, { scale: 1 }, { duration: 0.28 });
    });
  });

  // Community cards
  document.querySelectorAll<HTMLElement>('#community .rounded-\\[20px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { scale: 1.03, y: -5 }, { duration: 0.35, easing: spring({ stiffness: 280, damping: 22 }) });
      return () => animate(card, { scale: 1, y: 0 }, { duration: 0.3 });
    });
  });

  // Experience cards
  document.querySelectorAll<HTMLElement>('#experience .rounded-\\[24px\\], #experience .rounded-\\[20px\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { y: -4, scale: 1.015 }, { duration: 0.3, easing: EASE_SOFT });
      return () => animate(card, { y: 0, scale: 1 }, { duration: 0.28 });
    });
  });
}

// ─── Hover en botones primarios ───────────────────────────────────────────────

function initButtonHovers() {
  const skip = ['nav-link', 'filter-btn', 'mobile-nav-link', 'mobile-link'];

  document.querySelectorAll<HTMLElement>('a.rounded-full[href], button.rounded-full').forEach((btn) => {
    if (skip.some((cls) => btn.classList.contains(cls))) return;

    hover(btn, () => {
      animate(btn, { scale: 1.05 }, { duration: 0.22, easing: spring({ stiffness: 450, damping: 22 }) });
      return () => animate(btn, { scale: 1 }, { duration: 0.18 });
    });
  });
}

// ─── Parallax sutil en orbs del fondo ────────────────────────────────────────

function initOrbParallax() {
  // Solo desktop — evitar jank en mobile
  if (window.innerWidth < 768) return;

  const orbs = document.querySelectorAll<HTMLElement>(
    '[class*="bg-brand-orange"][class*="blur-[120px]"], [class*="bg-brand-purple"][class*="blur-[120px]"]'
  );
  if (!orbs.length) return;

  scroll((progress) => {
    orbs.forEach((orb, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const offset = progress * 70 * dir;
      orb.style.transform = `translateY(${offset}px)`;
    });
  });
}

// ─── Inicialización ───────────────────────────────────────────────────────────

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

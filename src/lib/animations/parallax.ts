import { gsap } from "gsap";

export function initHeroParallax(): gsap.core.Timeline | null {
  const hero = document.querySelector<HTMLElement>(
    "[data-parallax-hero]"
  );

  const background = document.querySelector<HTMLElement>(
    "[data-parallax-background]"
  );

  const midground = document.querySelector<HTMLElement>(
    "[data-parallax-mid]"
  );

  const foreground = document.querySelector<HTMLElement>(
    "[data-parallax-fore]"
  );

  if (!hero || !background || !midground || !foreground) {
    return null;
  }

  // ============================================
  // ESTADO INICIAL
  // ============================================

  gsap.set(background, {
    autoAlpha: 0,
    scale: 1.08,
  });

  gsap.set(midground, {
    autoAlpha: 0,
    scale: 1.12,
    y: 30,
  });

  gsap.set(foreground, {
    autoAlpha: 0,
    scale: 1.16,
    y: 50,
  });

  // ============================================
  // INTRO DEL HERO
  // ============================================

  const intro = gsap.timeline();

  intro.to(background, {
    autoAlpha: 1,
    scale: 1,
    duration: 1.4,
    ease: "power3.out",
  });

  intro.to(
    midground,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    },
    "-=1"
  );

  intro.to(
    foreground,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.8"
  );

  // ============================================
  // PARALLAX
  // ============================================

  const state = {
    x: 0,
    y: 0,
  };

  const target = {
    x: 0,
    y: 0,
  };

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    target.x = (mouseX - centerX) / centerX;
    target.y = (mouseY - centerY) / centerY;
  });

  hero.addEventListener("mouseleave", () => {
    target.x = 0;
    target.y = 0;
  });

  gsap.ticker.add(() => {
    state.x += (target.x - state.x) * 0.05;
    state.y += (target.y - state.y) * 0.05;

    gsap.set(background, {
      x: state.x * 8,
      y: state.y * 8,
    });

    gsap.set(midground, {
      x: state.x * 18,
      y: state.y * 12,
    });

    gsap.set(foreground, {
      x: state.x * 30,
      y: state.y * 20,
    });
  });

  return intro;
}
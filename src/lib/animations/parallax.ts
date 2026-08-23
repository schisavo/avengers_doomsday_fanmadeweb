import gsap from "gsap";

export function initHeroParallax() {
  const hero = document.querySelector<HTMLElement>("[data-parallax-hero]");
  const background = document.querySelector<HTMLElement>(
    "[data-parallax-background]"
  );
  const character = document.querySelector<HTMLElement>(
    "[data-parallax-character]"
  );

  if (!hero || !background || !character) return;

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
      x: state.x * 10,
      y: state.y * 10,
    });

    gsap.set(character, {
      x: state.x * 30,
      y: state.y * 20,
    });
  });
}
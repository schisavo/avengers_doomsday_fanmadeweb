import { gsap } from "gsap";

/*
 * Inicializa la introduccion y el efecto parallax
 * de las diferentes capas del Hero.
 */
export function initHeroParallax(): gsap.core.Timeline | null {
  const hero =
    document.querySelector<HTMLElement>(
      "[data-parallax-hero]",
    );

  const background =
    document.querySelector<HTMLElement>(
      "[data-parallax-background]",
    );

  const midground =
    document.querySelector<HTMLElement>(
      "[data-parallax-mid]",
    );

  const foreground =
    document.querySelector<HTMLElement>(
      "[data-parallax-fore]",
    );

  /*
   * Detiene la inicializacion si falta alguna
   * de las capas necesarias para el efecto.
   */
  if (
    !hero ||
    !background ||
    !midground ||
    !foreground
  ) {
    return null;
  }

  /*
   * ================================================================
   * ESTADO INICIAL
   * ================================================================
   *
   * Prepara las capas antes de iniciar
   * la animacion de entrada del Hero.
   */

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

  /*
   * ================================================================
   * INTRO DEL HERO
   * ================================================================
   *
   * Revela cada capa de forma progresiva
   * para crear profundidad durante la entrada.
   */

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
    "-=1",
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
    "-=0.8",
  );

  /*
   * ================================================================
   * PARALLAX
   * ================================================================
   *
   * Calcula la posicion del cursor respecto al centro
   * del Hero y utiliza ese valor para mover las capas
   * a diferentes velocidades.
   */

  const state = {
    x: 0,
    y: 0,
  };

  const target = {
    x: 0,
    y: 0,
  };

  /*
   * Actualiza la posicion objetivo cuando
   * el cursor se mueve dentro del Hero.
   */
  hero.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        hero.getBoundingClientRect();

      const mouseX =
        event.clientX - rect.left;

      const mouseY =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      /*
       * Normaliza la posicion del cursor
       * entre -1 y 1 respecto al centro.
       */
      target.x =
        (mouseX - centerX) / centerX;

      target.y =
        (mouseY - centerY) / centerY;
    },
  );

  /*
   * Devuelve las capas a su posicion original
   * cuando el cursor sale del Hero.
   */
  hero.addEventListener(
    "mouseleave",
    () => {
      target.x = 0;
      target.y = 0;
    },
  );

  /*
   * Suaviza el movimiento de las capas utilizando
   * el ticker de GSAP.
   *
   * Cada capa utiliza una distancia diferente
   * para crear el efecto de profundidad.
   */
  gsap.ticker.add(() => {
    state.x +=
      (target.x - state.x) * 0.05;

    state.y +=
      (target.y - state.y) * 0.05;

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

  /*
   * Devuelve la timeline para que el modulo
   * que inicializa el Hero pueda controlarla.
   */
  return intro;
}
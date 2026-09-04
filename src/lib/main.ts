import { gsap } from "gsap";

import { initHeroParallax } from "./animations/parallax";
import { initIncursionLoader } from "./animations/preloader";
import { heroes_phrases } from "../data/phrases";
import { animatePhrases } from "../lib/animations/heroTextAnimation";

/*
 * Inicializa las animaciones principales del sitio.
 *
 * El preloader controla el momento en que comienzan
 * las animaciones del Hero y sus frases.
 */
function initAnimations() {
  const preloaderTimeline = initIncursionLoader();

  /*
   * Si no existe el preloader, las animaciones principales
   * comienzan inmediatamente.
   */
  if (!preloaderTimeline) {
    initHeroParallax();
    return;
  }

  /*
   * Espera a que termine la animacion del preloader
   * antes de iniciar el contenido principal.
   */
  preloaderTimeline.eventCallback("onComplete", () => {
    const preloader =
      document.querySelector<HTMLElement>("#preloader");

    /*
     * Si el elemento del preloader ya no existe,
     * inicia directamente las animaciones del Hero.
     */
    if (!preloader) {
      initHeroParallax();
      return;
    }

    /*
     * El Hero comienza mientras el preloader desaparece.
     */
    initHeroParallax();

    /*
     * Inicia la animacion de las frases del Hero.
     */
    animatePhrases(heroes_phrases);

    /*
     * Oculta el preloader y lo elimina del DOM
     * cuando termina la transicion.
     */
    gsap.to(preloader, {
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        preloader.remove();
      },
    });
  });
}

/*
 * Espera a que el documento este listo antes
 * de inicializar las animaciones.
 */
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initAnimations,
    { once: true }
  );
} else {
  initAnimations();
}
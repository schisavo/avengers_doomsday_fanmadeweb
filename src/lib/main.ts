import { gsap } from "gsap";
import { initHeroParallax } from "./animations/parallax";
import { initIncursionLoader } from "./animations/preloader";
import { heroes_phrases } from "../data/phrases"
import { animatePhrases } from "../lib/animations/heroTextAnimation";


function initAnimations() {
  const preloaderTimeline = initIncursionLoader();

  if (!preloaderTimeline) {
    initHeroParallax();
    return;
  }

  preloaderTimeline.eventCallback("onComplete", () => {
    const preloader =
        document.querySelector<HTMLElement>("#preloader");

    if (!preloader) {
        initHeroParallax();
        return;
    }

    // El Hero comienza mientras el preloader desaparece
    initHeroParallax();
    // las frases igual
    animatePhrases(heroes_phrases);

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

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initAnimations,
    { once: true }
  );
} else {
  initAnimations();
}
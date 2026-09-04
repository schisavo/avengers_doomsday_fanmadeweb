import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  closeMenu,
  openMenu,
  toggleMenu,
} from "../navigation/cornerMenu";

import { scrollToSection } from "../navigation/scrollToSection";

/*
 * Registra el plugin utilizado para detectar
 * las secciones activas durante el scroll.
 */
gsap.registerPlugin(ScrollTrigger);

/*
 * Inicializa el menu lateral y conecta sus
 * controles con la navegacion de la pagina.
 */
export function initializeCornerMenu(): void {
  const menuToggle =
    document.querySelector<HTMLButtonElement>(
      "#menu-toggle",
    );

  const menu =
    document.querySelector<HTMLElement>(
      "#corner-menu",
    );

  const currentIcon =
    document.querySelector<HTMLElement>(
      "#menu-current-icon",
    );

  const links =
    document.querySelectorAll<HTMLAnchorElement>(
      "#corner-menu a",
    );

  /*
   * Detiene la inicializacion si faltan
   * los elementos principales del menu.
   */
  if (!menuToggle || !menu || !currentIcon) {
    return;
  }

  const menuElements = {
    toggle: menuToggle,
    menu,
  };

  /*
   * ==========================================================
   * MENU TOGGLE
   * ==========================================================
   *
   * Conecta el boton principal con el estado
   * abierto o cerrado del menu.
   */

  menuToggle.addEventListener("click", () => {
    toggleMenu(menuElements);
  });

  /*
   * ==========================================================
   * NAVEGACION DE SECCION
   * ==========================================================
   *
   * Intercepta los enlaces del menu para utilizar
   * el desplazamiento animado de GSAP.
   */

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const target =
        link.getAttribute("href");

      if (!target) return;

      scrollToSection(target, () => {
        ScrollTrigger.refresh();
      });
    });
  });

  /*
   * ==========================================================
   * SCROLL
   * ==========================================================
   *
   * Detecta la seccion que ocupa el centro del viewport
   * y actualiza el estado visual del menu.
   */

  const sections =
    document.querySelectorAll<HTMLElement>(
      "section[id]",
    );

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",

      /*
       * Actualiza el menu al avanzar por las secciones.
       */
      onEnter: () => {
        highlightSection(
          section.id,
          links,
          currentIcon,
        );
      },

      /*
       * Actualiza el menu al desplazarse hacia arriba.
       */
      onEnterBack: () => {
        highlightSection(
          section.id,
          links,
          currentIcon,
        );
      },
    });
  });

  /*
   * ==========================================================
   * SECCION INICIAL
   * ==========================================================
   *
   * Determina que seccion esta mas cerca del centro
   * del viewport al cargar la pagina.
   */

  const initialSection =
    getCurrentSection(sections);

  if (initialSection) {
    highlightSection(
      initialSection.id,
      links,
      currentIcon,
    );
  }
}

/*
 * Actualiza el estado visual del menu segun
 * la seccion que esta actualmente activa.
 */
function highlightSection(
  sectionId: string,
  links: NodeListOf<HTMLAnchorElement>,
  currentIcon: HTMLElement,
): void {
  links.forEach((link) => {
    const target =
      link.getAttribute("href");

    const icon =
      link.getAttribute("data-icon");

    const isActive =
      target === `#${sectionId}`;

    const iconElement =
      link.querySelector<HTMLElement>(
        ".menu-item-icon",
      );

    /*
     * Cambia el color del icono segun
     * el estado activo del enlace.
     */
    iconElement?.classList.toggle(
        "bg-doom-green",
        isActive,
    );

    iconElement?.classList.toggle(
        "bg-doom-white-transparent",
        !isActive,
    );

    /*
     * Cambia el icono principal del menu
     * cuando encuentra la seccion activa.
     */
    if (isActive && icon) {
      updateCurrentIcon(
        currentIcon,
        icon,
      );
    }
  });
}

/*
 * Cambia el icono principal del menu
 * y ejecuta una pequena animacion de entrada.
 */
function updateCurrentIcon(
  currentIcon: HTMLElement,
  icon: string,
): void {
  currentIcon.style.maskImage =
    `url('${icon}')`;

  currentIcon.style.webkitMaskImage =
    `url('${icon}')`;

  /*
   * Anima el nuevo icono para reforzar
   * el cambio de seccion.
   */
  gsap.fromTo(
    currentIcon,
    {
      scale: 0.7,
      rotate: -20,
    },
    {
      scale: 1,
      rotate: 0,
      duration: 0.35,
      ease: "back.out(1.7)",
    },
  );
}

/*
 * Busca la seccion cuyo centro esta mas cerca
 * del centro visible de la ventana.
 */
function getCurrentSection(
  sections: NodeListOf<HTMLElement>,
): HTMLElement | null {
  const viewportCenter =
    window.innerHeight / 2;

  let closestSection:
    | HTMLElement
    | null = null;

  let closestDistance = Infinity;

  sections.forEach((section) => {
    const rect =
      section.getBoundingClientRect();

    const sectionCenter =
      rect.top + rect.height / 2;

    const distance = Math.abs(
      viewportCenter - sectionCenter,
    );

    /*
     * Conserva la seccion que tenga
     * la menor distancia al centro.
     */
    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  return closestSection;
}
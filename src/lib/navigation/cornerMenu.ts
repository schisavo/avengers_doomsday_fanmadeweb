import { gsap } from "gsap";

/*
 * Elementos necesarios para controlar
 * el estado del menu.
 */
export interface CornerMenuElements {
  toggle: HTMLButtonElement;
  menu: HTMLElement;
}

/*
 * Abre el menu y actualiza su estado accesible.
 */
export function openMenu({
  toggle,
  menu,
}: CornerMenuElements): void {
  /*
   * Permite que el menu sea visible y pueda recibir eventos.
   */
  menu.classList.remove(
    "invisible",
    "pointer-events-none",
  );

  /*
   * Actualiza el estado accesible del menu y del boton.
   */
  menu.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", "true");

  /*
   * Anima la apertura del menu desde la parte superior.
   */
  gsap.to(menu, {
    scaleY: 1,
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power3.out",
  });
}

/*
 * Cierra el menu y actualiza su estado accesible.
 */
export function closeMenu({
  toggle,
  menu,
}: CornerMenuElements): void {
  /*
   * Actualiza el estado accesible antes de iniciar
   * la animacion de cierre.
   */
  menu.setAttribute("aria-hidden", "true");
  toggle.setAttribute("aria-expanded", "false");

  /*
   * Anima el menu hasta ocultarlo.
   */
  gsap.to(menu, {
    scaleY: 0,
    opacity: 0,
    y: 0,
    duration: 0.3,
    ease: "power3.in",

    /*
     * Desactiva completamente el menu cuando
     * termina la animacion.
     */
    onComplete: () => {
      menu.classList.add(
        "invisible",
        "pointer-events-none",
      );
    },
  });
}

/*
 * Alterna entre el estado abierto y cerrado del menu.
 */
export function toggleMenu({
  toggle,
  menu,
}: CornerMenuElements): void {
  /*
   * Usa aria-expanded como fuente de verdad
   * para conocer el estado actual del menu.
   */
  const isOpen =
    toggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu({
      toggle,
      menu,
    });
  } else {
    openMenu({
      toggle,
      menu,
    });
  }
}
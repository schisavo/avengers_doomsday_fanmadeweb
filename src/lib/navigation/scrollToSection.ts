import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/*
 * Registra el plugin utilizado para controlar
 * el desplazamiento de la pagina con GSAP.
 */
gsap.registerPlugin(ScrollToPlugin);

/*
 * Desplaza la pagina hasta una seccion especifica.
 *
 * Permite ejecutar una funcion cuando termina
 * la animacion de desplazamiento.
 */
export function scrollToSection(
    target: string,
    onComplete?: () => void,
): void {
    const element =
        document.querySelector<HTMLElement>(target);

    /*
    * Detiene la ejecucion si la seccion
    * indicada no existe en el documento.
    */
    if (!element) return;

    /*
    * Anima el desplazamiento hasta el elemento.
    */
    gsap.to(window, {
        scrollTo: {
            y: element,
            offsetY: 0,
        },
        duration: 1,
        ease: "power3.inOut",
        onComplete,
    });
}
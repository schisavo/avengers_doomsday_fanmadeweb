import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getCountdown, padCountdown } from "../utils/dates";

/*
 * Registra el plugin utilizado para las animaciones
 * relacionadas con el scroll.
 */
gsap.registerPlugin(ScrollTrigger);

/*
 * Inicializa las animaciones y funcionalidades
 * de la seccion de lanzamiento.
 *
 * Devuelve una funcion de limpieza para eliminar
 * intervalos, eventos y animaciones activas.
 */
export function initializeRelease(): () => void {
    const section =
        document.querySelector<HTMLElement>("#pre-footer");

    /*
    * Si la seccion no existe, no hay nada que inicializar.
    */
    if (!section) return () => {};

    /*
    * Elementos utilizados por la animacion de entrada.
    */
    const eyebrow =
        section.querySelector<HTMLElement>(
            "#prefooter-eyebrow",
        );

    const date =
        section.querySelector<HTMLElement>(
            "#prefooter-date",
        );

    const subtitle =
        section.querySelector<HTMLElement>(
            "#prefooter-subtitle",
        );

    const countdown =
        section.querySelector<HTMLElement>(
            "#prefooter-countdown",
        );

    const boxes =
        section.querySelectorAll<HTMLElement>(
            "[data-countdown] > div",
        );

    /*
    * Elementos utilizados por el contador.
    */
    const countdownElement =
        section.querySelector<HTMLElement>(
            "[data-countdown]",
        );

    const days =
        section.querySelector<HTMLElement>(
            "[data-countdown-days]",
        );

    const hours =
        section.querySelector<HTMLElement>(
            "[data-countdown-hours]",
        );

    const minutes =
        section.querySelector<HTMLElement>(
            "[data-countdown-minutes]",
        );

    const seconds =
        section.querySelector<HTMLElement>(
            "[data-countdown-seconds]",
        );

    /*
    * Verifica que todos los elementos necesarios
    * existan antes de continuar.
    */
    if (
        !eyebrow ||
        !date ||
        !subtitle ||
        !countdown ||
        !countdownElement ||
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {
        return () => {};
    }

    /*
    * ================================================================
    * INTRO ANIMATION
    * ================================================================
    *
    * Prepara los elementos de la seccion y crea
    * una animacion que comienza cuando la seccion
    * entra en el viewport.
    */

    gsap.set(
        [eyebrow, date, subtitle, countdown],
        {
            opacity: 0,
            y: 30,
        },
    );

    gsap.set(boxes, {
        opacity: 0,
        y: 20,
    });

    const intro = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
        },
    });

    /*
    * Revela los elementos de la seccion
    * de forma progresiva y sincronizada.
    */
    intro
        .to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
        })
        .to(
        date,
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.35",
        )
        .to(
        subtitle,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.5",
        )
        .to(
        countdown,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.35",
        )
        .to(
        boxes,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            },
            "-=0.5",
        );

    /*
    * ================================================================
    * COUNTDOWN
    * ================================================================
    *
    * Obtiene la fecha objetivo desde el atributo
    * data-target-date y actualiza el contador cada segundo.
    */

    const targetDate =
        countdownElement.dataset.targetDate;

    /*
    * Si no existe una fecha objetivo, conserva
    * la animacion pero evita crear el intervalo.
    */
    if (!targetDate) {
        return () => {
            intro.scrollTrigger?.kill();
            intro.kill();
        };
    }

    /*
    * Calcula y muestra el tiempo restante.
    */
    const updateCountdown = (): void => {
        const value = getCountdown(targetDate);

        days.textContent = padCountdown(
            value.days,
            3,
        );

        hours.textContent = padCountdown(
            value.hours,
            2,
        );

        minutes.textContent = padCountdown(
            value.minutes,
            2,
        );

        seconds.textContent = padCountdown(
            value.seconds,
            2,
        );
    };

    /*
    * Actualiza el contador inmediatamente
    * para evitar esperar el primer intervalo.
    */
    updateCountdown();

    /*
    * Mantiene el contador actualizado cada segundo.
    */
    const countdownInterval = window.setInterval(
        updateCountdown,
        1000,
    );

    /*
    * ================================================================
    * PROJECT CARD
    * ================================================================
    *
    * Controla la apertura y cierre de la tarjeta
    * informativa del proyecto.
    */

    const toggle =
        section.querySelector<HTMLButtonElement>(
            "#project-card-toggle",
        );

    const content =
        section.querySelector<HTMLElement>(
            "#project-card-content",
        );

    const icon =
        section.querySelector<HTMLElement>(
            "#project-card-icon",
        );

    /*
    * El comportamiento solo se registra cuando
    * todos los elementos de la tarjeta existen.
    */
    if (toggle && content && icon) {
        toggle.addEventListener(
            "click",
            handleToggle,
        );
    }

    /*
    * Alterna el estado de la tarjeta y actualiza
    * sus atributos accesibles y estilos visuales.
    */
    function handleToggle(): void {
        if (!toggle || !content || !icon) return;

        const isOpen =
        toggle.getAttribute("aria-expanded") ===
        "true";

        /*
        * Actualiza el estado accesible del boton
        * y del contenido de la tarjeta.
        */
        toggle.setAttribute(
            "aria-expanded",
            String(!isOpen),
        );

        content.setAttribute(
            "aria-hidden",
            String(isOpen),
        );

        /*
        * Controla la expansion del contenido.
        */
        content.classList.toggle(
            "grid-rows-[1fr]",
            !isOpen,
        );

        /*
        * Anima el estado visual del icono.
        */
        icon.classList.toggle(
            "rotate-45",
            !isOpen,
        );

        icon.classList.toggle(
            "border-emerald-500/60",
            !isOpen,
        );
    }

    /*
    * ================================================================
    * CLEANUP
    * ================================================================
    *
    * Libera todos los recursos creados por esta
    * inicializacion para evitar intervalos, eventos
    * y animaciones activos cuando ya no son necesarios.
    */

    return () => {
        window.clearInterval(
            countdownInterval,
        );

        intro.scrollTrigger?.kill();
        intro.kill();

        toggle?.removeEventListener(
            "click",
            handleToggle,
        );
    };
}
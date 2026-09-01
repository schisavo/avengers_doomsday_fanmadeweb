import { gsap } from "gsap";

// Ventana de Carga de las Incursiones
/*
    El efecto ocurre asi:
        1. Se asignan las posiciones a los planetas "data-incursion-ball"
        2. El timeline empieza a correr indicando el tiempo que recurira todo 
        3. Se dibujan los planetas
        4. Se mueven al punto de colision (data-incursion-core)  
        5. Efecto de atraccion al punto de colision (data-incursion-core)  
        6. Tension antes del impacto
        7. Colision en el punto de colision (data-incursion-core)  
        8. Nucleo de energia
        9. Flash 
        10. Onda expansiva
        11. Explosion del aura
*/

export function initIncursionLoader(): gsap.core.Timeline | null {
    const preloader =
    document.querySelector<HTMLElement>("#preloader");

    if (!preloader) return null;

    const balls = gsap.utils.toArray<HTMLElement>(
        "[data-incursion-ball]"
    );

    const glow =
        document.querySelector<HTMLElement>(
            "[data-incursion-glow]"
    );

    const core =
        document.querySelector<HTMLElement>(
            "[data-incursion-core]"
    );

    const flash =
        document.querySelector<HTMLElement>(
            "[data-incursion-flash]"
    );

    const wave =
        document.querySelector<HTMLElement>(
            "[data-incursion-wave]"
    );

    if (balls.length !== 3 || !glow || !core || !flash || !wave ) {
        return null;
    }

/*
=====================================================
1. POSICIONES INICIALES
=====================================================
    Cada planeta viene de una direccion diferente.
    */
const positions = [
    /* Planeta 1 Posicion Inicial */
    { x: -180, y: -120, rotation: -25, },
    /* Planeta 2 Posicion Inicial */
    { x: 190, y: -80, rotation: 30, },
    /* Planeta 3 Posicion Inicial */
    { x: 40, y: 180, rotation: 15, },
];
    /* En orden de dibujo se asigna la posicion a cada planeta */
    balls.forEach((ball, index) => {
        const position = positions[index];

        gsap.set(ball, {
            x: position.x,
            y: position.y,
            scale: 0,
            opacity: 0,
        });
    });
/*
    * =====================================================
    * 2. TIMELINE
    * =====================================================
    */
const tl = gsap.timeline({
    defaults: {
        overwrite: "auto",
    },
});
/*
    * =====================================================
    * 3. APARECEN LAS TRES INCURSIONES
    * =====================================================
    */
tl.to(
    balls,
    {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.18,
        ease: "back.out(1.7)",
    }
);
/*
    * =====================================================
    * 4. SE MUEVEN HACIA EL CENTRO
    * =====================================================
    *
    * Cada una tiene una trayectoria ligeramente distinta.
    */
    /* Planeta 1 */
    tl.to(
        balls[0],
        {
            x: -75,
            y: -45,
            duration: 1.0,
            ease: "power3.inOut",
        },
        "<"
    );
    /* Planeta 2 */
    tl.to(
        balls[1],
        {
            x: 70,
            y: -35,
            duration: 1.05,
            ease: "power3.inOut",
        },
        "<"
    );
    /* Planeta 3 */
    tl.to(
        balls[2],
        {
            x: 15,
            y: 70,
            duration: 1.02,
            ease: "power3.inOut",
        },
        "<"
    );
/*
    * =====================================================
    * 5. ACELERACION FINAL
    * =====================================================
    *
    * Aquí deben sentirse como si fueran atraídas.
    */
    tl.to(
        balls,
        {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "power4.in",
            stagger: 0.02,
        }
    );
/*
    * =====================================================
    * 6. PEQUEÑA TENSION ANTES DEL IMPACTO
    * =====================================================
    */
    tl.to(
        balls,
        {
            scale: 1.25,
            duration: 0.35,
            ease: "power2.out",
        }
    );

    /* Pausa antes de la colision  */
    tl.to({}, { duration: 0.15 });
/*
    * =====================================================
    * 7. COLISION
    * =====================================================
    */
    tl.to(
        balls,
        {
            scale: 0,
            duration: 0.16,
            ease: "power4.in",
        }
    );
/*
    * =====================================================
    * 8. NUCLEO DE ENERGIA
    * =====================================================
    */
    tl.to(
        core,
        {
            scale: 8,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
        },
        "<"
    );
/*
    * =====================================================
    * 9. FLASH
    * =====================================================
    */
    tl.to(
        flash,
        {
            opacity: 0.75,
            duration: 0.08,
            ease: "power2.out",
        },
        "<"
    );
    tl.to(
        flash,
        {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        }
    );
/*
    * =====================================================
    * 10. ONDA EXPANSIVA
    * =====================================================
    */
    tl.to(
        wave,
        {
            scale: 120,
            opacity: 0.8,
            duration: 0.7,
            ease: "power3.out",
        },
        "<"
    );
    tl.to(
        wave,
        {
            opacity: 0,
            duration: 0.25,
        },
        "<0.45"
    );
/*
    * =====================================================
    * 11. EXPLOSIÓN DEL AURA
    * =====================================================
    */

    tl.to(
        glow,
        {
            scale: 8,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
        },
        "<"
    );

    return tl;
};
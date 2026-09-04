import { gsap } from "gsap";

/*
 * Valores que controlan la distribucion visual
 * de las tarjetas dentro del deck.
 */
const CARD_X = 230;
const CARD_Y = 12;
const CARD_ROTATION = 8;
const CARD_Z = 80;
const CARD_SCALE = 0.94;

/*
 * Define la posicion visual de una tarjeta
 * dentro del deck de la galeria.
 */
interface CardPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
}

/*
 * Inicializa la galeria, la navegacion entre tarjetas
 * y el lightbox de las imagenes.
 */
export function initializeGallery(): void {
  const gallery =
    document.querySelector<HTMLElement>(
      "#gallery",
    );

  /*
   * Detiene la inicializacion si la galeria
   * no existe en la pagina.
   */
  if (!gallery) return;

  const cards = Array.from(
    gallery.querySelectorAll<HTMLElement>(
      ".gallery-card",
    ),
  );

  const prevButton =
    gallery.querySelector<HTMLButtonElement>(
      "#gallery-prev",
    );

  const nextButton =
    gallery.querySelector<HTMLButtonElement>(
      "#gallery-next",
    );

  const counter =
    gallery.querySelector<HTMLElement>(
      "#gallery-counter",
    );

  /*
   * Elementos utilizados por el lightbox.
   */
  const lightbox =
    gallery.querySelector<HTMLElement>(
      "#gallery-lightbox",
    );

  const lightboxImage =
    gallery.querySelector<HTMLImageElement>(
      "#lightbox-image",
    );

  const lightboxClose =
    gallery.querySelector<HTMLButtonElement>(
      "#lightbox-close",
    );

  /*
   * Verifica que todos los elementos necesarios
   * existan antes de conectar los eventos.
   */
  if (
    !prevButton ||
    !nextButton ||
    !counter ||
    !lightbox ||
    !lightboxImage ||
    !lightboxClose ||
    cards.length === 0
  ) {
    return;
  }

  /*
   * Indice de la tarjeta que se encuentra
   * actualmente al frente del deck.
   */
  let activeIndex = 0;

  /*
   * Devuelve las tarjetas ordenadas comenzando
   * por la tarjeta actualmente activa.
   */
  function getOrderedCards(): HTMLElement[] {
    return cards.map(
      (_, position) =>
        cards[
          (activeIndex + position) %
            cards.length
        ],
    );
  }

  /*
   * Calcula la posicion visual de una tarjeta
   * dependiendo de su posicion dentro del deck.
   */
  function getCardPosition(
    position: number,
  ): CardPosition {
    /*
     * La tarjeta activa siempre ocupa
     * la posicion principal del deck.
     */
    if (position === 0) {
      return {
        x: 0,
        y: 0,
        z: 100,
        rotation: 0,
        scale: 1,
      };
    }

    /*
     * Las tarjetas restantes se desplazan
     * progresivamente para crear profundidad.
     */
    return {
      x: position * CARD_X,
      y: position * CARD_Y,
      z: 100 - position * CARD_Z,
      rotation: position * CARD_ROTATION,
      scale:
        1 -
        position * (1 - CARD_SCALE),
    };
  }

  /*
   * Actualiza el contador para mostrar
   * la tarjeta activa y el total disponible.
   */
  function updateCounter(): void {
    if (!counter) return;

    counter.textContent =
      `${String(activeIndex + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  }

  /*
   * Muestra el boton de ampliar solamente
   * en la tarjeta que se encuentra activa.
   */
  function updateExpandButtons(): void {
    cards.forEach((card, index) => {
      const expand =
        card.querySelector<HTMLButtonElement>(
          ".gallery-expand",
        );

      if (!expand) return;

      gsap.to(expand, {
        opacity:
          index === activeIndex ? 1 : 0,

        pointerEvents:
          index === activeIndex
            ? "auto"
            : "none",

        duration:
          index === activeIndex
            ? 0.25
            : 0.15,

        overwrite: true,
      });
    });
  }

  /*
   * Anima todas las tarjetas hacia su nueva
   * posicion despues de cambiar de tarjeta.
   */
  function animateDeck(): void {
    /*
     * Cancela las animaciones anteriores
     * para evitar conflictos durante una
     * navegacion rapida.
     */
    gsap.killTweensOf(cards);

    const orderedCards =
      getOrderedCards();

    orderedCards.forEach(
      (card, position) => {
        const target =
          getCardPosition(position);

        gsap.to(card, {
          x: target.x,
          y: target.y,
          z: target.z,
          rotation: target.rotation,
          scale: target.scale,

          duration:
            position === 0
              ? 0.65
              : 0.75,

          ease: "power3.out",
          overwrite: true,
        });
      },
    );

    /*
     * Sincroniza los controles con
     * el nuevo estado de la galeria.
     */
    updateExpandButtons();
    updateCounter();
  }

  /*
   * Coloca las tarjetas en su posicion inicial
   * sin ejecutar una animacion de entrada.
   */
  function initializeDeck(): void {
    const orderedCards =
      getOrderedCards();

    orderedCards.forEach(
      (card, position) => {
        const target =
          getCardPosition(position);

        gsap.set(card, {
          x: target.x,
          y: target.y,
          z: target.z,
          rotation: target.rotation,
          scale: target.scale,
        });
      },
    );

    /*
     * Configura inicialmente la visibilidad
     * de los botones de ampliar.
     */
    cards.forEach((card, index) => {
      const expand =
        card.querySelector<HTMLButtonElement>(
          ".gallery-expand",
        );

      if (!expand) return;

      gsap.set(expand, {
        opacity:
          index === activeIndex ? 1 : 0,

        pointerEvents:
          index === activeIndex
            ? "auto"
            : "none",
      });
    });

    updateCounter();
  }

  /*
   * Abre el lightbox utilizando la imagen
   * de la tarjeta actualmente activa.
   */
  function openLightbox(): void {
    const activeCard =
      cards[activeIndex];

    if (!activeCard) return;

    const image =
      activeCard.querySelector<HTMLImageElement>(
        ".card-image",
      );

    if (!image) return;

    if (!lightboxImage || !lightbox) {
      return;
    }

    /*
     * Copia la imagen activa al contenido
     * del lightbox.
     */
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    /*
     * Habilita la interaccion con el lightbox.
     */
    lightbox.classList.remove(
      "pointer-events-none",
    );

    /*
     * Anima la entrada del contenedor.
     */
    gsap.fromTo(
      lightbox,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
    );

    /*
     * Anima la entrada de la imagen.
     */
    gsap.fromTo(
      lightboxImage,
      {
        opacity: 0,
        scale: 0.75,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      },
    );
  }

  /*
   * Cierra el lightbox y devuelve sus elementos
   * a su estado oculto.
   */
  function closeLightbox(): void {
    /*
     * Oculta primero la imagen.
     */
    gsap.to(lightboxImage, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
    });

    if (!lightbox) return;

    /*
     * Oculta el contenedor y desactiva
     * la interaccion al terminar.
     */
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",

      onComplete: () => {
        lightbox.classList.add(
          "pointer-events-none",
        );
      },
    });
  }

  /*
   * Avanza hacia la siguiente tarjeta.
   */
  function handleNext(): void {
    activeIndex =
      (activeIndex + 1) % cards.length;

    animateDeck();
  }

  /*
   * Retrocede hacia la tarjeta anterior.
   */
  function handlePrevious(): void {
    activeIndex =
      (activeIndex - 1 + cards.length) %
      cards.length;

    animateDeck();
  }

  /*
   * Conecta los controles de navegacion.
   */
  nextButton.addEventListener(
    "click",
    handleNext,
  );

  prevButton.addEventListener(
    "click",
    handlePrevious,
  );

  /*
   * Conecta el boton de ampliar de cada tarjeta
   * con el lightbox.
   */
  cards.forEach((card) => {
    const expand =
      card.querySelector<HTMLButtonElement>(
        ".gallery-expand",
      );

    expand?.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        openLightbox();
      },
    );
  });

  /*
   * Permite cerrar el lightbox desde su boton.
   */
  lightboxClose.addEventListener(
    "click",
    closeLightbox,
  );

  /*
   * Permite cerrar el lightbox haciendo click
   * sobre el fondo exterior.
   */
  lightbox.addEventListener(
    "click",
    (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    },
  );

  /*
   * Permite cerrar el lightbox utilizando
   * la tecla Escape.
   */
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    },
  );

  /*
   * Configura la posicion inicial del deck.
   */
  initializeDeck();
}
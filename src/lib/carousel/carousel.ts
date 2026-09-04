export interface CarouselElements {
    carousel: HTMLElement;
    viewport: HTMLElement;
    track: HTMLElement;
    items: HTMLElement[];
    prev: HTMLButtonElement;
    next: HTMLButtonElement;
    dots: HTMLElement;
    filterButtons: HTMLButtonElement[];
}

export function initializeCarousel(): void {
    const carousels =
        document.querySelectorAll<HTMLElement>(
            "[data-simple-carousel]",
        );

    carousels.forEach((carousel) => {
        const elements = getCarouselElements(carousel);

        if (!elements) {
            return;
        }

        setupCarousel(elements);
    });
}

function getCarouselElements(
    carousel: HTMLElement,
): CarouselElements | null {
    const viewport =
        carousel.querySelector<HTMLElement>(
            "[data-carousel-viewport]",
        );

    const track =
        carousel.querySelector<HTMLElement>(
            "[data-carousel-track]",
        );

    const items = Array.from(
        track?.children ?? [],
    ).filter(
        (element): element is HTMLElement =>
            element instanceof HTMLElement,
    );

    const prev =
        carousel.querySelector<HTMLButtonElement>(
            "[data-carousel-prev]",
        );

    const next =
        carousel.querySelector<HTMLButtonElement>(
            "[data-carousel-next]",
        );

    const dots =
        carousel.querySelector<HTMLElement>(
            "[data-carousel-dots]",
        );

    const filterButtons = Array.from(
        carousel.querySelectorAll<HTMLButtonElement>(
            "[data-carousel-filter]",
        ),
    );

    if (
        !viewport ||
        !track ||
        !prev ||
        !next ||
        !dots ||
        items.length === 0
    ) {
        return null;
    }

    return {
        carousel,
        viewport,
        track,
        items,
        prev,
        next,
        dots,
        filterButtons,
    };
}

function setupCarousel(
    elements: CarouselElements,
): void {
    const {
        carousel,
        viewport,
        track,
        items,
        prev,
        next,
        dots,
        filterButtons,
    } = elements;

    let currentPage = 0;
    let cardsPerPage = 2;
    let pageCount = 1;

    // Null significa que todos los elementos estan visibles.
    let activeFilter: string | null = null;

    // Devuelve la cantidad de tarjetas visibles segun el viewport.
    const getCardsPerPage = (): number => {
        if (window.innerWidth < 640) {
            return 2;
        }

        if (window.innerWidth < 1024) {
            return 4;
        }

        return 6;
    };

    // Devuelve los elementos que pertenecen al filtro activo.
    const getVisibleItems = (): HTMLElement[] => {
        return items.filter((item) => {
            if (!activeFilter) {
                return true;
            }

            return item.dataset.team === activeFilter;
        });
    };

    // Muestra u oculta los elementos segun el filtro seleccionado.
    const updateFilterVisibility = (): void => {
        items.forEach((item) => {
            const shouldShow =
                !activeFilter ||
                item.dataset.team === activeFilter;

            item.classList.toggle(
                "hidden",
                !shouldShow,
            );
        });
    };

    // Actualiza el estado visual y accesible de los filtros.
    const updateFilterButtons = (): void => {
        filterButtons.forEach((button) => {
            const filter =
                button.dataset.carouselFilter;

            const isActive =
                filter === activeFilter;

            button.setAttribute(
                "aria-pressed",
                String(isActive),
            );

            button.classList.toggle(
                "scale-105",
                isActive,
            );

            button.classList.toggle(
                "ring-1",
                isActive,
            );

            button.classList.toggle(
                "ring-white/40",
                isActive,
            );
        });
    };

    // Calcula el ancho de cada tarjeta visible.
    const updateCardWidths = (): void => {
        const viewportWidth =
            viewport.clientWidth;

        if (viewportWidth <= 0) {
            return;
        }

        const visibleItems =
            getVisibleItems();

        if (visibleItems.length === 0) {
            return;
        }

        const styles =
            window.getComputedStyle(track);

        const gap =
            parseFloat(styles.columnGap) || 0;

        const totalGap =
            gap * (cardsPerPage - 1);

        const cardWidth =
            (viewportWidth - totalGap) /
            cardsPerPage;

        visibleItems.forEach((item) => {
            item.style.width =
                `${cardWidth}px`;
        });
    };

    // Genera los indicadores de paginacion.
    const renderDots = (): void => {
        dots.innerHTML = "";

        if (pageCount <= 1) {
            return;
        }

        for (
            let index = 0;
            index < pageCount;
            index++
        ) {
            const dot =
                document.createElement("button");

            dot.type = "button";

            dot.className =
                "h-1.5 rounded-full transition-all duration-300";

            dot.classList.toggle(
                "w-5",
                index === currentPage,
            );

            dot.classList.toggle(
                "bg-emerald-500",
                index === currentPage,
            );

            dot.classList.toggle(
                "w-1.5",
                index !== currentPage,
            );

            dot.classList.toggle(
                "bg-white/20",
                index !== currentPage,
            );

            dot.setAttribute(
                "aria-label",
                `Ir a la pagina ${index + 1}`,
            );

            dot.addEventListener(
                "click",
                () => goToPage(index),
            );

            dots.appendChild(dot);
        }
    };

    // Mueve el carousel a una pagina especifica.
    const goToPage = (page: number): void => {
        const visibleItems =
            getVisibleItems();

        if (
            pageCount <= 0 ||
            visibleItems.length === 0
        ) {
            return;
        }

        currentPage = Math.max(
            0,
            Math.min(
                page,
                pageCount - 1,
            ),
        );

        const targetIndex =
            currentPage * cardsPerPage;

        const target =
            visibleItems[targetIndex];

        if (!target) {
            return;
        }

        track.style.transform =
            `translate3d(-${target.offsetLeft}px, 0, 0)`;

        prev.disabled =
            currentPage === 0;

        next.disabled =
            currentPage === pageCount - 1;

        renderDots();
    };

    // Recalcula la estructura del carousel.
    const updateCarousel = (
        resetPage = false,
    ): void => {
        cardsPerPage =
            getCardsPerPage();

        const visibleItems =
            getVisibleItems();

        pageCount = Math.max(
            1,
            Math.ceil(
                visibleItems.length /
                    cardsPerPage,
            ),
        );

        if (resetPage) {
            currentPage = 0;
        } else {
            currentPage = Math.min(
                currentPage,
                pageCount - 1,
            );
        }

        updateCardWidths();
        goToPage(currentPage);
    };

    // Configura los filtros por equipo.
    filterButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const filter =
                    button.dataset.carouselFilter;

                if (!filter) {
                    return;
                }

                activeFilter =
                    activeFilter === filter
                        ? null
                        : filter;

                updateFilterVisibility();
                updateFilterButtons();
                updateCarousel(true);
            },
        );
    });

    // Boton anterior.
    prev.addEventListener(
        "click",
        () => {
            goToPage(
                currentPage - 1,
            );
        },
    );

    // Boton siguiente.
    next.addEventListener(
        "click",
        () => {
            goToPage(
                currentPage + 1,
            );
        },
    );

    // Mantiene el carousel sincronizado con el viewport.
    const resizeObserver =
        new ResizeObserver(() => {
            const newCardsPerPage =
                getCardsPerPage();

            const breakpointChanged =
                newCardsPerPage !==
                cardsPerPage;

            updateCarousel(
                breakpointChanged,
            );
        });

    resizeObserver.observe(viewport);

    // Configuracion inicial.
    requestAnimationFrame(() => {
        updateFilterVisibility();
        updateFilterButtons();
        updateCarousel(true);

        requestAnimationFrame(() => {
            carousel.classList.remove(
                "opacity-0",
            );
        });
    });
}
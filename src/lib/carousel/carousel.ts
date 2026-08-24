import { gsap } from "gsap";

const initPeopleCarousels = () => {
  const carousels =
    document.querySelectorAll<HTMLElement>(
      "[data-people-carousel]"
    );

  carousels.forEach((carousel) => {
    const viewport =
      carousel.querySelector<HTMLElement>(
        "[data-people-viewport]"
      );

    const prevButton =
      carousel.querySelector<HTMLButtonElement>(
        "[data-people-prev]"
      );

    const nextButton =
      carousel.querySelector<HTMLButtonElement>(
        "[data-people-next]"
      );

    const filterButtons = Array.from(
      carousel.querySelectorAll<HTMLButtonElement>(
        "[data-people-filter]"
      )
    );

    const memberElements = Array.from(
      carousel.querySelectorAll<HTMLElement>(
        "[data-people-member]"
      )
    );

    if (!viewport || !prevButton || !nextButton) {
      return;
    }

    let currentIndex = 0;
    let currentFilter = "all";

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    /*
     * ==============================
     * ELEMENTOS VISIBLES
     * ==============================
     */

    const getVisibleMembers = () => {
      return memberElements.filter((member) => {
        return (
          currentFilter === "all" ||
          member.dataset.filterValue === currentFilter
        );
      });
    };

    /*
     * ==============================
     * BOTONES
     * ==============================
     */

    const updateButtons = () => {
      const visibleMembers = getVisibleMembers();

      prevButton.disabled =
        currentIndex <= 0;

      nextButton.disabled =
        visibleMembers.length === 0 ||
        currentIndex >= visibleMembers.length - 1;
    };

    /*
     * ==============================
     * DOTS
     * ==============================
     */

    const updateDots = () => {
      const dotsContainer =
        carousel.querySelector<HTMLElement>(
          "[data-people-dots]"
        );

      if (!dotsContainer) {
        return;
      }

      const visibleMembers = getVisibleMembers();

      dotsContainer.innerHTML = "";

      visibleMembers.forEach((_, index) => {
        const dot =
          document.createElement("button");

        dot.type = "button";

        dot.setAttribute(
          "aria-label",
          `Ir al elemento ${index + 1}`
        );

        dot.className =
          index === currentIndex
            ? "h-1.5 w-6 rounded-full bg-[#05a85c] transition-all duration-300"
            : "h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300";

        dot.addEventListener("click", () => {
          goTo(index);
        });

        dotsContainer.appendChild(dot);
      });
    };

    const refreshDots = () => {
      const dots =
        Array.from(
          carousel.querySelectorAll<HTMLButtonElement>(
            "[data-people-dots] button"
          )
        );

      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove(
            "w-1.5",
            "bg-white/20"
          );

          dot.classList.add(
            "w-6",
            "bg-[#05a85c]"
          );
        } else {
          dot.classList.remove(
            "w-6",
            "bg-[#05a85c]"
          );

          dot.classList.add(
            "w-1.5",
            "bg-white/20"
          );
        }
      });
    };

    /*
     * ==============================
     * POSICIÓN
     * ==============================
     */

    const getCardPosition = (
      index: number
    ) => {
      const visibleMembers =
        getVisibleMembers();

      const card = visibleMembers[index];

      if (!card) {
        return 0;
      }

      return card.offsetLeft - 16;
    };

    /*
     * ==============================
     * IR A ELEMENTO
     * ==============================
     */

    const goTo = (
      index: number,
      animate = true
    ) => {
      const visibleMembers =
        getVisibleMembers();

      if (!visibleMembers.length) {
        return;
      }

      currentIndex = Math.max(
        0,
        Math.min(
          index,
          visibleMembers.length - 1
        )
      );

      const target =
        getCardPosition(currentIndex);

      gsap.killTweensOf(viewport);

      if (animate) {
        gsap.to(viewport, {
          scrollLeft: target,
          duration: 0.65,
          ease: "power3.out",
          overwrite: true,
        });
      } else {
        viewport.scrollLeft = target;
      }

      updateButtons();
      refreshDots();
    };

    /*
     * ==============================
     * ACTUALIZAR ELEMENTOS
     * ==============================
     */

    const updateMembers = () => {
      const visibleMembers =
        getVisibleMembers();

      memberElements.forEach((member) => {
        const isVisible =
          currentFilter === "all" ||
          member.dataset.filterValue ===
            currentFilter;

        member.style.display =
          isVisible ? "" : "none";
      });

      currentIndex = 0;

      gsap.killTweensOf(viewport);

      viewport.scrollLeft = 0;

      updateDots();

      gsap.fromTo(
        visibleMembers,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        }
      );

      updateButtons();
    };

    /*
     * ==============================
     * FILTROS
     * ==============================
     */

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter =
          button.dataset.peopleFilter;

        if (!filter) {
          return;
        }

        currentFilter = filter;

        filterButtons.forEach(
          (filterButton) => {
            const isActive =
              filterButton.dataset
                .peopleFilter ===
              currentFilter;

            filterButton.setAttribute(
              "aria-pressed",
              String(isActive)
            );

            filterButton.classList.toggle(
              "border-[#05a85c]",
              isActive
            );

            filterButton.classList.toggle(
              "bg-[#05a85c]",
              isActive
            );

            filterButton.classList.toggle(
              "text-white",
              isActive
            );

            filterButton.classList.toggle(
              "border-white/10",
              !isActive
            );

            filterButton.classList.toggle(
              "bg-white/5",
              !isActive
            );

            filterButton.classList.toggle(
              "text-white/70",
              !isActive
            );
          }
        );

        updateMembers();
      });
    });

    /*
     * ==============================
     * PREV / NEXT
     * ==============================
     */

    prevButton.addEventListener(
      "click",
      () => {
        goTo(currentIndex - 1);
      }
    );

    nextButton.addEventListener(
      "click",
      () => {
        goTo(currentIndex + 1);
      }
    );

    /*
     * ==============================
     * TECLADO
     * ==============================
     */

    viewport.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "ArrowRight"
        ) {
          event.preventDefault();
          goTo(currentIndex + 1);
        }

        if (
          event.key === "ArrowLeft"
        ) {
          event.preventDefault();
          goTo(currentIndex - 1);
        }

        if (event.key === "Home") {
          event.preventDefault();
          goTo(0);
        }

        if (event.key === "End") {
          event.preventDefault();

          goTo(
            getVisibleMembers().length - 1
          );
        }
      }
    );

    /*
     * ==============================
     * DRAG
     * ==============================
     */

    viewport.addEventListener(
      "pointerdown",
      (event) => {
        isDragging = true;

        startX = event.clientX;
        startScrollLeft =
          viewport.scrollLeft;

        viewport.setPointerCapture(
          event.pointerId
        );

        viewport.style.cursor =
          "grabbing";

        viewport.style.scrollSnapType =
          "none";

        gsap.killTweensOf(viewport);
      }
    );

    viewport.addEventListener(
      "pointermove",
      (event) => {
        if (!isDragging) {
          return;
        }

        const distance =
          event.clientX - startX;

        viewport.scrollLeft =
          startScrollLeft - distance;
      }
    );

    const stopDragging = (
      event: PointerEvent
    ) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      viewport.style.cursor = "";
      viewport.style.scrollSnapType = "";

      try {
        viewport.releasePointerCapture(
          event.pointerId
        );
      } catch {
        // Pointer ya liberado.
      }

      const visibleMembers =
        getVisibleMembers();

      let closestIndex = 0;
      let closestDistance = Infinity;

      visibleMembers.forEach(
        (member, index) => {
          const distance = Math.abs(
            member.offsetLeft -
              viewport.scrollLeft
          );

          if (
            distance < closestDistance
          ) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      );

      goTo(closestIndex);
    };

    viewport.addEventListener(
      "pointerup",
      stopDragging
    );

    viewport.addEventListener(
      "pointercancel",
      stopDragging
    );

    /*
     * ==============================
     * MOUSE WHEEL
     * ==============================
     */

    viewport.addEventListener(
      "wheel",
      (event) => {
        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {
          if (event.shiftKey) {
            event.preventDefault();

            viewport.scrollLeft +=
              event.deltaY;
          }
        }
      },
      { passive: false }
    );

    /*
     * ==============================
     * RESIZE
     * ==============================
     */

    const resizeObserver =
      new ResizeObserver(() => {
        goTo(currentIndex, false);
      });

    resizeObserver.observe(viewport);

    /*
     * ==============================
     * INICIALIZACIÓN
     * ==============================
     */

    updateMembers();
    updateButtons();
  });
};

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initPeopleCarousels,
    { once: true }
  );
} else {
  initPeopleCarousels();
}
export interface NavigationItem {
    label: string;
    href: `#${string}`;
    section: string;
    icon: string;
}

export const navigationItems: NavigationItem[] = [
    {
        label: "Home",
        href: "#hero",
        section: "hero",
        icon: "/icons/doom.svg",
    },
    {
        label: "Trailer",
        href: "#trailer",
        section: "trailer",
        icon: "/icons/trailer.svg",
    },
    {
        label: "Synopsis",
        href: "#synopsis",
        section: "synopsis",
        icon: "/icons/synopsis.svg",
    },
    {
        label: "Cast",
        href: "#cast",
        section: "cast",
        icon: "/icons/cast.svg",
    },
    {
        label: "Crew",
        href: "#crew",
        section: "crew",
        icon: "/icons/boleto.svg",
    },
    {
        label: "Gallery",
        href: "#gallery",
        section: "gallery",
        icon: "/icons/gallery.svg",
    },
    {
        label: "Footer",
        href: "#pre-footer",
        section: "pre-footer",
        icon: "/icons/doom.svg",
    },
];
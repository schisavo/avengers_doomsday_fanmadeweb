# Avengers: Doomsday FanMade

> ⚠️ **Disclaimer**  
> This is a **fan-made educational project**. It is **not affiliated with Marvel Studios, Disney, or any official Avengers production**.  
> The purpose of this site is purely **learning and practice** of modern web technologies.  
> All names, logos, and references to *Avengers* or *Marvel* belong to their respective owners.

---

## Project Purpose

Inspired by [MiduDev](https://midu.dev) and his *Spiderman: Brand New Day* fan project, I created this website to:

- Practice **professional web technologies** used in real-world projects.  
- Learn about **modular architecture** and scalable design.  
- Experiment with **GSAP animations**, **Astro framework**, and **modern frontend workflows**.  
- Build a **creative fan experience** while improving my developer skills.

---

## Tech Stack

This project uses:

- **[Astro](https://astro.build/)** → Static site generator with islands architecture.  
- **GSAP** → Advanced animations and scroll effects.  
- **TailwindCSS** → Utility-first CSS framework for styling.  
- **TypeScript** → Safer, typed JavaScript development.  
- **pnpm** → Fast and efficient package manager.  

---

## Project Structure - Feature/Section-Oriented Architecture + Separation of Concerns
```text
avengers_doomsday_fanmadeweb/
│
├── .astro/                         # ⚙️ Generado automáticamente por Astro
├── .git/                           # ⚙️ Historial de Git
├── .vscode/                        # ⚙️ Configuración de VS Code
├── node_modules/                   # ⚙️ Dependencias instaladas
│
├── public/                         # 📦 Todo lo que se sirve directamente
│   │
│   ├── favicon/                    # 🖼️ Favicons y variantes
│   │
│   ├── fonts/                      # 🔤 Fuentes locales
│   │
│   ├── icons/                      # 🎨 SVG e iconos del sitio
│   │
│   ├── images/                     # 🖼️ Imágenes estáticas
│   │   │
│   │   ├── characters/             # 👤 Imágenes de personajes
│   │   ├── environments/           # 🌆 Fondos, escenarios y parallax
│   │   ├── gallery/                # 🖼️ Imágenes de la galería
│   │   ├── logos/                  # 🏷️ Logos y marcas visuales
│   │   └── ui/                     # 🎨 Recursos visuales de interfaz
│   │
│   └── videos/                     # 🎬 Trailers, clips y videos
│
├── src/                            # 💻 Código fuente de la aplicación
│   │
│   ├── assets/                     # 📦 Assets que Astro procesa/bundlea
│   │
│   ├── components/                 # 🧩 Interfaz visual
│   │   │
│   │   ├── layout/                 # 🏗️ Elementos estructurales globales
│   │   │   ├── SiteHeader.astro    # Cabecera global
│   │   │   ├── CornerMenu.astro    # Menú principal
│   │   │   └── SiteFooter.astro    # Footer global
│   │   │
│   │   ├── sections/               # 🎬 Secciones principales de la web
│   │   │   │
│   │   │   ├── Hero/               # ⚡ Hero principal
│   │   │   │   ├── Hero.astro
│   │   │   │   ├── HeroLayers.astro
│   │   │   │   └── HeroContent.astro
│   │   │   │
│   │   │   ├── Trailer/             # 🎬 Sección del trailer
│   │   │   │   └── Trailer.astro
│   │   │   │
│   │   │   ├── Synopsis/            # 📖 Sinopsis
│   │   │   │   └── Synopsis.astro
│   │   │   │
│   │   │   ├── Cast/                # 👥 Reparto
│   │   │   │   ├── Cast.astro
│   │   │   │   └── CastCard.astro
│   │   │   │
│   │   │   ├── Crew/                # 🎥 Equipo creativo
│   │   │   │   ├── Crew.astro
│   │   │   │   └── CrewCard.astro
│   │   │   │
│   │   │   ├── Gallery/             # 🖼️ Galería
│   │   │   │   ├── Gallery.astro
│   │   │   │   └── GalleryCard.astro
│   │   │   │
│   │   │   ├── MovieInfo/           # 🎞️ Información de la película
│   │   │   │   └── MovieInfo.astro
│   │   │   │
│   │   │   └── Release/             # ⏳ Estreno + contador + declaración
│   │   │       └── ReleaseSection.astro
│   │   │
│   │   └── ui/                     # 🧩 Componentes pequeños reutilizables
│   │       ├── Button.astro
│   │       ├── Countdown.astro
│   │       ├── ExpandableCard.astro
│   │       └── SectionLabel.astro
│   │
│   ├── data/                       # 🗃️ Contenido de la aplicación
│   │   ├── movie.ts                # Datos generales de la película
│   │   ├── cast.ts                 # Reparto
│   │   ├── crew.ts                 # Equipo
│   │   ├── gallery.ts              # Datos de imágenes de galería
│   │   ├── navigation.ts           # Items del menú
│   │   └── quotes.ts               # Frases/textos
│   │
│   ├── lib/                        # 🧠 Lógica y comportamiento
│   │   │
│   │   ├── animations/             # 🎞️ GSAP + ScrollTrigger
│   │   │   ├── hero.ts             # Animaciones del Hero
│   │   │   ├── gallery.ts          # Animaciones de galería
│   │   │   ├── release.ts          # Animaciones del Release
│   │   │   ├── footer.ts           # Animaciones del Footer
│   │   │   ├── menu.ts             # Animaciones del menú
│   │   │   └── scrollSpy.ts        # Estado activo según scroll
│   │   │
│   │   ├── effects/                # ✨ Sistemas visuales complejos
│   │   │   ├── heroMagic.ts        # Magia verde alrededor de Doom
│   │   │   ├── debris.ts           # Polvo/escombros
│   │   │   └── particles.ts        # Partículas genéricas
│   │   │
│   │   ├── navigation/             # 🧭 Lógica de navegación
│   │   │   ├── menu.ts             # Abrir/cerrar menú
│   │   │   └── scrollToSection.ts   # Scroll hacia secciones
│   │   │
│   │   ├── utils/                  # 🔧 Funciones auxiliares
│   │   │   ├── dom.ts              # Helpers para DOM
│   │   │   ├── dates.ts             # Fechas/contador
│   │   │   ├── viewport.ts          # Tamaños y responsive
│   │   │   └── imageCoordinates.ts  # Coordenadas de imágenes
│   │   │
│   │   └── main.ts                 # 🚀 Inicializador principal
│   │
│   ├── layouts/                    # 🏗️ Layouts de Astro
│   │   └── BaseLayout.astro        # Layout global HTML
│   │
│   ├── pages/                      # 🌐 Rutas
│   │   └── index.astro             # Página principal /
│   │
│   └── styles/                     # 🎨 CSS global
│       ├── global.css              # Reset + estilos globales
│       ├── variables.css           # Variables del proyecto
│       └── utilities.css            # Clases/utilidades propias
│
├── .gitignore                      # 🚫 Archivos ignorados por Git
├── AGENTS.md                       # 🤖 Instrucciones para agentes
├── CLAUDE.md                       # 🤖 Instrucciones para Claude
├── astro.config.mjs                # ⚙️ Configuración de Astro
├── package.json                    # 📦 Dependencias y scripts
├── pnpm-lock.yaml                  # 🔒 Lockfile
├── pnpm-workspace.yaml             # ⚙️ Configuración PNPM
├── README.md                       # 📚 Documentación
└── tsconfig.json                   # ⚙️ Configuración TypeScript
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`    | Get help using the Astro CLI                     |
|______________________________________________________________________________|


## Features Implemented

- **Hero Section** → Parallax + GSAP animations.
- **Trailer Section** → Embedded video player with styled container.
- **Gallery Component** → Interactive image gallery with lightbox and transitions.
- **Preloader** → GSAP animated intro with cinematic effect.
- **Infinite Panels** → Scroll-based transitions between sections.
- **Corner Frame Menu** → Custom navigation with tooltips and GSAP hover effects.
---

## Learning Goals

This project is part of my journey to:

- Understand frontend animation workflows with GSAP.
- Apply responsive design with TailwindCSS.
- Explore Astro’s component-based architecture.
- Practice Git branching strategies (develop, feature/*, PRs).

---
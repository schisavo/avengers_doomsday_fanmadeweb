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

## Project Structure
```text
/
├── public/
├── src/
│   └── assets/
│   |   └── 
│   └── components/      # Reusable UI components (Hero, Gallery, Trailer, etc.)
│   └── data/            # Information
│   └── layouts/         # Page layouts
│   └── lib/             # Reusable
│   └── pages/           # Route-based pages (index.astro)
│   |   └── index.astro
|   └── styles/
└── package.json         # Dependencies and scripts
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
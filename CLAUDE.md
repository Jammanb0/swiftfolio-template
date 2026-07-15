# CLAUDE.md

Guidance for Claude Code (or any AI coding agent) working in this repo.

## What this is

A React + TypeScript portfolio site template, styled like a clean fintech
product (white background, one blue accent color, big confident type, rich
but subtle motion). Meant to be forked/cloned by anyone and deployed as
their own `<username>.github.io` GitHub Pages site.

## Stack

- **Vite + React 19 + TypeScript** — build tool and framework
- **vanilla-extract** (`@vanilla-extract/css`, `/recipes`, `/vite-plugin`) —
  the only styling solution in this repo. Every component's styles live in a
  sibling `*.css.ts` file next to the component. Do not add Emotion, styled-
  components, Tailwind, or CSS Modules — vanilla-extract already covers this
  and mixing systems defeats the point.
- **Framer Motion** — component-level animation: page transitions
  (`src/components/layout/Layout.tsx`), hover/tap micro-interactions
  (`Button`, `ProjectCard`).
- **GSAP + ScrollTrigger** (`src/lib/gsap.ts`) — larger, orchestrated
  animation, currently just the hero entrance timeline
  (`src/components/home/Hero.tsx`). Reach for GSAP when Framer Motion's
  declarative variants aren't expressive enough (complex timelines, scroll-
  scrubbed effects), not for simple fades/hovers.
- **react-router-dom** — client-side routing (`BrowserRouter`).
- **oxlint** — linter (`npm run lint`), not ESLint. **prettier** — formatter
  (`npm run format`).
- **gh-pages** — deploy script (`npm run deploy`) pushes `dist/` to a
  `gh-pages` branch.

## Commands

```bash
npm run dev       # dev server (localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run format    # prettier --write .
npm run deploy    # build + push dist/ to gh-pages branch
```

## Architecture

```
src/
  components/
    layout/     Header, Footer, Layout (page-transition wrapper), Container
    ui/         Generic, content-agnostic: Button (recipe-based variants), Tag
    portfolio/  Domain components: ProjectCard, YoutubeEmbed, LinkList, icons
    home/       Hero (GSAP entrance timeline)
  data/
    profile.ts   Single source of truth for the site owner's info
    projects.ts  Single source of truth for portfolio entries — an array of
                 Project objects. Nothing else needs to change to add a
                 project; the list page, home "Featured" section, and detail
                 route all derive from this array.
  pages/         One file per route: Home, Projects, ProjectDetail, NotFound
  styles/
    theme.css.ts   All design tokens (color, spacing, type scale, radius,
                    shadow, transition) via `createGlobalTheme`. Change a
                    token here, it propagates everywhere — never hardcode a
                    color or spacing value in a component's .css.ts file.
    global.css.ts  CSS reset / base element styles
  types/project.ts Project / ProjectLink types
```

## Conventions

- Path alias `@/*` maps to `src/*` (configured in `tsconfig.app.json` and
  `vite.config.ts`) — use it instead of relative `../../..` imports.
- Every visual component gets a co-located `ComponentName.css.ts`. Import
  styles from it, don't inline `style={{ ... }}` except for genuinely dynamic
  per-instance values (e.g. a background-image URL from data).
- Variant-based components (e.g. `Button`) use `@vanilla-extract/recipes`
  (`recipe({ base, variants, defaultVariants })`), not conditional classNames.
- Adding a portfolio entry never requires touching routing or page code —
  only `src/data/projects.ts`. If a change to add a project touches anything
  else, something is architecturally wrong.
- This repo targets a **user page** (`username.github.io`, served from
  repo root, `base: '/'` in `vite.config.ts`). If someone deploys it as a
  **project page** instead, `vite.config.ts`'s `base` and
  `public/404.html`'s `pathSegmentsToKeep` both need updating — see README.

## Things not to do

- Don't add a CMS, MDX, or a headless content backend — the whole point of
  `src/data/projects.ts` is that adding a project is a single-file, single-
  array-entry, git-diffable change.
- Don't add a second styling library alongside vanilla-extract.
- Don't remove the GitHub Pages SPA redirect (`public/404.html` +
  the inline script in `index.html`) — without it, deep links like
  `/projects/foo` 404 on refresh.

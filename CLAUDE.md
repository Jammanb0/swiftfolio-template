# CLAUDE.md

Guidance for Claude Code (or any AI coding agent) working in this repo —
including anyone who forks this template and opens it with their own AI
coding agent. Keep everything here generic and reusable: architecture,
conventions, stack rules. Two gitignored, local-only files sit alongside this
one and nothing here should depend on either existing: `DECISIONS.md` (this
project's technical decisions/rationale and future plans) and
`CLAUDE.personal.md` (the project owner's own Claude-workflow habits and
anything specific to their personal instance of this project — never generic). If something in
either of those turns out to be generic enough that other users of this
template would benefit from it, ask before promoting it into this file
instead of assuming it should stay private.

## What this is

A React + TypeScript portfolio site template, styled like a clean fintech
product — Toss-style: white background, a single blue accent color, generous
rounded corners, subtle shadows, big confident type, paired with rich but
purposeful motion (not just a bare white page). Meant to be forked/cloned by
anyone and deployed as their own `<username>.github.io` GitHub Pages site.

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
- **react-router-dom** — client-side routing (`BrowserRouter`), routes are
  `React.lazy`-loaded per page so the heavy markdown renderer only loads on
  `/projects/:id`.
- **react-markdown + remark-gfm** — `Project.description` is GitHub-flavored
  Markdown, rendered by `src/components/portfolio/Markdown.tsx`. That
  component also implements a custom convention: a fenced code block with
  language `youtube` (```` ```youtube\nVIDEO_ID\n``` ````) renders as an
  inline `YoutubeEmbed` instead of a code block — this is how a project can
  have more than one video, anywhere in the body, without touching HTML.
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
    SiteMeta.tsx  Renders nothing — a mount-once effect (mounted in App.tsx)
                that sets document.title and the favicon <link> from
                profile.name / profile.avatar at runtime, since index.html
                is static and can't know profile data at build time.
    layout/     Header (renders profile.avatar as a circular image when set —
                empty string renders nothing, don't add a fallback icon),
                Footer, Layout (page-transition wrapper), Container
    ui/         Generic, content-agnostic: Button (recipe-based variants), Tag
    portfolio/  Domain components: ProjectCard (truncates tags to 4 + a "+N"
                badge — full list still shown on the detail page, filtering
                always matches against the untruncated Project.tags),
                YoutubeEmbed, LinkList, Markdown (renders Project.description),
                ProjectFilters (search + tag filter with an any/all mode
                toggle + year filter, used on the Projects page), icons
    home/       Hero (GSAP entrance timeline)
  data/
    profile.ts   Single source of truth for the site owner's info
    projects.ts  Single source of truth for portfolio entries — an array of
                 Project objects, plus derived `allTags`/`allYears` used by
                 ProjectFilters. Nothing else needs to change to add a
                 project; the list page, home "Featured" section, and detail
                 route all derive from this array.
  lib/
    date.ts   formatPeriod(date, endDate) — '2026.03 - 진행 중' style strings
    gsap.ts   registers ScrollTrigger once, re-exports gsap
  pages/         One file per route: Home, Projects (owns filter state),
                 ProjectDetail, NotFound
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
- `ProjectDetail`'s media block (`src/pages/ProjectDetail.tsx`) only renders
  when `thumbnail` and/or `youtubeId` is set — never render an empty
  placeholder box when both are missing. When both are set, the banner image
  comes first, the video second (both stacked, not either/or).
- This repo targets a **user page** (`username.github.io`, served from
  repo root, `base: '/'` in `vite.config.ts`). If someone deploys it as a
  **project page** instead, `vite.config.ts`'s `base` and
  `public/404.html`'s `pathSegmentsToKeep` both need updating — see README.

## Safety

Never let a commit/push include personal information (phone number, personal
email, addresses) or secrets (GitHub tokens, API keys, passwords, `.env`
files, credentials of any kind). Check the actual diff before staging/
committing — if anything like this shows up, stop and ask instead of
committing it, even if it's already in a file you were asked to add.

## Things not to do

- Don't add a CMS, MDX, or a headless content backend — the whole point of
  `src/data/projects.ts` is that adding a project is a single-file, single-
  array-entry, git-diffable change.
- Don't add a second styling library alongside vanilla-extract.
- Don't remove the GitHub Pages SPA redirect (`public/404.html` +
  the inline script in `index.html`) — without it, deep links like
  `/projects/foo` 404 on refresh.

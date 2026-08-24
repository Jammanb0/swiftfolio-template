# AGENTS.md

Guidance for any AI coding agent working in this repository — including anyone
who creates a repository from this template and opens it with their own agent.
Codex reads this file directly; Claude Code reads it through the `@AGENTS.md`
import at the top of `CLAUDE.md`.

Everything lives here so both tools read one original. `CLAUDE.md` holds
nothing but that import line, and this repo does not use `.claude/rules/` —
putting rules somewhere only one tool reads is how the two versions drift
apart.

A gitignored `.agents/` directory sits alongside this file, holding the
project's goals, open questions, decision history, and a `handoff.md` recording
where the last session left off. Read the relevant files there when they exist,
and update `handoff.md` when you finish a piece of work — it is the only way
Claude and Codex hand the state of things to each other. Nothing in this file
depends on `.agents/` existing, so a fresh clone works without it.

## What this is

A React + TypeScript portfolio site template, styled like a clean fintech
product — Toss-style: white background, a single blue accent color, generous
rounded corners, subtle shadows, big confident type, paired with rich but
purposeful motion (not just a bare white page). Meant to be used through
GitHub's Template repository flow or cloned by anyone and deployed as their
own `<username>.github.io` GitHub Pages site.

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
- **Vitest** — unit tests (`npm run test`) for project-data validation and
  pure helpers such as filtering and date formatting.
- **GitHub Actions + GitHub Pages** — `.github/workflows/deploy-pages.yml`
  validates and deploys `dist/` after pushes to `main` in user-page
  repositories. The `gh-pages` package and `npm run deploy` remain only as a
  backwards-compatible fallback for existing branch-based deployments.

## Commands

```bash
npm run dev       # dev server (localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run test      # vitest run
npm run format    # prettier --write .
npm run deploy    # legacy fallback: build + push dist/ to gh-pages branch
```

## Architecture

```
src/
  components/
    SiteMeta.tsx  Renders nothing — keeps title, description, canonical,
                robots, Open Graph, Twitter Card, and favicon metadata in
                sync with the current route. Default metadata comes from
                profile.ts and is also injected into index.html at build time.
    system/     App-level feedback: PageLoading keeps the layout visible while
                lazy routes load; ErrorBoundary replaces failed renders with
                actionable retry/home recovery controls and resets by route.
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
    profile.ts   Single source of truth for the site owner's info and default
                 search/social metadata (`siteMetadata`)
    projects.ts  Single source of truth for portfolio entries — an array of
                 Project objects, plus derived `allTags`/`allYears` used by
                 ProjectFilters. Nothing else needs to change to add a
                 project; the list page, home "Featured" section, and detail
                 route all derive from this array. Write `description` as a
                 multiline template literal; escape Markdown backticks as \`.
  lib/
    date.ts   formatPeriod(date, endDate) — '2026.03 - 진행 중' style strings
    gsap.ts   registers ScrollTrigger once, re-exports gsap
    metadata.ts resolves route-specific SEO and social-sharing metadata
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

## Versioning and releases

This repository is versioned with SemVer and published as `vX.Y.Z` tags plus
GitHub Releases.

- **Propose, don't execute.** When a meaningful feature, bug fix, or breaking
  change lands, raise the question of a release yourself: state the scope of
  the change, the recommended version bump, and what would go in the release
  notes. Only after explicit approval do you touch `package.json`, create the
  version commit and `vX.Y.Z` tag, push, or create the GitHub Release.
- Backwards-compatible bug fixes are patch candidates; backwards-compatible
  feature additions are minor; anything that breaks existing usage or the
  public API is major.
- Don't propose a release for documentation, comment, or internal-cleanup
  changes alone — wait until related changes accumulate.

## Relationship to the author's own site

This repository is the template — the original. The author develops and
verifies shared changes here first, then carries them over to their own
portfolio instance. Changes to layout, components, or styling conventions
start here, not in an instance built from it.

## Working preferences (template author)

The rest of this file describes the repository itself and applies to everyone.
This section is how the template's author works with an AI agent. **If you
cloned this template, treat this section as a starting point and rewrite it to
match your own habits** — nothing in the codebase depends on it.

### Approval before acting

- Editing a file does not by itself need approval. What needs approval is
  *starting the work*. While the conversation is still exploratory — answering
  a question, discussing an idea, comparing options — answer and stop there.
- Begin implementing only on a clear go-ahead ("start", "go ahead", "do it", or
  equivalent). When it is unclear whether a message is a question or a
  go-ahead, treat it as a question and ask.
- Once work has started, say how you intend to proceed, then carry it out —
  individual edits inside that agreed scope don't need approval one by one.
- Adding a new dependency always needs approval, even inside agreed-upon work.
  Say what it is for and what the alternatives are before installing.
- Read-only actions (reading a file, checking status, answering a question)
  don't need approval every time.
- **Before creating, editing, or deleting any instruction file an AI tool reads
  automatically, propose the exact wording first and get confirmation — even a
  single-character edit.** That covers `AGENTS.md`, `CLAUDE.md`,
  `AGENTS.override.md`, `CLAUDE.local.md`, `.claude/rules/`, and the
  user-global files under `~/.codex/` and `~/.claude/`. **Files generated by a
  tool rather than written by hand are no exception.** Say which file the
  change lands in and whether it is new content or a move from elsewhere.
- The same fact or instruction shouldn't live in two of these files at once.
  When it already exists elsewhere, move it rather than repeating it.

### Git and commits

- Local commits don't need approval. Commit when a self-contained chunk of work
  is done, then say what went into each commit and why it was split that way.
- **`git push` always needs approval — every time.** Opening PRs and
  creating or deleting GitHub repositories need approval too. Creating a local
  branch doesn't.
- Commit at checkpoints yourself during multi-step work; don't wait to be told
  "commit it" at the end. When one self-contained concern is finished and the
  next request is a different concern, commit before piling both into the same
  diff.
- Prefer several small, meaningful commits over one big commit. Split by
  feature, layer, or concern — not to reduce the number of files per commit,
  but so each commit can be understood and verified on its own.
- Dependency and lockfile changes belong with the work that actually uses the
  dependency.
- Commit message format: `type(scope): subject`, where `type` is one of
  `feat`/`fix`/`docs`/`style`/`refactor`/`test`/`chore` and `scope` is
  optional. A single concise line is fine for routine changes; add a body only
  when the extra context is genuinely useful. When one commit spans several
  concerns, join them in the title with `+` instead of a long comma-separated
  sentence.
- Commit messages in this repository are written in **English**, matching its
  `git log`.
- Don't add a `Co-Authored-By:` trailer.

### Verification

- Before reporting something as done, check the claim against the actual
  current state (code, files, command output) rather than answering from
  assumption or memory.
- For UI work, run the dev server and check it in a browser before calling it
  done. Type-check and lint passing is not the same as the feature working.
- When drafting anything that presents work to others, don't overstate what was
  actually done. Precise, modest, defensible wording over impressive-sounding
  wording.

### Communication

- Respond in Korean unless the user switches to a different language first.
- When there are several reasonable technical options, give a short
  recommendation with the main tradeoff instead of a long survey, then let the
  user decide.
- Don't follow an oversized process just because it is the documented default.
  If a procedure looks disproportionate to the actual task, say so and propose
  a scaled-down version, then work at that level.
- If a new instruction conflicts with a rule written here, don't silently
  override it — point out the conflict and ask which one wins.
- When the conversation is about the agent tooling itself (Claude Code or Codex
  behavior, instruction and memory files, hooks, MCP, and similar meta topics),
  verify claims against the official documentation instead of answering from
  assumption or possibly-stale recall.

### Progress recap

After completing one or more project tasks, end the final response with one
fenced `text` code block. Skip it for simple questions or conversations where
no project task was completed.

Use this structure inside the block:

1. Start with a one-line overall summary, then always show the complete
   numbered project plan. Use visible statuses: `✅ 완료`, `🟡 진행 중`,
   `👉 다음`, `⏳ 대기`, `🧊 보류`, or `⛔ 막힘`.
2. When a plan item is currently in progress, add a separate detail table
   directly below the complete plan. Number its steps as children of the parent
   item, such as `05-1`, `05-2`.
3. Add `이번 작업 결과` only when the current turn completed something. Present
   it as a table and include the related parent or child plan number for every
   result so the user can map it back to the plan.
4. Add `현재 작업의 남은 단계` only when the active item actually has unfinished
   child steps. Do not use a generic `남은 작업` section merely to repeat the
   full plan.
5. Add `다음 추천` when the active item is complete and there is a best next
   task. Recommend one task and briefly explain why.
6. End with: `💬 "다음 단계 진행해줘"라고 말하면 현재 작업의 남은 단계가 있으면
   그것을, 없으면 다음 추천 작업을 진행합니다.`

Track plan changes actively:

- When a task is added, changed, removed, deferred, resumed, or reordered, show
  a `계획 변경` section using markers such as `➕ 추가`, `✏️ 수정`, `🗑️ 삭제`,
  `↕️ 순서 변경`, and `↩️ 재개`. Briefly state why it changed.
- If a new user request belongs under an existing plan item, add or renumber a
  child step and clearly mark it, for example `← 사용자 요청으로 추가`.
- If a new request changes roadmap priority or scope, update the main numbering
  when useful and explicitly show the old-to-new mapping so numbering changes
  do not cause confusion.
- If a request is unrelated to the roadmap and forcing it into a numbered item
  would be confusing, track it as `별도-01`, `별도-02`, and so on. Show it in
  `이번 작업 결과` but clearly label it as outside the original plan.
- Use notes such as `← 방금 완료!`, `← 사용자 요청으로 추가`, and
  `← 우선순위 변경` proactively when they make the state easier to scan.

Keep the recap concise. Show related-file trees only when the user asks for
them or requests the full detailed status.

Use the fenced `text` block only for progress-related list content: the overall
plan, active-task details, plan changes, current-turn results, remaining active
steps, the next recommendation, and the standard continuation prompt. Put
technical explanations, conceptual examples, comparisons, and other prose
outside the code block in normal Markdown.

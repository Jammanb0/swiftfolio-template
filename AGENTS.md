# AGENTS.md

Guidance for any AI coding agent working in this repository — including anyone
who creates a repository from this template and opens it with their own agent.
Codex reads this file directly; Claude Code reads it through the `@AGENTS.md`
import at the top of `CLAUDE.md`. Both tools read this one original; this repo
does not use `.claude/rules/`, because rules only one tool can read are how the
two versions drift apart.

**Everything in this file always applies.** Longer material lives in a
gitignored `.agents/` directory — read those files when the task calls for
them, not all of them every time:

| When | Read |
| --- | --- |
| Changing where files live or adding a component directory | `.agents/docs/architecture.md` |
| Right before reporting a finished task | `.agents/rules/progress-recap.md` |
| Before calling anything done | `.agents/rules/verification.md` |
| Writing a reply | `.agents/rules/communication.md` |
| Picking up where the last session stopped | `.agents/plans/handoff.md` |
| Checking what was decided and why | `.agents/plans/decisions-log.md` |

`.agents/` is not committed, so a fresh clone works without it and nothing in
this file depends on it. When you finish a piece of work, update
`.agents/plans/handoff.md` — it is the only way Claude and Codex hand the state
of things to each other.

## What this is

A React + TypeScript portfolio site template. Someone clones it (or uses
GitHub's Template flow), fills in two data files, and deploys it as their own
`<username>.github.io` Pages site. The look is a clean fintech product —
white ground, one blue accent, generous radius, confident type, purposeful
motion.

`README.md` covers setup, customization, deployment, and the folder layout for
people using the template. Don't duplicate it here.

## Stack rules

What the project uses is in `package.json`. What isn't written there:

- **vanilla-extract is the only styling solution.** Every component's styles
  live in a sibling `*.css.ts` file. Never add Emotion, styled-components,
  Tailwind, or CSS Modules — mixing systems defeats the point.
- **Framer Motion for simple motion** (page transitions, hover and tap),
  **GSAP + ScrollTrigger for orchestrated motion** (timelines, scroll-scrubbed
  effects). Don't reach for GSAP for a fade.
- **`Project.description` is GitHub-flavored Markdown.** A fenced block with
  language `youtube` (video ID as its content) renders as an inline embed
  instead of a code block — that is how a project gets more than one video,
  anywhere in the body, without touching HTML.
- `npm run deploy` and the `gh-pages` package are a legacy fallback for old
  branch-based deployments, not the current path.

## Conventions and constraints

- **`src/data/projects.ts` is the single source for portfolio entries, and
  `src/data/profile.ts` for the owner's info.** Adding a project never requires
  touching routing or page code. If it does, something is architecturally
  wrong.
- **All design tokens live in `src/styles/theme.css.ts`.** Never hardcode a
  color or spacing value in a component's `.css.ts`.
- Path alias `@/*` maps to `src/*` — use it instead of relative `../../..`.
- Variant-based components (e.g. `Button`) use `@vanilla-extract/recipes`, not
  conditional classNames. Don't inline `style={{ ... }}` except for genuinely
  dynamic per-instance values.
- `ProjectDetail`'s media block only renders when `thumbnail` and/or
  `youtubeId` is set — never an empty placeholder box. With both set, the
  banner comes first and the video second.
- **Don't remove the GitHub Pages SPA redirect** (`public/404.html` plus the
  inline script in `index.html`). Without it, deep links like `/projects/foo`
  404 on refresh.
- **Don't add a CMS, MDX, or a headless content backend.** The whole point of
  `projects.ts` is that adding a project is a single-file, git-diffable change.
- This repo targets a **user page** (`base: '/'`). Deploying it as a project
  page requires changing `vite.config.ts`'s `base` and `public/404.html`'s
  `pathSegmentsToKeep` — see README.

## Safety

Never let a commit or push include personal information (phone number, personal
email, addresses) or secrets (GitHub tokens, API keys, passwords, `.env` files,
credentials of any kind). Check the actual diff before staging — if anything
like this shows up, stop and ask instead of committing it, even if it is in a
file you were asked to add.

## Approval before acting

- Editing a file does not by itself need approval. What needs approval is
  *starting the work*. While the conversation is still exploratory — answering
  a question, discussing an idea, comparing options — answer and stop there.
- Begin implementing only on a clear go-ahead. When it is unclear whether a
  message is a question or a go-ahead, treat it as a question and ask.
- Once work has started, say how you intend to proceed, then carry it out —
  individual edits inside that agreed scope don't need approval one by one.
- **Adding a new dependency always needs approval**, even inside agreed-upon
  work. Say what it is for and what the alternatives are before installing.
- Read-only actions don't need approval every time.
- **Before creating, editing, or deleting any instruction file an AI tool reads
  automatically, propose the exact wording first and get confirmation — even a
  single-character edit.** That covers `AGENTS.md`, `CLAUDE.md`,
  `AGENTS.override.md`, `CLAUDE.local.md`, `.claude/rules/`, `.agents/`, and
  the user-global files under `~/.codex/` and `~/.claude/`. **Files generated
  by a tool rather than written by hand are no exception.**
- The same instruction shouldn't live in two of these files at once. When it
  already exists elsewhere, move it rather than repeating it.

## Git and commits

- **Every commit needs approval.** When a self-contained chunk of work is done,
  stop and propose it: which files changed, what the message would be, and why
  it is one commit rather than several. Commit only on an explicit go-ahead,
  and afterward say what actually went in.
- **`git push` always needs approval — every time.** Opening PRs and creating
  or deleting GitHub repositories need approval too. Creating a local branch
  doesn't.
- Still raise the commit yourself at checkpoints during multi-step work — don't
  wait to be told "commit it", and don't let unrelated concerns pile into one
  diff. The difference is that you propose and wait, rather than committing
  first and reporting after.
- Prefer several small, meaningful commits over one big commit. Split by
  feature, layer, or concern — not to reduce the number of files per commit,
  but so each commit can be understood and verified on its own. Dependency and
  lockfile changes belong with the work that uses them.
- Commit message format: `type(scope): subject`, where `type` is one of
  `feat`/`fix`/`docs`/`style`/`refactor`/`test`/`chore` and `scope` is
  optional. One concise line is fine; add a body only when the context is
  genuinely useful. When a commit spans several concerns, join them with `+`
  rather than a long comma-separated sentence.
- Commit messages in this repository are written in **English**, matching its
  `git log`.
- Don't add a `Co-Authored-By:` trailer.

## Versioning and releases

This repository uses SemVer, published as `vX.Y.Z` tags plus GitHub Releases.

**Propose, don't execute.** When a meaningful change lands, raise the release
question yourself: the scope of the change, the recommended bump, and what
would go in the notes. Only after explicit approval do you touch
`package.json`, create the version commit and tag, push, or publish the
release. Documentation and internal-cleanup changes alone don't warrant a
release — wait until related changes accumulate.

## Relationship to the author's own site

This repository is the template — the original. The author develops and
verifies shared changes here first, then carries them over to their own
portfolio instance. Changes to layout, components, or styling conventions start
here, not in an instance built from it.

The approval, git, and release rules above are how the template's author works
with an AI agent. **If you cloned this template, treat them as a starting point
and rewrite them to match your own habits** — nothing in the codebase depends
on them.

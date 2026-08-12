# AGENTS.md

## Stack

- Tiny static blog: posts are `.md` files, rendered to HTML by a Node build script. CommonJS, no framework, no bundler.
- Single dependency: `marked` (markdown → HTML). Never pin or quote dependency versions from memory — check the registry (`npm view marked version`).
- Repo: https://github.com/KarimShaikh123/markdown-blog (private) — live: https://markdown-blog-theta-rouge.vercel.app. Pushes to `main` auto-deploy to Vercel.

## Commands

- Install: `npm install`
- Build: `npm run build` (runs `node build.js`, writes the whole site to `dist/`)
- Preview locally: `npx serve dist`
- Deploy: push to `main` (auto), or `npx vercel --prod`. Vercel config: build `npm run build`, output `dist`.

## Pipeline

`posts/*.md` → `build.js` → `dist/`:

1. `build.js` wipes and recreates `dist/`, reads every `posts/*.md`, parses frontmatter, converts the body with `marked`.
2. Posts sort newest-first by `date`; index page lists them, each post gets `dist/posts/<slug>.html`.
3. `styles.css` and `theme.js` are copied into `dist/` unchanged.

## Files

- `build.js` — the build: frontmatter parser, post collection, page writing. Passes a `prefix` param (`""` for index, `"../"` for posts) for relative asset links — do not reintroduce placeholder string-replacement for paths.
- `components.js` — HTML templates: `pageShell`, `indexBody`, `postPageBody`, plus `escapeHtml` (all dynamic values go through it).
- `theme.js` — dark/light toggle: reads localStorage or `prefers-color-scheme`, sets `data-theme` on `<html>`.
- `styles.css` — all styling; design tokens shared with portfolio-site (`--ink`, `--paper`, etc.).
- `posts/` — content. `PROCESS.md` — raw build record (specs, mistakes, rules).
- `dist/`, `node_modules/`, `.vercel/` are gitignored — never commit them.

## Adding a post

1. Create `posts/<slug>.md` with frontmatter: `title`, `date` (YYYY-MM-DD), `description`.
2. `npm run build`, then check the output file in `dist/` — verify rendered content, not just that the build exited 0.

## Rules

- A 200 status proves a server answered; only content proves it is the right site. Verify deploys by reading the live page.
- When stating a fact (versions, URLs, deploy targets), say what was checked versus assumed.
- One task, one commit, one review. Commit identity: Karim Shaikh <karimhshaikh009@gmail.com>.
- Keep this file and README updated in the same commit as any structural change.

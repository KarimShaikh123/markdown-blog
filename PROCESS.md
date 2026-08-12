# Process notes

This repository was built by directing an AI agent (OpenCode + Qwen). This file is the raw record: the specs used, the mistakes caught, and the rules that emerged. Post 2 (`posts/directing-an-ai-agent.md`) is the polished version; this is the evidence.

## The loop

Every task followed the same cycle:

1. **Spec** — what / why / accept, written before any code
2. **Code** — the agent implements
3. **Review** — every diff read before commit; nothing committed unread
4. **Push** — small commit, pushed to GitHub
5. **Verify** — the public artifact checked (repo page, then live URL)

## Task log

| # | Task | Spec (abridged) | Outcome |
|---|------|-----------------|---------|
| 1 | Scaffold | `package.json` + `.gitignore` + `README.md`; accept: `npm install` works | Clean, one catch: agent wrote `marked ^12` from memory, registry says 18.x |
| 2 | Build script | Read `posts/*.md`, render via marked to `dist/`; accept: both pages exist | Agent's first draft used a `STYLES_PATH` placeholder hack; refactored to a `prefix` parameter before review |
| 3 | Styles | Match portfolio palette; accept: presentable pages | Reused design tokens from `portfolio-site` |
| 4 | Post 1 | Portfolio shipping story with real links | Agent linked `portfolio-site.vercel.app` after checking only the HTTP status — it was a stranger's site. Fixed via `vercel inspect` aliases + `<title>` check |
| 5 | GitHub | Private repo (user decision), 4 small commits | Pushed, verified via GitHub API |
| 6 | Vercel | `vercel.json` + deploy; accept: content verified, not just 200s | Live at `markdown-blog-theta-rouge.vercel.app`; push auto-triggered next deploy |
| 7 | Post 2 | Playbook format, no overlap with Post 1's narrative | This project's own mistakes as teaching material |
| 8 | Process notes | This file | — |
| 9 | Final verify | Push → live URL, both posts readable | — |

## Mistake log

| Mistake | Who caught it | Fix |
|---------|---------------|-----|
| `marked ^12.0.0` written from memory (latest is 18.x) | Agent, via registry check | `npm install marked@latest` |
| `STYLES_PATH`/`INDEX_PATH` placeholder replacement could corrupt post content | Agent, self-review before handoff | `prefix` parameter in template function |
| Portfolio URL verified by status code only — pointed to someone else's site | User ("the link is wrong") | `vercel inspect` → aliases → curl the alias → check `<title>` |
| `git commit` failed — no git identity configured | Tool error | Reused portfolio repo's identity, set locally (not global) |

## Rules

- A spec without an acceptance criterion is a wish.
- 200 proves a server answered; only content proves it is yours.
- One task, one commit, one review.
- When the agent states a fact, ask what it checked versus what it assumed.
- The app is not the point. The loop is.

---
title: Directing an AI agent — five lessons from building this blog
date: 2026-08-12
description: This blog was built by an AI agent while I directed. Here is what actually worked — with the real mistakes as evidence.
---

This blog was not written by hand. An AI agent (OpenCode running Qwen) wrote the code, and I directed it. My job was not typing — it was writing clear specs, reviewing every diff, catching mistakes, and breaking one big problem into small tasks.

Here is what actually worked, with the real evidence from this project.

## 1. Write the spec before any code

Every task started with a three-line spec: **what** gets built, **why**, and **how we accept it**. The spec for the build script looked roughly like this:

> **What:** `build.js` — reads `posts/*.md`, parses frontmatter, renders via `marked`, writes `dist/index.html` + `dist/posts/<slug>.html`, copies CSS.
> **Why:** the whole pipeline working with trivial content before investing in design or writing.
> **Accept:** `npm run build` produces both pages with rendered markdown.

That "accept" line matters most. Without it, you cannot tell when a task is done — you only have feelings.

## 2. Review every diff — including the agent's self-corrections

The agent's first draft of the build script used a placeholder trick: it wrote `STYLES_PATH` into the HTML and replaced the text later. If a post ever contained the words `STYLES_PATH`, the page would break silently. The fix was a clean `prefix` parameter passed into the template.

The lesson is not "agents write bugs." It is that a quick look at a diff can catch problems you would never find just by running the code. Never commit unread.

## 3. Verify content, not status codes

This one stings. The first draft of my portfolio post linked to `portfolio-site.vercel.app` — a URL that returned HTTP 200, which looked like success. It was **someone else's website**. The agent had checked the status code and stopped there.

The real URL was found by asking Vercel for the deployment aliases and checking the `<title>` tag of the page. Rule: a 200 proves a server answered. Only content proves it is *yours*.

## 4. Break big problems into small tasks

"Build a markdown blog" is not a task. This project was nine of them:

1. Scaffold the folder
2. Build script + stub post
3. Styles
4. Post 1
5. Push to GitHub
6. Deploy to Vercel
7. Post 2 (this one)
8. Process notes
9. Final push + verify

Each task produced one small commit, and each commit was reviewable in seconds. When something breaks in a system like this, you diff one commit — not a wall of changes.

## 5. Distrust the agent's memory

The agent wrote `marked ^12.0.0` into `package.json` from memory. One query to the npm registry showed the latest version is **18.x**. Nothing malicious — just a confident guess where a lookup cost one second.

The pattern: whenever the agent states a fact — a version, a URL, anything — ask what it *checked* versus what it *assumed*.

## The loop

Everything above compresses into one cycle:

> **Prompt → code → push → live URL.**

Write what you want. Read what comes back. Push it. Open the live URL. Go around again. The app is not the point — the loop is.

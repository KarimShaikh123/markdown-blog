---
title: Shipping my portfolio site with GitHub and Vercel
date: 2026-08-12
description: How I took a plain HTML/CSS portfolio from an empty folder to a live URL, with GitHub and Vercel doing the heavy lifting.
---

My portfolio is live at [portfolio-site-three-kappa-31.vercel.app](https://portfolio-site-three-kappa-31.vercel.app), and the full source is on GitHub at [KarimShaikh123/portfolio-site](https://github.com/KarimShaikh123/portfolio-site). This post is the story of how it got there.

## What I built

A static portfolio site — no framework, no backend. Just `index.html`, `styles.css`, and a little `script.js`. It shows three projects:

- **Unreal FPS Game** — a UE5 Blueprint prototype with FPS mechanics, scoring, HUD, and movement
- **Portfolio Build** — a case study of the portfolio itself
- **Lesson Planner App** — a Java / BlueJ app with subject selection, mini lessons, and quizzes

I kept it plain on purpose. It's my first site, and plain HTML and CSS were the simplest thing that could work.

## Getting it on GitHub

The site lives in a GitHub repository. Every meaningful change is its own commit, so the history reads like a log of decisions:

```
Add process note to portfolio
Replace abstract project art with mockups
Add Java study game project
Add portfolio build case study
...
Initial portfolio site
```

Small commits made life easier. When something looked wrong, I could check one small commit instead of digging through a giant change.

## Deploying with Vercel

Vercel serves the site straight from the repository. The setup:

1. Push to GitHub.
2. Import the repo in Vercel.
3. No build command — it's static files, so Vercel serves them directly.

A small config file (`vercel.json`) keeps the URLs clean and adds a security header. After that, every push to the repository produces a new deployment automatically.

## The loop that matters

The whole project ran on one tight loop:

> **Prompt → code → push → live URL.**

Say what you want, get the code, review it, push it, open the live URL. If something is off, go around the loop again. Each pass takes minutes, and every pass leaves something public to show for it — a commit on GitHub, a deployment on Vercel.

That loop is the reason this blog exists. The next step is running it with an AI agent doing the typing while I do the directing — and being honest about every mistake caught along the way.

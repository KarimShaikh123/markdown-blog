# markdown-blog

A tiny markdown blog. Posts live in `posts/` as `.md` files and are rendered to static HTML pages by a small build script.

## How it works

- Write a post as `posts/<slug>.md` with frontmatter (`title`, `date`, `description`).
- Run the build. It reads every post, converts markdown to HTML, and writes the site to `dist/`.
- Deploy `dist/` anywhere static hosting works.

## Build

```sh
npm install
npm run build
```

Output lands in `dist/`. The index page lists all posts, newest first. Each post gets its own page at `dist/posts/<slug>.html`.

## Deploy

Deployed on Vercel. Build command: `npm run build`. Output directory: `dist`.

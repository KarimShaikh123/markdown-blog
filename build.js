const fs = require("node:fs");
const path = require("node:path");
const { marked } = require("marked");

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, "posts");
const DIST_DIR = path.join(ROOT, "dist");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length) };
}

function pageHtml({ title, description, bodyHtml, prefix }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${prefix}styles.css">
</head>
<body>
<header class="site-header">
  <a class="site-title" href="${prefix}index.html">Karim's Blog</a>
</header>
<main>
${bodyHtml}
</main>
<footer class="site-footer">
  <p>Built with a tiny Node script. Posts are markdown files.</p>
</footer>
</body>
</html>
`;
}

function build() {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST_DIR, "posts"), { recursive: true });

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.basename(file, ".md");
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      description: meta.description || "",
      html: marked.parse(body),
    };
  });

  posts.sort((a, b) => b.date.localeCompare(a.date));

  for (const post of posts) {
    const bodyHtml = `<article class="post">
  <h1>${escapeHtml(post.title)}</h1>
  <p class="post-date">${escapeHtml(post.date)}</p>
  ${post.html}
</article>
<p class="back-link"><a href="../index.html">&larr; All posts</a></p>`;
    const html = pageHtml({
      title: `${post.title} — Karim's Blog`,
      description: post.description,
      bodyHtml,
      prefix: "../",
    });
    fs.writeFileSync(path.join(DIST_DIR, "posts", `${post.slug}.html`), html);
  }

  const items = posts
    .map(
      (post) => `  <li class="post-item">
    <a href="posts/${post.slug}.html">${escapeHtml(post.title)}</a>
    <span class="post-date">${escapeHtml(post.date)}</span>
    ${post.description ? `<p class="post-description">${escapeHtml(post.description)}</p>` : ""}
  </li>`
    )
    .join("\n");

  const bodyHtml = `<h1>Posts</h1>
<ul class="post-list">
${items}
</ul>`;
  const html = pageHtml({
    title: "Karim's Blog",
    description: "Notes on building things and shipping them.",
    bodyHtml,
    prefix: "",
  });
  fs.writeFileSync(path.join(DIST_DIR, "index.html"), html);

  fs.copyFileSync(path.join(ROOT, "styles.css"), path.join(DIST_DIR, "styles.css"));

  console.log(`Built ${posts.length} post(s) into dist/`);
}

build();

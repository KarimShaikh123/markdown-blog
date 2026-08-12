const fs = require("node:fs");
const path = require("node:path");
const { marked } = require("marked");
const { pageShell, indexBody, postPageBody } = require("./components");

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, "posts");
const DIST_DIR = path.join(ROOT, "dist");

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
    const html = pageShell({
      title: `${post.title} — Karim's Blog`,
      description: post.description,
      bodyHtml: postPageBody(post),
      prefix: "../",
    });
    fs.writeFileSync(path.join(DIST_DIR, "posts", `${post.slug}.html`), html);
  }

  const html = pageShell({
    title: "Karim's Blog",
    description: "Notes on building things and shipping them.",
    bodyHtml: indexBody(posts),
    prefix: "",
  });
  fs.writeFileSync(path.join(DIST_DIR, "index.html"), html);

  fs.copyFileSync(path.join(ROOT, "styles.css"), path.join(DIST_DIR, "styles.css"));
  fs.copyFileSync(path.join(ROOT, "theme.js"), path.join(DIST_DIR, "theme.js"));

  console.log(`Built ${posts.length} post(s) into dist/`);
}

build();

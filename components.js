function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pageShell({ title, description, bodyHtml, prefix }) {
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
<script src="${prefix}theme.js"></script>
</head>
<body>
<header class="site-header">
  <div class="site-header-inner">
    <a class="site-title" href="${prefix}index.html">Karim's Blog</a>
    <div class="theme-toggle-group">
      <span class="theme-label" id="theme-label">Light</span>
      <button class="theme-toggle" id="theme-toggle" type="button" role="switch" aria-checked="false" aria-label="Switch to dark mode"><span class="theme-toggle-knob"></span></button>
    </div>
  </div>
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

function postListItem(post) {
  return `  <li class="post-item">
    <a href="posts/${post.slug}.html">${escapeHtml(post.title)}</a>
    <span class="post-date">${escapeHtml(post.date)}</span>
    ${post.description ? `<p class="post-description">${escapeHtml(post.description)}</p>` : ""}
  </li>`;
}

function indexBody(posts) {
  return `<h1>Posts</h1>
<ul class="post-list">
${posts.map(postListItem).join("\n")}
</ul>`;
}

function postPageBody(post) {
  return `<article class="post">
  <h1>${escapeHtml(post.title)}</h1>
  <p class="post-date">${escapeHtml(post.date)}</p>
  ${post.html}
</article>
<p class="back-link"><a href="../index.html">&larr; All posts</a></p>`;
}

module.exports = { pageShell, indexBody, postPageBody };

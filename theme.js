(function () {
  function apply(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
    }
  }

  function updateButton() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-checked", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}

  var theme =
    stored ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  apply(theme, false);

  document.addEventListener("DOMContentLoaded", function () {
    updateButton();
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      apply(dark ? "light" : "dark", true);
      updateButton();
    });
  });
})();

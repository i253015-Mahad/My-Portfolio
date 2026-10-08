/* ui.js: behaviour only (nav, scroll-spy, theme, project filter, dialog). */
(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience and Education"], ["contact", "Contact"]];

  function initNav() {
    const list = $("#nav-list"), nav = $("#site-nav"), toggle = $("#nav-toggle");
    NAV.forEach(([id, label]) => {
      const a = Render.el("a", { href: "#" + id, text: id === "experience" ? "Experience" : label });
      list.append(Render.el("li", {}, a));
    });
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));

    // Scroll-spy: mark the section nearest the top as current.
    const links = $$("#nav-list a");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id));
        links.forEach((a) => a.getAttribute("aria-current") !== null && a.setAttribute("aria-current", "true"));
        links.forEach((a) => a.getAttribute("href") !== "#" + en.target.id && a.removeAttribute("aria-current"));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    NAV.forEach(([id]) => io.observe(document.getElementById(id)));
  }

  function initTheme() {
    const btn = $("#theme-toggle"), root = document.documentElement;
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const sync = () => { btn.dataset.mode = isDark() ? "dark" : "light"; btn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme"); };
    btn.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    sync();
  }

  function initFilters() {
    $("#project-filters").addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      $$(".filter-btn").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $$(".project-card").forEach((c) => (c.hidden = b.dataset.cat !== "All" && c.dataset.cat !== b.dataset.cat));
    });
  }

  function initDialog() {
    const dlg = $("#project-dialog"), body = $("#dialog-body");
    let opener = null;
    $("#project-grid").addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;
      opener = card;
      const p = PORTFOLIO.projects.find((x) => x.id === card.dataset.id);
      body.replaceChildren(Render.renderProjectDialog(p));
      dlg.showModal();
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
    dlg.addEventListener("close", () => { body.replaceChildren(); opener && opener.focus(); });
  }

  function initLightbox() {
  const dlg = $("#project-dialog");
  const box = Render.el("div", { class: "lightbox", hidden: "", role: "dialog", "aria-label": "Full screen image" }, [
    Render.el("img", { alt: "", draggable: "false" }),
    Render.el("button", { class: "icon-btn lightbox-close", type: "button", "aria-label": "Close full screen image", text: "\u2715" })
  ]);
  dlg.append(box);
  const img = box.querySelector("img");

  // Pinch to zoom, drag to pan (pointer events work for touch, pen and mouse).
  const pts = new Map();
  let s = 1, x = 0, y = 0, startDist = 0, startS = 1, lastMid = null, moved = false;
  const MAX = 5;
  const apply = () => { img.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };
  const reset = () => { s = 1; x = y = 0; startDist = 0; moved = false; pts.clear(); apply(); };
  const limit = () => {
    if (s <= 1) { x = y = 0; return; }
    const mx = Math.max(0, (img.offsetWidth * s - box.clientWidth) / 2);
    const my = Math.max(0, (img.offsetHeight * s - box.clientHeight) / 2);
    x = Math.min(mx, Math.max(-mx, x)); y = Math.min(my, Math.max(-my, y));
  };
  box.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    if (pts.size === 0) moved = false;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    startDist = 0;
  });
  box.addEventListener("pointermove", (e) => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    if (pts.size === 2) {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (!startDist) { startDist = d; startS = s; lastMid = m; return; }
      const ns = Math.min(MAX, Math.max(1, startS * d / startDist));
      const rx = m.x - box.clientWidth / 2, ry = m.y - box.clientHeight / 2;   // zoom around the fingers
      x = rx - (rx - x) * (ns / s) + (m.x - lastMid.x);
      y = ry - (ry - y) * (ns / s) + (m.y - lastMid.y);
      s = ns; lastMid = m; moved = true;
    } else if (s > 1) {
      x += e.clientX - p.x; y += e.clientY - p.y;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      moved = true;
    }
    limit(); apply();
  });
  const lift = (e) => { pts.delete(e.pointerId); startDist = 0; };
  box.addEventListener("pointerup", lift);
  box.addEventListener("pointercancel", lift);

  const open = (src, alt) => {
    reset();
    img.src = src; img.alt = alt; box.hidden = false;
    box.querySelector("button").focus();
    if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
  };
  const close = () => {
    box.hidden = true; img.removeAttribute("src"); reset();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
  $("#dialog-body").addEventListener("click", (e) => { const t = e.target.closest(".gallery img"); if (t) open(t.src, t.alt); });
  // A plain tap closes it, but not while zoomed in or right after a pinch/drag.
  box.addEventListener("click", () => { if (s > 1 || moved) { moved = false; return; } close(); });
  box.querySelector("button").addEventListener("click", (e) => { e.stopPropagation(); close(); });
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && !box.hidden) close(); });
  dlg.addEventListener("cancel", (e) => { if (!box.hidden) { e.preventDefault(); close(); } });
  dlg.addEventListener("close", () => { box.hidden = true; reset(); });
}

function initCarousel() {
  const dlg = $("#project-dialog"), body = $("#dialog-body");
  const gal = () => body.querySelector(".gallery");
  const count = () => (gal() ? gal().children.length : 0);
  const index = () => { const g = gal(); return g && g.clientWidth ? Math.round(g.scrollLeft / g.clientWidth) : 0; };
  const go = (i) => { const g = gal(); if (g) g.scrollTo({ left: Math.max(0, Math.min(count() - 1, i)) * g.clientWidth, behavior: "smooth" }); };
  const sync = () => {
    if (!gal()) return;
    const i = index(), n = count();
    body.querySelectorAll(".dot").forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    const prev = body.querySelector(".prev"), next = body.querySelector(".next");
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === n - 1;
    [...gal().children].forEach((c, k) => { if (c.tagName === "VIDEO" && k !== i) c.pause(); });
  };
  body.addEventListener("click", (e) => {
    const b = e.target.closest(".carousel-btn, .dot");
    if (!b) return;
    go(b.dataset.index !== undefined ? Number(b.dataset.index) : index() + Number(b.dataset.dir));
  });
  body.addEventListener("scroll", sync, true);
  new MutationObserver(sync).observe(body, { childList: true });
  dlg.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const lb = dlg.querySelector(".lightbox");
    if (count() < 2 || (lb && !lb.hidden)) return;
    e.preventDefault();
    go(index() + (e.key === "ArrowRight" ? 1 : -1));
  });
}

  window.UI = { initNav, initTheme, initFilters, initDialog, initLightbox, initCarousel };
})();

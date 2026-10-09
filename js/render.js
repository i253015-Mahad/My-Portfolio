/* render.js: turns PORTFOLIO data into DOM. Uses textContent only (no innerHTML). */
(function () {
  const D = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);

  function el(tag, props = {}, children = []) {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "text") n.textContent = v;
      else if (k === "class") n.className = v;
      else n.setAttribute(k, v);
    });
    [].concat(children).forEach((c) => c && n.append(c));
    return n;
  }
  const link = (l, cls) => el("a", { href: l.url, class: cls || "", target: "_blank", rel: "noopener noreferrer", "aria-label": l.label, text: l.platform || l.text });

  function renderHero() {
    $("#hero-role").textContent = D.profile.role;
    $("#hero-title").textContent = D.config.name;
    $("#hero-intro").textContent = D.profile.intro;
    const list = $("#now-list");
    D.profile.now.forEach((n) => list.append(el("dt", { text: n.label }), el("dd", { text: n.value })));
  }

  function renderAbout() {
    D.profile.about.forEach((p) => $("#about-body").append(el("p", { text: p })));
  }

  function renderSkills() {
    D.skills.forEach((g) => {
      const chips = el("ul", { class: "chips" }, g.items.map((i) => el("li", { class: "chip" + (i.learning ? " learning" : ""), text: i.name })));
      $("#skills-body").append(el("div", { class: "skill-group" }, [el("h3", { text: g.group }), el("p", { class: "group-note", text: g.note }), chips]));
    });
  }

  function renderProjects() {
    const cats = ["All", ...new Set(D.projects.map((p) => p.category))];
    const filters = $("#project-filters");
    cats.forEach((c, i) => filters.append(el("button", { class: "filter-btn", type: "button", "data-cat": c, "aria-pressed": String(i === 0), text: c })));

    D.projects.forEach((p) => {
      const tag = p.featured ? el("span", { class: "status featured", text: "Featured" }) : p.status === "pending" ? el("span", { class: "status", text: "Currently in Progress" }) : null;
      const card = el("button", { class: "card project-card", type: "button", "data-id": p.id, "data-cat": p.category, "aria-haspopup": "dialog" },
        [tag, el("h3", { text: p.title }), el("p", { text: p.summary }), (p.technologies && p.technologies.length) ? el("ul", { class: "chips" }, p.technologies.map((t) => el("li", { class: "chip", text: t }))) : null]);
      $("#project-grid").append(card);
    });
  }

  function renderTimeline(target, items, titleKey, orgKey, descKey) {
  items.forEach((i) => {
    $(target).append(el("li", {}, [
      el("h3", { text: i[titleKey] }),
      i[orgKey] ? el("p", { class: "meta", text: i[orgKey] }) : null,
      i.period ? el("p", { class: "meta", text: i.period }) : null,
      i[descKey] ? el("p", { text: i[descKey] }) : null
    ]));
  });
}

  function renderContact() {
  $("#contact-intro").textContent = "Open to internships, collaborations and conversations about software. The quickest way to reach me:";
  const row = $("#contact-links");
  const email = (D.config.email || "").trim();
  const gmail = email
    ? "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email) + "&su=" + encodeURIComponent("Hello from your portfolio")
    : "";

  // Contact section
  if (email) {
    row.append(el("a", { class: "btn btn-primary", href: gmail, target: "_blank", rel: "noopener noreferrer", text: "Email me" }));
  } else {
    row.after(el("p", { class: "contact-note", text: "Email address coming soon. Use the profile links for now." }));
  }
  D.links.filter((l) => l.url).forEach((l, i) => row.append(link(l, "btn " + (email || i ? "btn-secondary" : "btn-primary"))));

  // Footer
  $("#footer-name").textContent = D.config.name;
  $("#footer-sub").textContent = D.profile.footerSub;
  
  
  $("#footer-note").textContent = "© " + D.config.year + " " + D.config.name + ". All rights reserved.";
}

  function renderProjectDialog(p) {
    const sec = (title, body) => body ? [el("h4", { text: title }), body] : [];
    const list = (arr) => el("ul", {}, arr.map((x) => el("li", { text: x })));
    const links = [];
    if (p.githubUrl) links.push(el("a", { class: "btn btn-secondary", href: p.githubUrl, target: "_blank", rel: "noopener noreferrer", text: "View repository" }));
    if (p.demoUrl) links.push(el("a", { class: "btn btn-secondary", href: p.demoUrl, target: "_blank", rel: "noopener noreferrer", text: "Open demo" }));
  const media = [].concat(
  (p.images || []).map((s) => el("img", { src: s.src, alt: s.alt || p.title, loading: "lazy" })),
  p.videoUrl ? el("video", { src: p.videoUrl, controls: "", playsinline: "", preload: "metadata", "aria-label": p.title + " demo video" }) : []);
  const buildCarousel = (items) => {
  const gallery = el("div", { class: "gallery", tabindex: "0", role: "region", "aria-label": "Project media. Use the left and right arrow keys to switch." }, items);
  const nav = items.length > 1 ? [
    el("button", { class: "carousel-btn prev", type: "button", "data-dir": "-1", "aria-label": "Previous item", text: "\u2039" }),
    el("button", { class: "carousel-btn next", type: "button", "data-dir": "1", "aria-label": "Next item", text: "\u203A" }),
    el("div", { class: "carousel-dots" }, items.map((_, i) => el("button", { class: "dot", type: "button", "data-index": String(i), "aria-label": "Show item " + (i + 1) + " of " + items.length })))
  ] : [];
  return el("div", { class: "carousel" }, [gallery, ...nav]);
};
    const tbd = el("p", { class: "tbd", text: "More details will be added soon." });

    return el("div", { class: "dialog-inner" }, [
      el("div", { class: "dialog-head" }, [el("div", {}, [el("p", { class: "meta", text: p.category }), el("h3", { id: "dialog-title", text: p.title })]),
        el("button", { class: "icon-btn", type: "button", "data-close": "", "aria-label": "Close project details", text: "✕" })]),
      el("p", { text: p.summary }),
      ...sec("The problem", p.problem && el("p", { text: p.problem })),
      ...sec("Main features", p.features && p.features.length && list(p.features)),
      ...sec("My contribution", p.contribution && el("p", { text: p.contribution })),
      ...sec("Technologies", p.technologies && p.technologies.length && el("ul", { class: "chips" }, p.technologies.map((t) => el("li", { class: "chip", text: t })))),
      ...(media.length ? [el("h4", { text: "Visuals" }), buildCarousel(media)] : []),
      (p.problem || p.features) ? null : tbd,
      links.length ? el("div", { class: "btn-row" }, links) : null
    ]);
  }

  window.Render = { renderHero, renderAbout, renderSkills, renderProjects, renderContact, renderProjectDialog,
    renderExperience: () => renderTimeline("#experience-body", D.experience, "role", "organization", "description"),
    renderEducation: () => renderTimeline("#education-body", D.education, "degree", "institution", null),
    el };
})();

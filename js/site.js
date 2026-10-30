/* Site script - sidebar layout. Data comes from js/main.js (works, publications, projects, ...). */
(function () {
  const E = typeof esc === "function" ? esc : (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const YT = (id, q) => `https://img.youtube.com/vi/${id}/${q}.jpg`;
  const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  // YouTube: maxresdefault may come back as a 120px placeholder; fall back to hqdefault, then give up.
  function ytImage(img, id, onFail) {
    img.src = YT(id, "maxresdefault");
    img.onload = () => { if (img.naturalWidth <= 120 && !img.dataset.fb) { img.dataset.fb = "1"; img.src = YT(id, "hqdefault"); } };
    img.onerror = () => { if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = YT(id, "hqdefault"); } else if (onFail) onFail(); };
  }

  // Put an item's still into <img>: local image first, else the YouTube thumbnail.
  function stillInto(img, it, onFail) {
    if (it.image) { img.src = it.image; img.onerror = () => { if (it.embed) ytImage(img, it.embed, onFail); else if (onFail) onFail(); }; }
    else if (it.embed) ytImage(img, it.embed, onFail);
    else if (onFail) onFail();
  }

  // Short labels for link pills, from the URL / existing label
  function linkLabel(l) {
    const u = (l.url || "").toLowerCase(), t = (l.label || "");
    if (/\.pdf(\?|$)/.test(u)) return "PDF";
    if (/library\.kaist/.test(u)) return "KAIST Library";
    if (/youtu\.?be/.test(u)) return "Video";
    if (/demo/i.test(t)) return "Demo";
    if (/visap/.test(u)) return "VISAP";
    if (/read|paper/i.test(t)) return "Paper";
    return t || "Link";
  }
  const pills = (links) => links && links.length
    ? `<span class="pills">${links.map((l) => `<a class="pill" href="${E(l.url)}" target="_blank" rel="noopener">${E(linkLabel(l))}</a>`).join("")}</span>` : "";
  const authors = (html) => (typeof boldAuthor === "function" ? boldAuthor(html) : html);

  // upcoming: true, or "YYYY-MM-DD" (counts as upcoming through that day)
  const isUpcoming = (u) => u === true || (typeof u === "string" && new Date(u + "T23:59:59") >= new Date());
  const slug = (t) => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function catalog() {
    const items = [];
    (typeof works !== "undefined" ? works : []).forEach((w, i) => {
      const parts = (w.medium || "").split(" · ");
      items.push({ id: slug(w.title), group: "artwork", year: w.year, title: w.title, line: parts[0] || "", venue: parts.slice(1).join(" · "),
        embed: w.embed, image: w.image, images: w.images || [], desc: w.desc, details: w.details, keywords: w.keywords, links: w.links || [], upcoming: isUpcoming(w.upcoming) });
    });
    (typeof publications !== "undefined" ? publications : []).forEach((q, i) => {
      const tag = q.tag || "Publication";
      const venue = (q.desc || "").replace(new RegExp("^" + tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*[,·:-]?\\s*"), "");
      items.push({ id: "paper-" + slug(q.title), group: "research", year: q.year, title: q.title, line: tag, venue,
        image: q.image, desc: q.abstract, links: q.link ? [{ label: "Paper", url: q.link }] : [] });
    });
    (typeof projects !== "undefined" ? projects : []).forEach((p, i) => {
      items.push({ id: "project-" + slug(p.title), group: "projects", year: p.year, title: p.title, line: p.tag || "Project", venue: p.meta || "",
        image: p.image, images: p.images || [], details: p.details, keywords: p.keywords, credit: p.credit, desc: p.desc, demo: p.demo, links: [...(p.demo ? [{ label: "Demo", url: p.demo }] : []), ...(p.links || [])] });
    });
    return items.map((it, order) => ({ ...it, order }))
      .sort((a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0) || a.order - b.order);
  }
  const GROUPS = { artwork: "Artwork", research: "Research", projects: "Funded projects" };

  /* home: slideshow. Slide 0 is assets/main.jpg (skipped if the file is missing), then one still per work.
     Auto-advances every 5 s; arrows, swipe and ←/→ keys step through and pause the timer for a while. */
  const HOME_IMAGE = { src: "assets/main.jpg", title: "Dana Kim", href: "work.html" };
  function initShow() {
    const root = document.getElementById("show");
    if (!root) return;
    const frame = document.getElementById("showFrame"), cap = document.getElementById("showCap"), count = document.getElementById("showCount");
    const slides = [{ ...HOME_IMAGE, year: "" }];
    catalog().filter((i) => i.embed || i.image).forEach((i) => slides.push({ it: i, title: i.title, year: i.year, href: `project.html?id=${i.id}` }));
    const imgs = slides.map((sl) => {
      const img = document.createElement("img");
      img.alt = sl.title; img.decoding = "async";
      frame.appendChild(img);
      if (sl.it) stillInto(img, sl.it, () => drop(sl));
      else { img.src = sl.src; img.onerror = () => drop(sl); }
      return img;
    });
    let k = 0, timer = 0, live = slides.slice();
    const render = () => {
      if (!live.length) return;
      k = (k + live.length) % live.length;
      const sl = live[k];
      imgs.forEach((im, n) => im.classList.toggle("is-on", slides[n] === sl));
      cap.href = sl.href;
      cap.innerHTML = `<b>${E(sl.title)}</b>${sl.year ? " · " + E(sl.year) : ""}`;
      count.textContent = live.length > 1 ? `${k + 1} / ${live.length}` : "";
    };
    const drop = (sl) => { const n = live.indexOf(sl); if (n < 0) return; live.splice(n, 1); if (n < k) k--; render(); };
    const step = (d) => { k += d; render(); pause(); };
    const start = () => { stop(); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => { k++; render(); }, 5000); };
    const stop = () => { if (timer) clearInterval(timer); timer = 0; };
    let resume = 0;
    const pause = () => { stop(); clearTimeout(resume); resume = setTimeout(start, 12000); };
    document.getElementById("showPrev").addEventListener("click", () => step(-1));
    document.getElementById("showNext").addEventListener("click", () => step(1));
    window.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1); });
    frame.addEventListener("mouseenter", stop); frame.addEventListener("mouseleave", start);
    let x0 = null;
    frame.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    frame.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    render(); start();
  }

  /* work: artwork grid / research list / funded list */
  function initWork() {
    const root = document.getElementById("workRoot");
    if (!root) return;
    const tabs = [...document.querySelectorAll(".subnav a")];
    const all = catalog();
    const render = (group) => {
      tabs.forEach((a) => a.classList.toggle("is-current", a.dataset.group === group));
      const items = all.filter((i) => i.group === group);
      if (group === "artwork") {
        root.className = "grid";
        const up = (it) => it.upcoming ? '<span class="tag">Upcoming</span>' : "";
        // a soft, blurred field for upcoming works that have no image yet; hue varies per title
        const hue = (t) => [...t].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 360, 7);
        root.innerHTML = items.map((it) => (it.image || it.embed) ? `
          <a class="tile" href="project.html?id=${it.id}">
            <span class="tile__pic"><img alt="" loading="lazy" data-id="${it.id}" />${up(it)}</span>
            <span class="tile__cap">${E(it.title)}<span>${E(it.year)}</span></span>
          </a>` : it.upcoming ? `
          <a class="tile tile--soon" href="project.html?id=${it.id}">
            <span class="tile__pic tile__pic--soft" style="--h:${hue(it.title)}"><i></i>${up(it)}</span>
            <span class="tile__cap">${E(it.title)}<span>${E(it.year)}</span></span>
            <span class="tile__line">${E(it.line)}${it.venue ? " · " + E(it.venue) : ""}</span>
          </a>` : `
          <a class="tile tile--text" href="project.html?id=${it.id}">
            <span class="tile__cap">${E(it.title)}<span>${E(it.year)}</span></span>
            <span class="tile__line">${E(it.line)}${it.venue ? " · " + E(it.venue) : ""}</span>
            <span class="tile__note">Images coming soon</span>
          </a>`).join("");
        root.querySelectorAll("img[data-id]").forEach((img) => { const it = items.find((x) => x.id === img.dataset.id); if (it) stillInto(img, it); });
      } else {
        root.className = "textlist";
        root.innerHTML = items.map((it) => `
          <div class="entry">
            <span class="entry__year">${E(it.year)}</span>
            <a class="entry__title" href="project.html?id=${it.id}">${E(it.title)}</a>
            <span class="entry__line">${E(it.line)}${it.venue ? " · " + authors(E(it.venue)) : ""}</span>
            ${pills(it.links)}
          </div>`).join("");
      }
    };
    const fromHash = () => { const g = (location.hash || "").slice(1); render(GROUPS[g] ? g : "artwork"); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* project: one item, read from ?id= */
  function initProject() {
    const root = document.getElementById("projectRoot");
    if (!root) return;
    const all = catalog();
    const id = new URLSearchParams(location.search).get("id");
    const it = all.find((i) => i.id === id) || all[0];
    if (!it) return;
    document.title = `${it.title} - Dana Kim`;
    // slides: the video first (if any), then the main image and the gallery images
    const slides = [];
    if (it.embed) slides.push({ kind: "video", id: it.embed });
    [it.image, ...(it.images || [])].filter(Boolean).forEach((src) => { if (!slides.some((s) => s.src === src)) slides.push({ kind: "image", src }); });
    const videoFrame = (id) => `<iframe src="https://www.youtube.com/embed/${E(id)}?rel=0" title="${E(it.title)}" allow="${ALLOW}" allowfullscreen loading="lazy"></iframe>`;
    let media = "";
    if (slides.length > 1) {
      media = `<div class="viewer" id="viewer">
          <div class="viewer__stage">
            ${slides.map((s, n) => s.kind === "video"
              ? `<div class="viewer__slide${n === 0 ? " is-on" : ""}" data-video="${E(s.id)}">${n === 0 ? videoFrame(s.id) : ""}</div>`
              : `<div class="viewer__slide${n === 0 ? " is-on" : ""}"><img src="${E(s.src)}" alt="${E(it.title)}" loading="${n === 0 ? "eager" : "lazy"}" /></div>`).join("")}
            <button class="viewer__btn viewer__btn--prev" type="button" aria-label="Previous image">←</button>
            <button class="viewer__btn viewer__btn--next" type="button" aria-label="Next image">→</button>
          </div>
          <div class="thumbs" role="tablist">
            ${slides.map((s, n) => `<button class="thumb${n === 0 ? " is-on" : ""}${s.kind === "video" ? " thumb--video" : ""}" type="button" role="tab" aria-label="${s.kind === "video" ? "Video" : "Image " + (n + 1)}">${s.kind === "video" ? `<img alt="" data-yt="${E(s.id)}" />` : `<img src="${E(s.src)}" alt="" loading="lazy" />`}</button>`).join("")}
          </div>
        </div>`;
    } else if (it.embed) {
      media = `<div class="media">${videoFrame(it.embed)}</div>`;
    } else if (it.image) {
      media = `<figure class="media media--image"><img src="${E(it.image)}" alt="${E(it.title)}" /></figure>`;
    } else if (it.demo) {
      media = `<div class="media media--demo"><iframe src="${E(it.demo)}" title="${E(it.title)} - interactive demo" allowfullscreen loading="lazy"></iframe></div>`;
    }
    const meta = `<dl class="meta">
        <dt>${it.group === "artwork" ? "Medium" : "Type"}</dt><dd>${E(it.line)}</dd>
        ${it.venue ? `<dt>${it.group === "research" ? "Venue" : it.group === "projects" ? "Supported by" : "Shown at"}</dt><dd>${authors(E(it.credit || it.venue))}</dd>` : ""}
        ${it.links.length ? `<dt>Links</dt><dd>${pills(it.links)}</dd>` : ""}
      </dl>`;
    const siblings = all.filter((i) => i.group === it.group);
    const k = siblings.indexOf(it);
    const prev = siblings[k - 1], next = siblings[k + 1];
    root.innerHTML = `
      <header class="proj__head"><h1 class="proj__title">${E(it.title)}</h1><span class="proj__year">${E(it.year)}</span>${it.upcoming ? '<span class="tag">Upcoming</span>' : ""}</header>
      ${media ? `<div class="proj__body">${media}${meta}</div>`
              : `<p class="proj__line">${E(it.line)}${it.venue ? " · " + authors(E(it.credit || it.venue)) : ""}</p>${it.links.length ? `<p class="proj__links proj__links--top">${pills(it.links)}</p>` : ""}`}
      ${it.desc ? `<p class="proj__desc">${E(it.desc)}</p>` : ""}
      ${it.details && it.details.length ? `<ul class="proj__details">${it.details.map((d) => typeof d === "string" ? `<li>${E(d)}</li>`
          : `<li>${E(d.text)} <a href="project.html?id=paper-${slug(d.paper)}">${E(d.paper)}</a>${d.after ? " " + E(d.after) : ""}</li>`).join("")}</ul>` : ""}
      ${it.keywords && it.keywords.length ? `<p class="proj__keywords"><span>Keywords</span>${it.keywords.map(E).join(" · ")}</p>` : ""}
      <nav class="proj__nav" aria-label="More">
        <span>${prev ? `<a href="project.html?id=${prev.id}">← ${E(prev.title)}</a>` : ""}</span>
        <a href="work.html#${it.group}">All ${GROUPS[it.group].toLowerCase()}</a>
        <span>${next ? `<a href="project.html?id=${next.id}">${E(next.title)} →</a>` : ""}</span>
      </nav>`;
    initViewer(root.querySelector("#viewer"));
  }

  /* image viewer on project pages: arrows, thumbnails, keys, swipe */
  function initViewer(v) {
    if (!v) return;
    const slides = [...v.querySelectorAll(".viewer__slide")], thumbs = [...v.querySelectorAll(".thumb")];
    thumbs.forEach((t) => { const im = t.querySelector("img[data-yt]"); if (im) ytImage(im, im.dataset.yt); });
    let k = 0;
    const show = (n) => {
      k = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const on = i === k;
        s.classList.toggle("is-on", on);
        if (on && s.dataset.video && !s.querySelector("iframe")) {
          s.innerHTML = `<iframe src="https://www.youtube.com/embed/${s.dataset.video}?rel=0" title="Video" allow="${ALLOW}" allowfullscreen loading="lazy"></iframe>`;
        }
        if (!on && s.dataset.video && s.querySelector("iframe")) s.innerHTML = ""; // stop playback when leaving the video
      });
      thumbs.forEach((t, i) => { t.classList.toggle("is-on", i === k); t.setAttribute("aria-selected", i === k ? "true" : "false"); });
    };
    v.querySelector(".viewer__btn--prev").addEventListener("click", () => show(k - 1));
    v.querySelector(".viewer__btn--next").addEventListener("click", () => show(k + 1));
    thumbs.forEach((t, i) => t.addEventListener("click", () => show(i)));
    window.addEventListener("keydown", (e) => { if (e.target.closest("input, textarea")) return; if (e.key === "ArrowLeft") show(k - 1); else if (e.key === "ArrowRight") show(k + 1); });
    const stage = v.querySelector(".viewer__stage");
    let x0 = null;
    stage.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(dx < 0 ? k + 1 : k - 1); });
  }

  /* about: research-area line */
  function initAbout() {
    const t = document.getElementById("areaThemes"), m = document.getElementById("areaMedia");
    if (t && typeof researchThemes !== "undefined") t.textContent = researchThemes.join(" · ");
    if (m && typeof researchMedia !== "undefined") m.textContent = researchMedia.join(" · ");
  }

  /* cv: label column + year/text rows */
  function initCV() {
    const root = document.getElementById("cvRoot");
    if (!root) return;
    const item = (year, text, sub) => `<div class="cvitem"><span class="cvitem__year">${E(year)}</span><span class="cvitem__text">${text}${sub ? `<span class="cvitem__sub">${sub}</span>` : ""}</span></div>`;
    const row = (label, items) => items.length ? `<section class="cvrow"><h2 class="cvrow__label">${label}</h2><div>${items.join("")}</div></section>` : "";
    // top-level consts in ../js/main.js are not window properties, so name them directly
    const edu = (typeof education !== "undefined" ? education : []).map((e) => item(e.year, E(e.title), E(e.venue)));
    const exp = (typeof experience !== "undefined" ? experience : []).map((e) => item(e.year, E(e.title), E(e.venue)));
    const pubs = (typeof publications !== "undefined" ? publications : []).map((q, i) => item(q.year, `<a href="project.html?id=paper-${slug(q.title)}">${E(q.title)}</a>`,
      authors(E(q.desc && q.desc.startsWith(q.tag || "\u0000") ? q.desc : `${q.tag || ""}${q.desc ? " · " + q.desc : ""}`)) + pills(q.link ? [{ label: "Paper", url: q.link }] : [])));
    const funded = (typeof projects !== "undefined" ? projects : []).map((p, i) => item(p.year, `<a href="project.html?id=project-${slug(p.title)}">${E(p.title)}</a>`,
      E(p.meta || "") + pills(p.demo ? [{ label: "Demo", url: p.demo }] : [])));
    const acts = (typeof activities !== "undefined" ? activities : []).map((a) => item(a.year, a.link ? `<a href="${E(a.link)}" target="_blank" rel="noopener">${E(a.title)}</a>` : E(a.title), E(a.desc || "")));
    const shows = (typeof exhibitions !== "undefined" ? exhibitions : []).map((x) => item(x.year,
      `${x.link ? `<a href="${E(x.link)}" target="_blank" rel="noopener">${E(x.title)}</a>` : E(x.title)}${isUpcoming(x.upcoming) ? ' <span class="tag">Upcoming</span>' : ""}`,
      [x.venue, x.meta].filter(Boolean).map(E).join(" · ")));
    const prizes = (typeof awards !== "undefined" ? awards : []).map((a) => item(a.year, E(a.title), E(a.venue || "")));
    const areas = [];
    if (typeof researchThemes !== "undefined") areas.push(item("Themes", E(researchThemes.join(" · "))));
    if (typeof researchMedia !== "undefined") areas.push(item("Media", E(researchMedia.join(" · "))));
    root.innerHTML = row("Education", edu) + row("Exhibitions", shows) + row("Awards &amp; selections", prizes) + row("Publications &amp; talks", pubs) + row("Funded projects", funded) + row("Experience", exp) + row("Activities", acts) + row("Research", areas);
  }

  document.addEventListener("DOMContentLoaded", () => { initShow(); initWork(); initProject(); initAbout(); initCV(); });
})();

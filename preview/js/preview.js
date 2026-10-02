/* ============================================================
   Preview build — additions on top of ../js/main.js
   (which provides the data arrays, renderers and nav).
   - allProjects(): works + funded projects as one year-sorted list
   - Home: counter-rotating drums of the projects that have a thumbnail
   - Projects: unified expandable list; opens the row named in the hash
   ============================================================ */

/* ---------- unified list ---------- */
function allProjects() {
  const items = [];
  if (typeof works !== "undefined") {
    works.forEach((w, i) => {
      const parts = (w.medium || "").split(" · ");
      items.push({
        kind: "work",
        src: i,
        year: w.year,
        title: w.title,
        type: parts[0] || "",
        venue: parts.slice(1).join(" · "),
        embed: w.embed,
        desc: w.desc,
        details: w.details,
        links: w.links,
      });
    });
  }
  if (typeof projects !== "undefined") {
    projects.forEach((p, i) => {
      items.push({
        kind: "project",
        src: i,
        year: p.year,
        title: p.title,
        type: p.tag || "Project",
        venue: p.meta || "",
        desc: p.desc,
        demo: p.demo,
        links: p.links,
      });
    });
  }
  // newest first; within a year keep works before funded projects (source order)
  return items
    .map((it, order) => ({ ...it, order }))
    .sort((a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0) || a.order - b.order);
}

const pad2 = (n) => String(n).padStart(2, "0");
const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, "");

/* ---------- Home drum ---------- */
function initDrum() {
  const track = document.getElementById("track");
  if (!track) return;

  const list = allProjects();
  const shown = list.map((it, idx) => ({ ...it, idx })).filter((it) => it.embed); // only items with a thumbnail
  const N = shown.length;
  if (!N) return;
  document.documentElement.style.setProperty("--n", N);
  const left = document.getElementById("colLeft");
  const right = document.getElementById("colRight");
  const cur = document.getElementById("cur");
  const total = document.getElementById("total");
  const prog = document.getElementById("prog");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const open = document.getElementById("openWork");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const thumbSrc = (id, q) => `https://img.youtube.com/vi/${id}/${q}.jpg`;

  left.innerHTML = shown
    .map(
      (w, i) => `
      <div class="ditem" role="button" tabindex="0" aria-label="${esc(w.title)}">
        <span class="ditem__num">${pad2(i + 1)}</span>
        <h2 class="ditem__title">${esc(shortTitle(w.title))}</h2>
        <span class="ditem__meta">${esc(w.year)} · ${esc(w.type)}${w.venue ? " · " + esc(w.venue) : ""}</span>
      </div>`
    )
    .join("");
  right.innerHTML = shown
    .map(
      (w) => `
      <div class="dthumb">
        <span class="still"><img src="${thumbSrc(w.embed, "maxresdefault")}" alt="" loading="eager" decoding="async"
          onerror="this.onerror=function(){this.remove()};this.src='${thumbSrc(w.embed, "hqdefault")}'"></span>
      </div>`
    )
    .join("");
  total.textContent = pad2(N);

  const items = [...left.querySelectorAll(".ditem")];
  const thumbs = [...right.querySelectorAll(".dthumb")];

  const SUB = 4;
  const ticks = [];
  for (let q = 0; q <= (N - 1) * SUB; q++) {
    const t = document.createElement("i");
    t.className = "tick" + (q % SUB ? "" : " tick--major");
    left.appendChild(t);
    ticks.push({ el: t, idx: q / SUB, major: q % SUB === 0 });
  }

  const SEG = 0.42;   // viewport heights of scrolling per work (keep in sync with --seg)
  const HOLD0 = 0.55; // extra viewport heights the first work holds for (--hold0)
  const STEP = (20 * Math.PI) / 180;
  const HOLD = 0.32;
  const EDGE = 1.25;
  let active = -1;

  function update() {
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const holdPx = HOLD0 * vh;
    const span = r.height - vh - holdPx;
    const p = span > 0 ? Math.min(1, Math.max(0, (-r.top - holdPx) / span)) : 0;
    const raw = p * (N - 1);
    const base = Math.min(N - 2, Math.floor(raw));
    const f = raw - base;
    let g = f <= HOLD ? 0 : f >= 1 - HOLD ? 1 : (f - HOLD) / (1 - 2 * HOLD);
    g = g * g * (3 - 2 * g);
    const s = base + g;
    const locked = g === 0 || g === 1;
    const h = items[0].offsetHeight;
    const R = h / STEP;

    const place = (el, d) => {
      const th = d * STEP;
      if (reduce) {
        el.style.transform = `translate3d(0, ${(d * h).toFixed(1)}px, 0)`;
        return Math.abs(th);
      }
      const y = R * Math.sin(th);
      const z = R * (Math.cos(th) - 1);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${((-th * 180) / Math.PI).toFixed(2)}deg)`;
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      return Math.abs(th);
    };

    const i = Math.round(s);
    document.body.classList.toggle("is-locked", locked);
    if (i !== active) {
      active = i;
      items.forEach((el, k) => el.classList.toggle("is-active", k === i));
      thumbs.forEach((el, k) => el.classList.toggle("is-active", k === i));
      cur.textContent = pad2(i + 1);
      prev.disabled = i === 0;
      next.disabled = i === N - 1;
      open.href = `projects.html#p${shown[i].idx}`;
    }
    items.forEach((el, k) => {
      const d = k - s;
      const th = place(el, d);
      const near = 1 - Math.min(1, Math.abs(d)) * 0.5;
      el.style.opacity = (near * Math.max(0, 1 - th / EDGE)).toFixed(3);
    });
    thumbs.forEach((el, k) => {
      const d = k - s;
      const th = place(el, -d);
      const a = Math.min(1, Math.abs(d));
      el.firstElementChild.style.opacity =
        locked && k === i ? 1 : ((0.12 + (1 - a) * 0.42) * Math.max(0, 1 - th / EDGE)).toFixed(3);
    });
    ticks.forEach((t) => {
      const th = place(t.el, t.idx - s);
      t.el.style.opacity = Math.max(0, 1 - th / EDGE).toFixed(3);
      if (t.major) t.el.classList.toggle("is-on", locked && Math.round(t.idx) === i);
    });
    prog.style.width = (p * 100).toFixed(2) + "%";
  }

  const trackTop = () => track.getBoundingClientRect().top + window.scrollY;
  const seg = () => SEG * window.innerHeight;
  const hold0 = () => HOLD0 * window.innerHeight;
  let settleTimer = null;
  let programmatic = false;
  function goTo(k) {
    k = Math.max(0, Math.min(N - 1, k));
    programmatic = true;
    clearTimeout(settleTimer);
    window.scrollTo({
      top: Math.round(trackTop() + (k === 0 ? 0 : hold0() + k * seg())),
      behavior: reduce ? "auto" : "smooth",
    });
    setTimeout(() => (programmatic = false), 700);
  }
  function settle() {
    if (programmatic) return;
    const raw = (window.scrollY - trackTop() - hold0()) / seg();
    if (raw <= 0 || raw >= N - 1) return; // before the first transition, or past the last work
    const k = Math.round(raw);
    if (Math.abs(raw - k) > 0.02) goTo(k);
  }
  const openActive = () => (location.href = open.href);
  prev.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  items.forEach((el, k) => {
    el.addEventListener("click", () => (k === active ? openActive() : goTo(k)));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); k === active ? openActive() : goTo(k); }
    });
  });
  thumbs.forEach((el, k) => el.addEventListener("click", () => (k === active ? openActive() : goTo(k))));
  window.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, select")) return;
    const r = track.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.4) return;
    if ((e.key === "ArrowDown" || e.key === "j" || e.key === "PageDown") && active < N - 1) { e.preventDefault(); goTo(active + 1); }
    if ((e.key === "ArrowUp" || e.key === "k" || e.key === "PageUp") && active > 0) { e.preventDefault(); goTo(active - 1); }
  });

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 160);
    },
    { passive: true }
  );
  if ("onscrollend" in window) {
    window.addEventListener("scrollend", () => { clearTimeout(settleTimer); settleTimer = setTimeout(settle, 40); });
  }
  window.addEventListener("resize", update);
  update();
}

/* ---------- Projects: unified expandable list ---------- */
function renderProjectList() {
  const list = document.getElementById("projectIndex");
  if (!list) return;
  const items = allProjects();
  const labels = `
    <div class="mplist__labels" aria-hidden="true">
      <span>Project</span><span>Type · Venue</span><span>Year</span>
    </div>`;
  list.innerHTML =
    labels +
    items
      .map((it, i) => {
        const embed = it.embed
          ? `<div class="mp__embed"><iframe
                data-src="https://www.youtube.com/embed/${esc(it.embed)}?rel=0"
                title="${esc(it.title)} — video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe></div>`
          : "";
        const desc = it.desc ? `<p class="mp__desc">${esc(it.desc)}</p>` : "";
        const details =
          it.details && it.details.length
            ? `<ul class="mp__details">${it.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`
            : "";
        const demo = it.demo
          ? `<div class="mp__demo"><div class="demo__frame"><iframe data-src="${esc(it.demo)}" title="${esc(it.title)} — interactive demo" loading="lazy" allowfullscreen></iframe></div></div>`
          : "";
        const linkList = [...(it.links || [])];
        if (it.demo) linkList.unshift({ label: "Open demo in new tab", url: it.demo });
        const links = linkList.length
          ? `<div class="mp__links">${linkList
              .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
              .join("")}</div>`
          : "";
        return `
      <article class="mp reveal" id="p${i}">
        <button class="mp__head" aria-expanded="false" aria-controls="p-panel-${i}">
          <span class="mp__title">${esc(it.title)}</span>
          <span class="mp__medium"><span class="mp__type">${esc(it.type)}</span>${esc(it.venue)}</span>
          <span class="mp__year">${esc(it.year)}</span>
        </button>
        <div class="mp__panel" id="p-panel-${i}">
          <div class="mp__inner">
            <div class="mp__box">
              ${embed}${demo}${desc}${details}${links}
            </div>
          </div>
        </div>
      </article>`;
      })
      .join("");

  list.querySelectorAll(".mp__head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".mp");
      const open = item.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        item.querySelectorAll("iframe[data-src]").forEach((f) => { if (!f.src) f.src = f.dataset.src; });
      }
    });
  });

  // rendered after main.js set up its reveal observer, so show these right away
  list.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));

  // open the row named in the hash (projects.html#p3)
  const m = location.hash.match(/^#p(\d+)$/);
  if (m) {
    const head = list.querySelector(`#p${m[1]} .mp__head`);
    if (head) {
      head.click();
      setTimeout(() => head.closest(".mp").scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initDrum();
  renderProjectList();
});

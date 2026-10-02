/* ============================================================
   Preview build — additions on top of ../js/main.js
   (which provides the data arrays, renderers and nav).
   - Home: counter-rotating drums of titles and thumbnails
   - Work: open the row named in the URL hash (work.html#w3)
   - Research: sticky mini index with scroll spy
   ============================================================ */

/* ---------- Home drum ---------- */
function initDrum() {
  const track = document.getElementById("track");
  if (!track || typeof works === "undefined") return;

  const N = works.length;
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

  const pad = (n) => String(n).padStart(2, "0");
  const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, ""); // "Quantum Memory Space (VR)" → "Quantum Memory Space"

  // thumbnails: YouTube maxres, falling back to hq
  const thumbSrc = (id, q) => `https://img.youtube.com/vi/${id}/${q}.jpg`;

  left.innerHTML = works
    .map(
      (w, i) => `
      <div class="ditem" data-k="${i}" role="button" tabindex="0" aria-label="${esc(w.title)}">
        <span class="ditem__num">${pad(i + 1)}</span>
        <h2 class="ditem__title">${esc(shortTitle(w.title))}</h2>
        <span class="ditem__meta">${esc(w.year)} · ${esc(w.medium)}</span>
      </div>`
    )
    .join("");
  right.innerHTML = works
    .map(
      (w, i) => `
      <div class="dthumb" data-k="${i}">
        <span class="still">${
          w.embed
            ? `<img src="${thumbSrc(w.embed, "maxresdefault")}" alt="" loading="eager" decoding="async"
                   onerror="this.onerror=function(){this.remove()};this.src='${thumbSrc(w.embed, "hqdefault")}'">`
            : ""
        }</span>
      </div>`
    )
    .join("");
  total.textContent = pad(N);

  const items = [...left.querySelectorAll(".ditem")];
  const thumbs = [...right.querySelectorAll(".dthumb")];

  // tick strip (4 per work) that rolls with the titles
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
  const STEP = (20 * Math.PI) / 180; // angle between works on the drum
  const HOLD = 0.32;  // fraction of each segment where a pair stays locked
  const EDGE = 1.25;  // radians at which things have rolled out of view
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
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${(
        (-th * 180) / Math.PI
      ).toFixed(2)}deg)`;
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      return Math.abs(th);
    };

    const i = Math.round(s);
    document.body.classList.toggle("is-locked", locked);
    if (i !== active) {
      active = i;
      items.forEach((el, k) => el.classList.toggle("is-active", k === i));
      thumbs.forEach((el, k) => el.classList.toggle("is-active", k === i));
      cur.textContent = pad(i + 1);
      prev.disabled = i === 0;
      next.disabled = i === N - 1;
      open.href = `work.html#w${i}`;
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

  // stepping: buttons, keys, clicks, and a gentle snap when scrolling stops
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
    if (raw <= 0 || raw >= N - 1) return;            // before the first transition, or past the last work
    const k = Math.round(raw);
    if (Math.abs(raw - k) > 0.02) goTo(k);
  }
  prev.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  items.forEach((el, k) => {
    el.addEventListener("click", () => (k === active ? (location.href = open.href) : goTo(k)));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); k === active ? (location.href = open.href) : goTo(k); }
    });
  });
  thumbs.forEach((el, k) => el.addEventListener("click", () => (k === active ? (location.href = open.href) : goTo(k))));
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

/* ---------- Work: open the row named in the hash ---------- */
function openHashedWork() {
  const m = location.hash.match(/^#w(\d+)$/);
  if (!m) return;
  const heads = document.querySelectorAll("#workGrid .mp__head");
  const head = heads[Number(m[1])];
  if (!head) return;
  head.click();
  const item = head.closest(".mp");
  item.classList.add("is-in");
  setTimeout(() => item.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

/* ---------- Research: scroll spy for the mini index ---------- */
function initAcadNav() {
  const nav = document.querySelector(".acad-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a")];
  const groups = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const setCurrent = () => {
    let cur = groups[0];
    groups.forEach((g) => { if (g.getBoundingClientRect().top <= 140) cur = g; });
    links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + cur.id));
  };
  window.addEventListener("scroll", setCurrent, { passive: true });
  setCurrent();
}

document.addEventListener("DOMContentLoaded", () => {
  initDrum();
  openHashedWork();
  initAcadNav();
});

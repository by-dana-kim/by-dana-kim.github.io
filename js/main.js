/* ============================================================
   Dana Kim — Artist Archive
   Edit the data arrays below to update the site.
   ============================================================ */

/* --- Profile: education (학력) ------------------------------ */
const education = [
  { year: "Present", title: "MA Candidate", venue: "KAIST" },
  { year: "2017", title: "BA, Communication", venue: "Yonsei University" },
];

/* --- Profile: research area (연구 분야) --------------------- */
const researchAreas = ["New Media Art", "Immersive Film", "Visual Anthropology"];

/* --- Artwork: works ----------------------------------------
   size: "sm" | "md" | "lg" | "wide"  (그리드에서 차지하는 크기)
   img : 이미지 경로 (예: "assets/works/work1.jpg"). 없으면 placeholder 표시.
   tone: placeholder 배경색 (이미지 없을 때만 사용, 선택).
------------------------------------------------------------- */
const works = [
  { title: "작품 제목 I",  year: "2025", medium: "Oil on canvas, 116×91cm",     size: "lg",   img: "", tone: "#e6dfce" },
  { title: "작품 제목 II", year: "2024", medium: "Mixed media, 60×80cm",         size: "sm",   img: "", tone: "#ddd6c6" },
  { title: "작품 제목 III",year: "2024", medium: "Installation, dimensions var.", size: "md",   img: "", tone: "#e4ddd0" },
  { title: "작품 제목 IV", year: "2023", medium: "Archival print, 100×70cm",      size: "wide", img: "", tone: "#e9e3d5" },
  { title: "작품 제목 V",  year: "2023", medium: "Ceramic, 30×22×22cm",           size: "md",   img: "", tone: "#dcd4c3" },
  { title: "작품 제목 VI", year: "2022", medium: "Watercolour on paper, 42×30cm", size: "sm",   img: "", tone: "#e7e1d2" },
];

/* --- Publish: publications ---------------------------------- */
const publications = [
  {
    year: "2025",
    title: "Mourning Dew: Storytelling of Nectar Ritual Painting through the Digital Moktak",
    desc: "Dana Kim, Youngjun Choi, Jinjoon Lee. ISEA International 2025.",
    tag: "Conference Paper",
    link: "",
  },
];

/* ============================================================
   Rendering
   ============================================================ */
const sizeClass = { sm: "is-sm", md: "is-md", lg: "is-lg", wide: "is-wide" };

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function mediaMarkup(item) {
  if (item.img) {
    return `<div class="work__frame"><img class="work__media" src="${esc(item.img)}" alt="${esc(item.title)}" loading="lazy" /></div>`;
  }
  const tone = item.tone ? ` style="--tone:${esc(item.tone)}"` : "";
  return `<div class="work__frame"><div class="work__ph"${tone}>no image</div></div>`;
}

function renderCV(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items
    .map(
      (e) => `
      <li>
        <span class="cv__year">${esc(e.year)}</span>
        <span class="cv__title">${esc(e.title)}<em>${esc(e.venue)}</em></span>
      </li>`
    )
    .join("");
}

function renderResearch() {
  const el = document.getElementById("researchList");
  if (!el) return;
  el.innerHTML = researchAreas.map((t) => `<li>${esc(t)}</li>`).join("");
}

function renderWorks() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;
  grid.innerHTML = works
    .map(
      (w, i) => `
      <button class="work reveal ${sizeClass[w.size] || "is-md"}" data-index="${i}" aria-label="${esc(w.title)} 크게 보기">
        ${mediaMarkup(w)}
        <div class="work__meta">
          <span class="work__num">${String(i + 1).padStart(2, "0")}</span>
          <span class="work__info">
            <span class="work__title">${esc(w.title)}</span>
            <span class="work__sub">${esc(w.year)} · ${esc(w.medium)}</span>
          </span>
        </div>
      </button>`
    )
    .join("");

  grid.querySelectorAll(".work").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(works[+btn.dataset.index]));
  });
}

function renderPublications() {
  const el = document.getElementById("pubList");
  if (!el) return;
  el.innerHTML = publications
    .map((p) => {
      const title = p.link
        ? `<a class="pub__link" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
        : esc(p.title);
      const tag = p.tag ? `<span class="pub__tag">${esc(p.tag)}</span>` : "";
      return `
      <article class="pub reveal">
        <span class="pub__year">${esc(p.year)}</span>
        <h2 class="pub__title">${title}</h2>
        <p class="pub__desc">${esc(p.desc)}${tag}</p>
      </article>`;
    })
    .join("");
}

/* ============================================================
   Lightbox (artwork page)
   ============================================================ */
let lastFocused = null;

function openLightbox(work) {
  const box = document.getElementById("lightbox");
  const media = document.getElementById("lightboxMedia");
  const cap = document.getElementById("lightboxCap");
  if (!box || !media || !cap) return;

  lastFocused = document.activeElement;
  media.innerHTML = work.img
    ? `<img src="${esc(work.img)}" alt="${esc(work.title)}" />`
    : `<div class="work__ph" style="--tone:${esc(work.tone || "#e4dece")}">no image</div>`;
  cap.innerHTML = `<strong>${esc(work.title)}</strong><span>${esc(work.year)} · ${esc(work.medium)}</span>`;
  box.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("lightboxClose")?.focus();
}

function closeLightbox() {
  const box = document.getElementById("lightbox");
  if (!box || box.hidden) return;
  box.hidden = true;
  document.body.style.overflow = "";
  lastFocused?.focus();
}

function initLightbox() {
  const box = document.getElementById("lightbox");
  if (!box) return;
  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  box.addEventListener("click", (e) => { if (e.target === box) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
}

/* ============================================================
   Reveal on scroll
   ============================================================ */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ============================================================
   Init
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderCV("educationList", education);
  renderResearch();
  renderWorks();
  renderPublications();
  initLightbox();
  initReveal();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

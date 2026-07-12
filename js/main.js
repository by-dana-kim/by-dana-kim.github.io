/* ============================================================
   Dana Kim — Artist Archive
   Edit the data arrays below to update the site.
   ============================================================ */

/* --- Profile: education (학력) ------------------------------ */
const education = [
  { year: "2024–26", title: "MA, Graduate School of Metaverse", venue: "KAIST" },
  { year: "2012–17", title: "BA, Communication", venue: "Yonsei University" },
];

/* --- Profile: career / experience (경력) ------------------- */
const experience = [
  { year: "2019–24", title: "Marketing Planning", venue: "KT (Korea Telecom)" },
];

/* --- Profile: research area (연구 분야) --------------------- */
const researchAreas = ["New Media Art", "Immersive Film", "Visual Anthropology"];

/* --- Artwork: works ----------------------------------------
   size: "sm" | "md" | "lg" | "wide"  (그리드에서 차지하는 크기)
   img : 이미지 경로 (예: "assets/works/work1.jpg"). 없으면 placeholder 표시.
   tone: placeholder 배경색 (이미지 없을 때만 사용, 선택).
------------------------------------------------------------- */
const works = [
  {
    title: "숲길을 걷는 시간 — The Time of Walking in the Forest Path",
    year: "2023",
    medium: "Documentary short, 12 min · DMZ Docs 2023",
    size: "wide",
    img: "", // assets/works/ 에 스틸컷을 넣고 경로를 지정하세요 (예: "assets/works/forest.jpg")
    tone: "#dbdccf",
    link: "https://dmzdocs.com/kor/addon/00000002/history_film_view.asp?m_idx=102855&QueryYear=2023",
  },
  // 작품을 추가하려면 위 형식으로 객체를 더 넣으세요.
  // link 가 있으면 클릭 시 해당 페이지로, 없으면 라이트박스(확대)로 열립니다.
];

/* --- Publish: publications ---------------------------------- */
const publications = [
  {
    year: "2025",
    title: "Mourning Dew: Storytelling of Nectar Ritual Painting through the Digital Moktak",
    desc: "Kim, D., Choi, Y., & Lee, J. Proceedings of the International Symposium on Electronic/Emerging Art (ISEA), 554–559.",
    tag: "Conference Paper",
    link: "https://doi.org/10.23362/KOEN2025.07.25.1.072",
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
    .map((w, i) => {
      const cls = `work reveal ${sizeClass[w.size] || "is-md"}`;
      const inner = `
        ${mediaMarkup(w)}
        <div class="work__meta">
          <span class="work__num">${String(i + 1).padStart(2, "0")}</span>
          <span class="work__info">
            <span class="work__title">${esc(w.title)}</span>
            <span class="work__sub">${esc(w.year)} · ${esc(w.medium)}</span>
          </span>
        </div>`;
      // link 가 있으면 외부 페이지로 이동, 없으면 라이트박스로 확대
      return w.link
        ? `<a class="${cls}" href="${esc(w.link)}" target="_blank" rel="noopener" aria-label="${esc(w.title)} — 자세히 보기">${inner}</a>`
        : `<button class="${cls}" data-index="${i}" aria-label="${esc(w.title)} 크게 보기">${inner}</button>`;
    })
    .join("");

  grid.querySelectorAll("button.work").forEach((btn) => {
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
  renderCV("experienceList", experience);
  renderResearch();
  renderWorks();
  renderPublications();
  initLightbox();
  initReveal();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

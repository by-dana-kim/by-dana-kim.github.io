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
    year: "2026",
    title:
      "Quantum Memory Space: A Model of Superposition and Observation in Place Memory and Its Visual Implementation",
    desc: "Master's Thesis, Graduate School of Metaverse, KAIST. 양자 기억 공간: 장소기억의 중첩과 관측에 대한 모델과 시각화 구현.",
    tag: "Master's Thesis",
    link: "",
    abstract:
      "This thesis proposes Quantum Memory Space (QMS), a model that draws on the concepts of superposition and observation in quantum mechanics to represent place memory as a state in which multiple memory components latently coexist and manifest differently depending on the conditions of observation. In place, memories surface anew each time, shaped by the present context, yet existing digital media organize memory as fixed files and folder entries. Attending to this gap, the thesis explores a media form that reconnects personal archives with the experience of remembering in place. To this end, the QMS model is applied to the superposition of scenes. Scenes of the same place recorded at different times are trained together in 3D Gaussian Splatting so that their superposition becomes visible. The visualization proceeds in three forms of viewpoint-conditioned observation, emotion-based scene construction, and viewpoint-conditioned observation combined with emotion-based visual modulation. The model is realized as a practice case built on the researcher's personal records of Seoul's Gyeongui Line Forest Park, where memories have accumulated over several years. A first-person analysis follows, taking the experience of walking in the actual place as a baseline and comparing how remembering is shaped under the three media conditions of photographs, video, and QMS. QMS lets the multiple times of a place coexist in a latent state, to be encountered anew within present perception.",
  },
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
      const abstract = p.abstract
        ? `<details class="pub__abstract"><summary>Abstract</summary><p>${esc(p.abstract)}</p></details>`
        : "";
      return `
      <article class="pub reveal">
        <span class="pub__year">${esc(p.year)}</span>
        <h2 class="pub__title">${title}</h2>
        <p class="pub__desc">${esc(p.desc)}${tag}</p>
        ${abstract}
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

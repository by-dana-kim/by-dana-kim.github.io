/* ============================================================
   Dana Kim — Artist Archive
   Edit the data arrays below to update the site.
   ============================================================ */

/* --- Profile: education ------------------------------------- */
const education = [
  { year: "2024–26", title: "MS, Graduate School of Metaverse", venue: "KAIST (Double Major in Culture Technology)" },
  { year: "2012–17", title: "BA, Communication", venue: "Yonsei University (Minor in Business Administration)" },
];

/* --- Profile: career / experience --------------------------- */
const experience = [
  { year: "2019–24", title: "Marketing Planning", venue: "KT (Korea Telecom)" },
];

/* --- Profile: research area --------------------------------- */
const researchAreas = ["New Media Art", "Immersive Film", "Visual Anthropology"];

/* --- Artwork: works ----------------------------------------
   image   : still / thumbnail (URL or assets/works/xxx.jpg)
   desc    : short text shown when the item is expanded
   details : bullet list (screenings, awards, exhibition notes)
   links   : [{ label, url }] shown when expanded
   Clicking a row expands it; clicking again collapses it.
------------------------------------------------------------- */
const works = [
  {
    title: "Quantum Memory Space (VR)",
    year: "2025",
    medium: "VR / interactive media · Arts Korea Lab, Seoul",
    image: "https://img.youtube.com/vi/oKY3vPOFfLc/hqdefault.jpg",
    desc: "A VR environment that combines viewpoint-conditioned observation with emotion-based visual modulation, built on the Quantum Memory Space (QMS) model.",
    links: [{ label: "Watch", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Bench Scene",
    year: "2025",
    medium: "Single-channel video projection, 4 min · Arts Korea Lab, Seoul",
    image: "https://img.youtube.com/vi/oKY3vPOFfLc/hqdefault.jpg",
    desc: "A single-channel realization of viewpoint-conditioned observation within the QMS model.",
    links: [{ label: "Watch", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Memory Sphere",
    year: "2025",
    medium: "Single-channel video, projection on canvas, 35 sec · Arts Korea Lab, Seoul",
    image: "https://img.youtube.com/vi/oKY3vPOFfLc/hqdefault.jpg",
    desc: "A short piece presenting the latent structure of memory through the principles of Gaussians and spherical harmonics (SH).",
    links: [{ label: "Watch", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Face to Face",
    year: "2024",
    medium: "Projection mapping · KAIST Dept. of Industrial Design",
    image: "https://img.youtube.com/vi/ziaP3HuxB0M/hqdefault.jpg",
    desc: "A projection-mapping project illuminating Daeseong-dong — the northernmost village in Korea — from far and near.",
    links: [{ label: "Watch", url: "https://www.youtube.com/watch?v=ziaP3HuxB0M" }],
  },
  {
    title: "숲길을 걷는 시간 (The Time of Walking in the Forest Path)",
    year: "2023",
    medium: "Documentary short, 12 min",
    image: "https://img.youtube.com/vi/2NYD9IhMjkU/hqdefault.jpg",
    desc: "A documentary short reflecting on what we discover or lose while walking a forest path.",
    details: [
      "Selected, Korean Competition — 15th DMZ International Documentary Film Festival (2023)",
      "Screened, 2nd Banjjak Documentary Festival (2024)",
      "Screened, 4th Seongbuk Cheongchun Bulpae Film Festival (2024)",
    ],
    links: [
      { label: "Watch", url: "https://youtu.be/2NYD9IhMjkU" },
      { label: "DMZ Docs", url: "https://dmzdocs.com/kor/addon/00000002/history_film_view.asp?m_idx=102855&QueryYear=2023" },
    ],
  },
];

/* --- Academic: publications (papers, thesis, talks) --------- */
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
    title: "AI Voice and the Performativity of Absence in Documentary Theatre",
    desc: "The 20th TaPRA (Theatre and Performance Research Association), University of Warwick, 27–29 Aug 2025. Session: Telling Times — Multiform Disruption and Documentary Practices.",
    tag: "Conference Presentation",
    link: "",
  },
  {
    year: "2025",
    title: "Mourning Dew: Storytelling of Nectar Ritual Painting through the Digital Moktak",
    desc: "Kim, D., Choi, Y., & Lee, J. Proceedings of the International Symposium on Electronic/Emerging Art (ISEA), 554–559.",
    tag: "Conference Paper",
    link: "https://www.isea-symposium-archives.org/wp-content/uploads/2025/09/2025_Kim_Mourning-Dew-Storytelling-of-Nectar-Ritual-Painting-through-the-Digital-Moktak.pdf",
    abstract:
      "This paper examines Nectar Ritual Painting, also known as Gamnodo, a genre of Korean Buddhist painting originally intended to guide the liberation of wandering spirits through ceremonial practices. Over time, Gamnodo expanded to reflect secular and societal dimensions, offering a rich narrative of the daily realities and cultural transformations of its era. Building on this tradition, the paper focuses on Mourning Dew (2024, Single Channel Video, 1'39\"), a video piece that collages imagery from two Gamnodo paintings and maps it onto the surface of a digitally rendered moktak, a wooden percussion instrument in Buddhism. This project creates a ceremonial digital experience, bridging spiritual heritage with contemporary media. The reimagination of Gamnodo in this project demonstrates how traditional art forms can be transformed into modern storytelling while preserving and revitalizing their original cultural context and purpose in the digital age.",
  },
];

/* --- Academic: funded research / grants --------------------- */
const grants = [
  {
    year: "2025",
    title: "Metaverse Implementation of Digital Memory Using Moiré Patterns of 2D Materials",
    desc: "KAIST Office of Research — Master's & Ph.D. Adventurous Research Program (Apr–Nov 2025).",
    tag: "Funded Research",
    link: "project.html",
    abstract:
      "This research develops a system to visualize and interact with collective memory in virtual reality by drawing on the moiré patterns and superposition principles of graphene, a 2D material, together with its quantum-physical properties.",
  },
];

/* --- Academic: activities ----------------------------------- */
const activities = [
  {
    year: "2026",
    title: "Teaching Assistant — 2026 KAIST–MIT Quantum Information Winter School",
    desc: "Jan 5–16, 2026. Lectures and poster sessions across quantum information science with KAIST–MIT faculty; student guidance and event support.",
    tag: "Academic Activity",
    link: "https://www.youtube.com/watch?v=xVER_JpaYEw",
  },
];

/* --- Project: projects (expandable; optional embedded demo) -- */
const projects = [
  {
    year: "2025",
    title: "Metaverse Implementation of Digital Memory Using Moiré Patterns of 2D Materials",
    tag: "Funded Research",
    meta: "KAIST Office of Research · Master's & Ph.D. Adventurous Research Program · Apr–Nov 2025",
    desc: "This research develops a system to visualize and interact with collective memory in virtual reality by drawing on the moiré patterns and superposition principles of graphene, a 2D material, together with its quantum-physical properties.",
    demo: "https://quantum-memory-interference.ai.studio",
    links: [],
  },
];

/* ============================================================
   Helpers
   ============================================================ */
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

// Bold the artist's own name in citations (applied to already-escaped text)
const AUTHOR_NAMES = ["Kim, D.", "Dana Kim", "김단아"];
function boldAuthor(html) {
  return AUTHOR_NAMES.reduce(
    (out, name) => out.split(name).join(`<strong>${name}</strong>`),
    html
  );
}

/* ============================================================
   Profile rendering
   ============================================================ */
function renderCV(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items
    .map(
      (e) => `
      <li>
        <span class="cv__year">${esc(e.year)}</span>
        <span class="cv__title">${esc(e.title)}<em>${e.venueHtml || esc(e.venue)}</em></span>
      </li>`
    )
    .join("");
}

function renderResearch() {
  const el = document.getElementById("researchList");
  if (!el) return;
  el.innerHTML = researchAreas.map((t) => `<li>${esc(t)}</li>`).join("");
}

/* ============================================================
   Artwork rendering (expandable list — hover lifts, click opens)
   ============================================================ */
function renderWorks() {
  const list = document.getElementById("workGrid");
  if (!list) return;
  list.innerHTML = works
    .map((w, i) => {
      const img = w.image
        ? `<img class="wl__img" src="${esc(w.image)}" alt="${esc(w.title)}" loading="lazy" />`
        : "";
      const desc = w.desc ? `<p class="wl__desc">${esc(w.desc)}</p>` : "";
      const details =
        w.details && w.details.length
          ? `<ul class="wl__details">${w.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`
          : "";
      const links =
        w.links && w.links.length
          ? `<div class="wl__links">${w.links
              .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
              .join("")}</div>`
          : "";
      return `
      <article class="wl reveal">
        <button class="wl__head" aria-expanded="false" aria-controls="wl-panel-${i}">
          <span class="wl__year">${esc(w.year)}</span>
          <span class="wl__meta">
            <span class="wl__title">${esc(w.title)}</span>
            <span class="wl__medium">${esc(w.medium)}</span>
          </span>
          <span class="wl__toggle" aria-hidden="true"></span>
        </button>
        <div class="wl__panel" id="wl-panel-${i}">
          <div class="wl__panel-inner">
            ${img}${desc}${details}${links}
          </div>
        </div>
      </article>`;
    })
    .join("");

  list.querySelectorAll(".wl__head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".wl");
      const open = item.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

/* ============================================================
   Project rendering (expandable list with optional demo)
   ============================================================ */
function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;
  list.innerHTML = projects
    .map((p, i) => {
      const kind = p.tag ? `<span class="wl__kind">[${esc(p.tag)}]</span>` : "";
      const meta = p.meta ? `<span class="wl__medium">${esc(p.meta)}</span>` : "";
      const desc = p.desc ? `<p class="wl__desc">${esc(p.desc)}</p>` : "";
      const demo = p.demo
        ? `<div class="demo__head">
             <p class="acad-group__title">Interactive Demo</p>
             <a class="demo__open" href="${esc(p.demo)}" target="_blank" rel="noopener">Open in new tab ↗</a>
           </div>
           <div class="demo__frame"><iframe src="${esc(p.demo)}" title="${esc(p.title)} — interactive demo" loading="lazy" allowfullscreen></iframe></div>
           <p class="demo__note">If the demo does not load in this frame, open it in a new tab.</p>`
        : "";
      const links =
        p.links && p.links.length
          ? `<div class="wl__links">${p.links
              .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
              .join("")}</div>`
          : "";
      return `
      <article class="wl reveal">
        <button class="wl__head" aria-expanded="false" aria-controls="pj-panel-${i}">
          <span class="wl__year">${esc(p.year)}</span>
          <span class="wl__meta">
            ${kind}
            <span class="wl__title">${esc(p.title)}</span>
            ${meta}
          </span>
          <span class="wl__toggle" aria-hidden="true"></span>
        </button>
        <div class="wl__panel" id="pj-panel-${i}">
          <div class="wl__panel-inner">
            ${desc}${demo}${links}
          </div>
        </div>
      </article>`;
    })
    .join("");

  list.querySelectorAll(".wl__head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".wl");
      const open = item.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

/* ============================================================
   Academic rendering (publications / grants / activities)
   ============================================================ */
function renderEntries(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items
    .map((p) => {
      const external = p.link && /^https?:/i.test(p.link);
      const title = p.link
        ? `<a class="pub__link" href="${esc(p.link)}"${external ? ' target="_blank" rel="noopener"' : ""}>${esc(p.title)}</a>`
        : esc(p.title);
      const kind = p.tag ? `<span class="pub__kind">[${esc(p.tag)}]</span>` : "";
      const desc = p.desc ? `<p class="pub__desc">${boldAuthor(esc(p.desc))}</p>` : "";
      const abstract = p.abstract
        ? `<details class="pub__abstract"><summary>${esc(p.abstractLabel || "Abstract")}</summary><p>${esc(p.abstract)}</p></details>`
        : "";
      return `
      <article class="pub reveal">
        <span class="pub__year">${esc(p.year)}</span>
        <div class="pub__body">
          ${kind}
          <h2 class="pub__title">${title}</h2>
          ${desc}
          ${abstract}
        </div>
      </article>`;
    })
    .join("");
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
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
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
  renderEntries("pubList", publications);
  renderEntries("grantList", grants);
  renderEntries("activityList", activities);
  renderProjects();
  initReveal();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

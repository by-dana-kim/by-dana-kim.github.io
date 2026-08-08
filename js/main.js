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
   embed   : YouTube video id (embedded when the row is expanded)
   desc    : short text shown when the item is expanded
   details : bullet list (screenings, awards, exhibition notes)
   links   : [{ label, url }] shown when expanded
   Clicking a row expands it (hover lifts it); clicking again collapses.
------------------------------------------------------------- */
const works = [
  {
    title: "Quantum Memory Space (VR)",
    year: "2025",
    medium: "VR / interactive media · Arts Korea Lab, Seoul",
    embed: "oKY3vPOFfLc",
    desc: "A VR environment that combines viewpoint-conditioned observation with emotion-based visual modulation, built on the Quantum Memory Space (QMS) model.",
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Bench Scene",
    year: "2025",
    medium: "Single-channel video projection, 4 min · Arts Korea Lab, Seoul",
    embed: "oKY3vPOFfLc",
    desc: "A single-channel realization of viewpoint-conditioned observation within the QMS model.",
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Memory Sphere",
    year: "2025",
    medium: "Single-channel video, projection on canvas, 35 sec · Arts Korea Lab, Seoul",
    embed: "oKY3vPOFfLc",
    desc: "A short piece presenting the latent structure of memory through the principles of Gaussians and spherical harmonics (SH).",
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Face to Face",
    year: "2024",
    medium: "Projection mapping · KAIST Dept. of Industrial Design",
    embed: "ziaP3HuxB0M",
    desc: "A projection-mapping project illuminating Daeseong-dong — the northernmost village in Korea — from far and near.",
    links: [{ label: "Watch on YouTube", url: "https://www.youtube.com/watch?v=ziaP3HuxB0M" }],
  },
  {
    title: "숲길을 걷는 시간 (The Time of Walking in the Forest Path)",
    year: "2023",
    medium: "Documentary short, 12 min",
    embed: "2NYD9IhMjkU",
    desc: "A documentary short reflecting on what we discover or lose while walking a forest path.",
    details: [
      "Selected, Korean Competition — 15th DMZ International Documentary Film Festival (2023)",
      "Screened, 2nd Banjjak Documentary Festival (2024)",
      "Screened, 4th Seongbuk Cheongchun Bulpae Film Festival (2024)",
    ],
    links: [
      { label: "Watch on YouTube", url: "https://youtu.be/2NYD9IhMjkU" },
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
    year: "2026",
    title:
      "Art×Technology Convergence Project — Follow-up Support (예술기술 융합 프로젝트 후속지원)",
    tag: "Funded Project",
    meta: "문화체육관광부(Ministry of Culture, Sports and Tourism) · 예술경영지원센터(Korea Arts Management Service) · 아트코리아랩(Arts Korea Lab) · 2026",
    desc: "Selected for Arts Korea Lab's Art×Technology Convergence Project follow-up support, funding the production and exhibition of a sequel to the 2025 work. 아트코리아랩 예술기술 융합 프로젝트 후속지원 사업에 선정되어 2025년 작품의 후속 작품 제작 및 전시를 지원받고 있다.",
  },
  {
    year: "2025",
    title: "Art×Technology Super Testbed (예술기술 융합 수퍼 테스트베드)",
    tag: "Funded Project",
    meta: "문화체육관광부(Ministry of Culture, Sports and Tourism) · 예술경영지원센터(Korea Arts Management Service) · 아트코리아랩(Arts Korea Lab) · Dynamic XR Lab · 2025",
    desc: "Selected for Arts Korea Lab's Art×Technology Super Testbed program; received training at the Dynamic XR Lab and produced and exhibited an art×technology convergence prototype. 아트코리아랩 예술기술 융합 수퍼 테스트베드 사업에 선정되어, 다이내믹 XR 랩에서 관련 교육을 받고 예술×기술 융합 기반의 작품 프로토타입을 제작·전시하였다.",
  },
  {
    year: "2025",
    title:
      "Metaverse Implementation of Digital Memory Using Moiré Patterns of 2D Materials (2D 물질의 모아레 패턴을 활용한 디지털 기억의 메타버스 구현)",
    tag: "Funded Research",
    meta: "한국과학기술원(KAIST) 연구처 · 석박사 모험연구사업(Master's & Ph.D. Adventurous Research) · Apr–Nov 2025",
    desc: "This research develops a system to visualize and interact with collective memory in virtual reality by drawing on the moiré patterns and superposition principles of graphene, a 2D material, together with its quantum-physical properties. 2D 물질인 그래핀의 모아레 패턴과 중첩 원리, 양자물리학적 특성을 활용하여 집단 기억을 가상현실에서 시각화하고 상호작용할 수 있는 시스템을 개발하는 것을 목표로 한다.",
    demo: "https://quantum-memory-interference.ai.studio",
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
   Artwork rendering (mosspark-style table: hover lifts a row,
   click expands its panel with an embedded video; click collapses)
   ============================================================ */
function renderWorks() {
  const list = document.getElementById("workGrid");
  if (!list) return;
  const labels = `
    <div class="mplist__labels" aria-hidden="true">
      <span>Work</span><span>Medium</span><span>Year</span>
    </div>`;
  list.innerHTML =
    labels +
    works
      .map((w, i) => {
        const embed = w.embed
          ? `<div class="mp__embed"><iframe
                data-src="https://www.youtube.com/embed/${esc(w.embed)}?rel=0"
                title="${esc(w.title)} — video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe></div>`
          : "";
        const desc = w.desc ? `<p class="mp__desc">${esc(w.desc)}</p>` : "";
        const details =
          w.details && w.details.length
            ? `<ul class="mp__details">${w.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`
            : "";
        const links =
          w.links && w.links.length
            ? `<div class="mp__links">${w.links
                .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
                .join("")}</div>`
            : "";
        return `
      <article class="mp reveal">
        <button class="mp__head" aria-expanded="false" aria-controls="mp-panel-${i}">
          <span class="mp__title">${esc(w.title)}</span>
          <span class="mp__medium">${esc(w.medium)}</span>
          <span class="mp__year">${esc(w.year)}</span>
        </button>
        <div class="mp__panel" id="mp-panel-${i}">
          <div class="mp__inner">
            <div class="mp__box">
              ${embed}${desc}${details}${links}
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
        // load the embed only on first expansion
        const frame = item.querySelector("iframe[data-src]");
        if (frame && !frame.src) frame.src = frame.dataset.src;
      }
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
   Interactive decorative shapes (parallax to the cursor)
   ============================================================ */
// scattered around the whole viewport (corners + edges), small and subtle
const DECO_SHAPES = [
  { cls: "shape--disc", color: "var(--c-violet)", size: "44px", pos: "top:15%;left:5%",     depth: 14, rot: 0 },
  { cls: "shape--sq",   color: "var(--c-blue)",   size: "26px", pos: "top:40%;left:3%",      depth: 22, rot: 14 },
  { cls: "shape--ring", color: "var(--c-cyan)",   size: "30px", pos: "bottom:16%;left:9%",   depth: -18, rot: 0 },
  { cls: "shape--disc", color: "var(--c-blue)",   size: "20px", pos: "bottom:10%;left:20%",  depth: 16, rot: 0 },
  { cls: "shape--disc", color: "var(--c-cyan)",   size: "34px", pos: "top:12%;right:8%",     depth: -16, rot: 0 },
  { cls: "shape--ring", color: "var(--c-violet)", size: "50px", pos: "top:56%;right:5%",     depth: 20, rot: 0 },
  { cls: "shape--sq",   color: "var(--c-teal)",   size: "24px", pos: "bottom:14%;right:12%", depth: -24, rot: 20 },
];

function initDeco() {
  if (document.querySelector(".deco")) return;
  const deco = document.createElement("div");
  deco.className = "deco";
  deco.setAttribute("aria-hidden", "true");
  deco.innerHTML = DECO_SHAPES.map(
    (s) =>
      `<span class="shape ${s.cls}" style="--c:${s.color};width:${s.size};${s.pos}" data-depth="${s.depth}" data-rot="${s.rot}"></span>`
  ).join("");
  document.body.appendChild(deco);

  const shapes = [...deco.querySelectorAll(".shape")];
  const base = (s) => `rotate(${s.dataset.rot || 0}deg)`;
  shapes.forEach((s) => (s.style.transform = base(s)));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let raf = null, tx = 0, ty = 0;
  function apply() {
    raf = null;
    shapes.forEach((s) => {
      const d = parseFloat(s.dataset.depth) || 0;
      s.style.transform = `translate(${(tx * d).toFixed(1)}px, ${(ty * d).toFixed(1)}px) ${base(s)}`;
    });
  }
  window.addEventListener(
    "mousemove",
    (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    },
    { passive: true }
  );
}

/* ============================================================
   Navigation — hamburger, liquid pill, shrink on scroll
   ============================================================ */
function initNav() {
  const masthead = document.querySelector(".masthead");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  // hamburger (mobile)
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // liquid pill that follows the hovered / active nav item (desktop)
  if (nav) {
    const pill = document.createElement("span");
    pill.className = "nav__pill";
    pill.setAttribute("aria-hidden", "true");
    nav.prepend(pill);
    const links = [...nav.querySelectorAll("a")];
    const moveTo = (el) => {
      pill.style.left = el.offsetLeft + "px";
      pill.style.top = el.offsetTop + "px";
      pill.style.width = el.offsetWidth + "px";
      pill.style.height = el.offsetHeight + "px";
      pill.style.opacity = "1";
    };
    const settle = () => {
      const active = nav.querySelector('a[aria-current="page"]');
      if (active) moveTo(active);
      else pill.style.opacity = "0";
    };
    links.forEach((a) => a.addEventListener("mouseenter", () => moveTo(a)));
    nav.addEventListener("mouseleave", settle);
    settle();
    window.addEventListener("resize", settle, { passive: true });
  }

  // shrink the masthead once the page is scrolled
  if (masthead) {
    const onScroll = () => masthead.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
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
  // initDeco();  // decorative shapes temporarily disabled
  initNav();
  initReveal();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

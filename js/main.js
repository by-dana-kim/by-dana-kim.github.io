// ===== 데이터: 이 배열만 수정하면 화면이 바뀝니다 =====
const projects = [
  {
    title: "프로젝트 제목",
    desc: "프로젝트에 대한 짧은 설명을 적으세요. 무엇을 만들었고 어떤 문제를 해결했는지.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
  {
    title: "두 번째 프로젝트",
    desc: "이 카드를 복사하거나 삭제해서 프로젝트 개수를 조절할 수 있어요.",
    tags: ["React", "API"],
    link: "#",
  },
  {
    title: "세 번째 프로젝트",
    desc: "link 값에 실제 URL(GitHub 저장소, 배포 사이트 등)을 넣으세요.",
    tags: ["Design"],
    link: "#",
  },
];

const skills = ["HTML", "CSS", "JavaScript", "Git", "여기에", "기술을", "추가하세요"];

// ===== 렌더링 =====
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <a class="card__link" href="${p.link}" target="_blank" rel="noopener">자세히 보기 →</a>
      </article>`
    )
    .join("");
}

function renderSkills() {
  const list = document.getElementById("skillList");
  if (!list) return;
  list.innerHTML = skills.map((s) => `<li>${s}</li>`).join("");
}

// ===== 테마 토글 (다크/라이트) =====
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  toggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ===== 초기화 =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initTheme();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

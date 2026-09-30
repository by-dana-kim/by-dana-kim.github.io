# HANDOFF — Dana Kim 포트폴리오 (작업 인수인계)

이 문서는 이 사이트 작업을 **다른 세션(예: 클라우드)** 에서 이어갈 때 필요한 맥락을 정리한 것입니다.
코드는 전부 GitHub에 push되어 있으니, 이 파일과 저장소만 있으면 바로 이어서 작업할 수 있습니다.

---

## 1. 프로젝트 개요

- **무엇**: 아티스트/연구자 **Dana Kim(김단아)** 의 개인 포트폴리오 · 아카이브 사이트
- **기술**: 빌드 도구 없는 **순수 HTML / CSS / JavaScript** (프레임워크 없음)
- **저장소**: `https://github.com/by-dana-kim/by-dana-kim.github.io`
- **배포**: **GitHub Pages 사용자 루트 사이트** → **https://by-dana-kim.github.io**
  - `main` 브랜치에 push하면 자동 배포됨 (Settings → Pages, Source: `main` / root)
- **기본 언어**: 영어 (한글 고유명사·작품 제목·기관명 등은 한/영 병기)

---

## 2. 파일 구조

```
.
├── index.html      # Home (커버 + 섹션 목차)
├── profile.html    # Profile (About · Education · Experience · Research Area · Contact)
├── artwork.html    # Artwork (확장 리스트: 클릭 시 영상 임베드 + 설명)
├── academic.html   # Academic (Publications · Funded Research · Academic Activities)
├── project.html    # Project (확장 리스트: 프로젝트 + 선택적 데모 임베드)
├── css/style.css   # 전체 스타일 (디자인 토큰 · 컴포넌트 · 인터랙션)
├── js/main.js      # 모든 콘텐츠 데이터 + 렌더링 + 인터랙션
└── .claude/launch.json  # 로컬 미리보기용 dev server 정의 (name: "portfolio", 포트 5173)
```

각 HTML은 공통으로 `<head>`에서 **Space Grotesk**(Google Fonts) + **Pretendard**(jsDelivr CDN)를 로드하고,
공통 마스트헤드(네비)와 콜로폰(푸터) 마크업을 각자 갖고 있습니다. 네비의 "Home" 탭은 없고 **"Dana Kim" 로고를 누르면 홈**으로 갑니다.

---

## 3. 콘텐츠 데이터 — 대부분 `js/main.js` 상단 배열만 수정

모든 표시 콘텐츠는 `js/main.js` 최상단의 배열에서 관리되고, JS가 각 페이지에 렌더링합니다.

- `education` — 학력 (Profile). `{ year, title, venue }` (또는 `venueHtml`로 링크 등 서식 가능)
- `experience` — 경력 (Profile). `{ year, title, venue }`
- `researchAreas` — 연구 분야 칩 (Profile). 문자열 배열
- `works` — Artwork 항목. `{ title, year, medium, embed(YouTube ID), desc, details[], links[{label,url}] }`
  - `embed`가 있으면 클릭 시 YouTube iframe이 열림 (처음 펼칠 때만 lazy 로드)
- `publications` — Academic > Publications. `{ year, title, desc, tag, link, abstract? }`
  - `tag`는 제목 위 `[ ]` 라벨, `abstract`가 있으면 접이식으로 표시
  - `desc` 안의 저자명 `Kim, D.` / `Dana Kim` / `김단아`는 자동으로 굵게 처리(`boldAuthor`)
- `grants` — Academic > Funded Research. `publications`와 같은 형식
- `activities` — Academic > Academic Activities. `publications`와 같은 형식
- `projects` — Project 페이지. `{ year, title, tag, meta, desc, demo?(임베드 URL), links?[] }`

소개문(About)·연락처 등 일부 고정 텍스트는 각 HTML에 직접 작성돼 있습니다.

### 작품/이미지 추가
- Artwork 항목의 `embed`에 YouTube 영상 ID를 넣으면 됩니다. (현재 QMS 3개 작품은 같은 영상 `oKY3vPOFfLc` 공유 중 — 개별 영상 생기면 교체)
- 이미지 파일을 쓰려면 `assets/works/` 폴더를 만들어 넣고 참조.

---

## 4. 디자인 시스템

`css/style.css` 최상단 `:root`에 토큰이 정의돼 있습니다.

- **배경**: 순백 `--paper: #ffffff` / **텍스트**: 차콜 `--ink: #17171a`
- **메인 키컬러**: **퍼플** `--clay: #7c3aed` (네비·라벨·점·호버·선택영역 등)
- **퍼플 그라디언트**:
  - `--grad-purple: linear-gradient(120deg, #7c3aed, #a855f7, #c026d3)` (강한 버전)
  - `--grad-purple-soft: linear-gradient(120deg, #6d28d9, #9333ea)` (톤다운 버전)
- **포인트 컬러(퍼플 계열)**: `--c-blue #4f46e5`, `--c-cyan #06b6d4`(현재 미사용에 가까움), `--c-violet #7c3aed`, `--c-teal #10bfa0`
  - ※ 현재 목차/섹션 점 등은 대부분 퍼플 계열로 통일하는 방향
- **타이포**: 단일 그로테스크. Latin = **Space Grotesk**, 한글 = **Pretendard**
  - `--serif`, `--sans` 둘 다 `"Space Grotesk", "Pretendard Variable", Pretendard, ...`
  - 굵기/크기로 위계 표현. 큰 디스플레이 폰트 지양(사용자 선호: 작은 글자)
- 리스트 항목 제목은 작게(약 15~16px). About·섹션 간 여백도 축소된 상태.

---

## 5. 주요 인터랙션 / 컴포넌트

- **Home 커버**: "Dana Kim"을 마커 하이라이트 블록으로 — **Dana=검정 블록**, **Kim=퍼플 그라디언트 블록**, 글씨 흰색. 이름 오른쪽에 소개문 배치.
- **Home 목차(index)**: 항목 호버 시 **반투명 퍼플 유리 그라디언트**가 `::before` opacity로 **부드럽게 페이드**(0.55s), 텍스트가 함께 슬라이드. (배경 그라디언트는 transition 보간이 안 되므로 `::before` opacity로 처리)
- **네비게이션 바**:
  - 항목 호버 시 **퍼플 그라디언트 글래스 pill**이 liquid하게 슬라이드 (`.nav__pill`, JS로 위치 계산). 기본은 현재 페이지(active)에 위치.
  - **스크롤 시** 마스트헤드가 **중앙 상단에 뜨는 둥근 글래스 아일랜드**로 변형 (`.masthead.is-scrolled`). 상단에서 22px 떨어짐 — 이때 **inner의 margin-top이 아니라 masthead의 padding-top**을 써야 함(margin collapse 회피, 중요).
  - 모바일(≤640px)에선 **햄버거 메뉴**로 접힘.
- **Artwork 리스트** (mosspark.nyc 스타일 참고):
  - 행 호버 시 살짝 뜨고(`translateY(-4px)`), 클릭하면 **높이 애니메이션(grid-rows 0fr→1fr)** 으로 펼쳐지며 **YouTube 임베드 + 설명 + 상영/수상 + 링크** 표시.
  - **열린 항목 전체(제목+내용)** 에 **톤다운 퍼플 그라디언트 사각형 stroke** 프레임(`.mp.is-open`, padding-box/border-box 그라디언트 테두리 트릭).
- **Profile 연구분야 칩** / 나머지 pill류: **글래스모피즘**(반투명 퍼플 그라디언트 + blur + 흰 반투명 테두리 + 그림자).
- **인터랙티브 도형**(`initDeco`): 커서 따라 움직이는 도형 — **현재 비활성**(init에서 호출 주석 처리). 코드는 남아 있음.

---

## 6. 기술 노트 (중요한 함정들)

- **CSS `background-image`(그라디언트)는 transition으로 보간 불가** → 즉시 스냅됨. 그라디언트를 부드럽게 나타내려면 **`::before`에 그라디언트 깔고 opacity를 transition**. (목차 호버가 이 패턴)
- **sticky 요소의 자식 margin-top은 부모와 margin collapse** → 아일랜드가 상단에 붙어버림. **부모(masthead)에 padding-top**을 줘서 해결.
- **YouTube 임베드는 lazy**: `data-src`로 두고 처음 펼칠 때 JS가 `src`를 설정(모든 iframe이 로드에서 한 번에 뜨지 않도록).
- **한글 폰트**: 시스템 폴백(맑은 고딕)이 Space Grotesk와 안 어울려서 **Pretendard**를 명시적으로 로드.

---

## 7. 검증(테스트) 방법

- 로컬에선 dev server로 확인해 왔음: `.claude/launch.json`의 **"portfolio"**(=`npx serve` 포트 5173)를 띄우고 브라우저 미리보기.
- **클라우드 환경에선 브라우저 미리보기가 제한**될 수 있음. 그럴 땐:
  - 정적 사이트라 **배포된 사이트(https://by-dana-kim.github.io)** 로 확인 (push 후 1~2분).
  - 또는 클라우드에서 dev server를 띄우고 가능한 방식으로 확인.
- CSS는 gradient transition(6번) 같은 함정 때문에 **실제 동작 확인**이 중요.

---

## 8. 커밋 규칙

- 커밋 메시지 끝에 다음 줄을 붙여 왔음:
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- 작업 단위마다 커밋 + `main`에 push (배포가 push 기반).

---

## 9. 현재 상태 / 이어갈 수 있는 작업

- 최근까지 **디자인 스키마를 계속 다듬는 중** (밝은 화이트 + 퍼플 그라디언트 방향으로 정착).
- 최근 추가: **Project 탭에 funded project 2건** — 아트코리아랩 예술기술 융합 **수퍼 테스트베드(2025)**, **후속지원(2026)** — 기관명(문화체육관광부/예술경영지원센터/아트코리아랩)과 제목·내용 **한/영 병기**.
- 앞으로 예상되는 작업:
  - **실제 콘텐츠 채우기**: 작품 이미지/영상, 전시 이력, 출판/논문 상세 등
  - 추가 **디자인 미세조정** (색·간격·인터랙션 강도 등)
  - 필요 시 인터랙티브 도형 다시 켜기/재설계

---

## 10. 참고

- 사이트 주 사용자/작가 이메일(연락처 표기): `dana.kim@kaist.ac.kr`, `imp1232@naver.com`
- 소유 GitHub 계정: `by-dana-kim`

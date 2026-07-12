# by-dana-kim.github.io

Dana Kim의 개인 포트폴리오 · 전시 작품 아카이브. 순수 HTML / CSS / JavaScript.
게시 주소: **https://by-dana-kim.github.io**

## 구조

```
.
├── index.html      # Home 탭 (메인/커버 · 섹션 바로가기)
├── profile.html    # Profile 탭 (소개 · 학력 · 경력 · 관심사 · 연락처)
├── artwork.html    # Artwork 탭 (작품 아카이브, 클릭 시 확대)
├── publish.html    # Publish 탭 (도록 · 출판물 · 텍스트)
├── css/style.css   # 디자인 (색상 토큰 · 타이포 · 비정형 그리드)
└── js/main.js      # 데이터 배열 + 렌더링 + 라이트박스
```

## 내용 수정하기 (대부분 `js/main.js` 상단만 편집)

- **학력**: `education` 배열 · **경력**: `experience` 배열 · **연구 분야**: `researchAreas` 배열
- **소개(About) · 연락처**: `profile.html` 텍스트 직접 편집
- **작품**: `works` 배열 — `link`이 있으면 클릭 시 해당 페이지로, 없으면 라이트박스(확대)로 열림
  - `size`: `"sm" | "md" | "lg" | "wide"` — 그리드에서 차지하는 크기
  - `img`: 이미지 경로 (예: `assets/works/work1.jpg`). 비우면 placeholder 표시
  - `tone`: placeholder 색 (이미지 없을 때만)
- **출판물**: `publications` 배열
- **소개 문구 · 연락처**: `index.html`의 텍스트를 직접 편집
- **색상 / 폰트**: `css/style.css` 상단 `:root` 변수

## 이미지 추가

`assets/works/` 폴더를 만들어 이미지를 넣고, `works` 배열의 `img`에 경로를 지정하세요.

## 로컬에서 보기

```bash
npx serve .        # 또는
python -m http.server
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동으로 반영합니다 (Settings → Pages, Source: main / root).

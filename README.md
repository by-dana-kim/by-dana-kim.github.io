# by-dana-kim.github.io

Dana Kim의 개인 사이트. 빌드 도구 없는 순수 HTML / CSS / JavaScript.
게시 주소: **https://by-dana-kim.github.io** (`main` 브랜치에 push하면 GitHub Pages가 자동 배포)

## 구조

```
.
├── index.html      # Home: 작품 스틸 슬라이드쇼 (자동 넘김, 화살표/키보드/스와이프)
├── work.html       # Work: Artwork 그리드 · Research · Funded projects (서브탭)
├── project.html    # 작품·논문·프로젝트 한 건 (?id=제목-슬러그)
├── about.html      # About: 사진 · 소개글 · Research(Themes, Media & methods) · Contact
├── cv.html         # CV: Education · Exhibitions · Awards · Publications · Funded projects · Experience · Activities · Research
├── css/site.css    # 스타일 전체 (상단 :root 에 색·폰트 토큰)
├── js/main.js      # 콘텐츠 데이터 (내용 수정은 여기서만)
├── js/site.js      # 페이지 렌더링
└── assets/         # main.jpg(Spheres of Memory 스틸) · profile.jpg · works/ 작품 이미지
```

사이트 언어는 영어이고 em dash(—) 대신 하이픈(-)을 씁니다.

## 내용 수정하기

모든 글과 목록은 `js/main.js`의 배열에 있습니다. 파일 맨 위 주석에 필드 설명이 있습니다.

- **작품**(`works`): `title`, `year`, `medium`("매체 · 전시 장소"), `embed`(YouTube id), `image`(썸네일), `images`(작품 페이지 갤러리), `desc`, `details`, `links`
  - `upcoming: "YYYY-MM-DD"`: 그 날짜까지 Upcoming 태그가 붙고, 이미지가 없으면 그리드에 번진 색면으로 표시
  - `gridBlur: true`: 이미지가 있어도 전시 전까지 그리드에서는 색면 유지 · `homeImage`: 홈 슬라이드에만 쓸 다른 이미지
  - `details`에 `{ text, paper, after }`를 넣으면 `paper`(논문 제목)가 Research 항목으로 링크됨
- **논문·발표**(`publications`): `authors`(본인 이름은 자동 굵게), `venue`, `tag`, `link`(PDF/도서관 기록), `abstract`
- **지원사업**(`projects`): `meta`(CV용 짧은 크레딧), `credit`(페이지용 전체 크레딧), `images`, `keywords`
- **전시**(`exhibitions`), **수상·선정**(`awards`), **활동**(`activities`), **학력**(`education`), **경력**(`experience`)
- **연구 주제**: `researchThemes`, `researchMedia`
- **소개글·연락처**: `about.html` 본문 직접 편집

## 이미지 넣기

`assets/works/`에 JPG를 넣고(웹용 2000px 폭, 품질 85 정도) 해당 작품의 `image` / `images`에 경로를 적습니다.
YouTube 영상만 있는 작품은 `embed`의 썸네일을 자동으로 씁니다.

## 로컬에서 보기

```bash
python3 -m http.server 5173   # http://localhost:5173
```

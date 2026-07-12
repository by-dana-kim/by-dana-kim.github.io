# by-dana-kim.github.io

Dana Kim의 개인 포트폴리오 · 전시 작품 아카이브. 순수 HTML / CSS / JavaScript.
게시 주소: **https://by-dana-kim.github.io**

## 구조

```
.
├── index.html      # Home (cover · section index)
├── profile.html    # Profile (bio · education · experience · research · contact)
├── artwork.html    # Artwork (expandable list — click a row to open details)
├── academic.html   # Academic (publications · funded research · activities)
├── project.html    # Project (funded research + interactive demo)
├── css/style.css   # design tokens · typography · layout
└── js/main.js      # data arrays + rendering
```

기본 언어는 영어입니다(한글 고유명사 제외).

## 내용 수정하기 (대부분 `js/main.js` 상단만 편집)

- **학력**: `education` · **경력**: `experience` · **연구 분야**: `researchAreas`
- **작품**: `works` 배열
  - `image`: 스틸/썸네일 경로 또는 URL (YouTube 썸네일 등)
  - `desc`: 펼쳤을 때 보이는 설명 · `details`: 수상/상영 등 목록 · `links`: `[{ label, url }]`
- **Academic**: `publications`(논문·학위논문·발표) · `grants`(지원사업) · `activities`(활동)
  - `tag`가 제목 위 `[ ]` 라벨, `abstract`가 있으면 접이식으로 표시
- **소개(About) · 연락처**: `profile.html` 텍스트 직접 편집
- **색상 / 폰트**: `css/style.css` 상단 `:root` 변수

## 이미지 추가

`assets/works/` 폴더에 이미지를 넣고 `works`의 `image`에 경로를 지정하면 됩니다
(현재는 각 작품의 YouTube 썸네일을 사용 중).

## 로컬에서 보기

```bash
npx serve .        # 또는
python -m http.server
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동으로 반영합니다 (Settings → Pages, Source: main / root).

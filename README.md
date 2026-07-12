# web-page

Dana Kim의 개인 포트폴리오 사이트. 순수 HTML / CSS / JavaScript로 제작.

## 구조

```
.
├── index.html      # 페이지 구조 (섹션: Hero, About, Projects, Skills, Contact)
├── css/style.css   # 스타일 + 디자인 토큰(색상/간격) + 다크모드
└── js/main.js      # 프로젝트/스킬 데이터 + 렌더링 + 테마 토글
```

## 내용 수정하기

- **소개 문구**: `index.html` 의 Hero / About 섹션 텍스트를 편집
- **프로젝트 카드**: `js/main.js` 상단의 `projects` 배열 수정
- **기술 스택**: `js/main.js` 상단의 `skills` 배열 수정
- **색상/테마**: `css/style.css` 상단의 `:root` 변수 수정

## 로컬에서 보기

파일을 브라우저로 열거나, 간단한 로컬 서버 사용:

```bash
npx serve .        # 또는
python -m http.server
```

## 배포 (GitHub Pages)

저장소 Settings → Pages → Source를 `main` 브랜치 / `/root` 로 지정하면
`https://by-dana-kim.github.io/web-page/` 에 게시됩니다.

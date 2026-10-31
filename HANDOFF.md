# HANDOFF — Dana Kim 사이트 작업 인수인계

다른 세션에서 이어서 작업할 때 필요한 맥락입니다. 코드는 모두 GitHub `main`에 있고, push하면 바로 배포됩니다.

## 1. 개요

- 사이트: https://by-dana-kim.github.io · 저장소: by-dana-kim/by-dana-kim.github.io
- 기술: 순수 HTML / CSS / JS, 빌드 없음. 폰트는 Manrope(Google Fonts) + Pretendard(jsDelivr).
- 독자: 박사과정 지원·기업 심사가 주 대상. 소개글은 "researcher and media artist"로 시작.
- 표기 규칙: 영어만 사용(한국어 표기 없음), em dash 금지(하이픈 사용), 아트코리아랩 크레딧은
  "Hosted by the Ministry of Culture, Sports and Tourism · Organized by Korea Arts Management Service and Arts Korea Lab"
  (CV에서는 "MCST · KAMS · Arts Korea Lab"으로 축약).

## 2. 디자인

- 왼쪽 고정 사이드바: 이름(초록 밑줄), Work / About / CV, 아래에 이메일(클릭하면 복사) · LinkedIn · Instagram 아이콘.
- 포인트 컬러는 딥그린 `--green: #0e5a3a` 하나. 현재 메뉴, 링크 호버, 알약 버튼, Upcoming 태그에만 사용.
- Home: 이미지가 있는 작품의 스틸을 4.2초마다 넘기는 슬라이드쇼. 캡션을 누르면 작품 페이지.
- Work: Artwork는 3열 그리드(썸네일 + 제목·연도), Research와 Funded projects는 글 목록. 서브탭에 개수 표시.
  - 이미지 없는 upcoming 작품은 번진 색면 + 왼쪽 위 Upcoming 태그. 전시 마지막 날이 지나면 태그는 자동으로 사라짐.
- 작품 페이지: 이미지가 2장 이상이면 상단 뷰어(화살표, 썸네일 줄, 키보드, 스와이프). 영상은 첫 장.
  오른쪽 열에 Medium / Shown at / Links(알약 버튼). 영상·이미지가 없으면 텍스트만 왼쪽 정렬.
- CV: 왼쪽 라벨 열 + 연도 + 본문. 부제 줄은 한 줄을 넘기지 않도록 짧게 유지.
- 모바일(≤760px): 사이드바가 상단 헤더로 바뀜.

## 3. 파일

- `js/main.js`: 데이터만. 맨 위 주석에 필드 설명. 여기만 고치면 모든 페이지에 반영됨.
- `js/site.js`: 렌더링. 작품 id는 제목의 슬러그(`slug()`)라 제목을 바꾸면 주소도 바뀜(About의 두 링크 확인).
- `css/site.css`: 스타일 전체.
- `assets/`: `main.jpg`(Spheres of Memory 스틸, 홈 첫 장), `profile.jpg`(About), `works/*.jpg`.

## 4. 남은 일 / 기다리는 자료

- Memories in the Forest Path(2027, 사진 작품)의 이미지.
- Spheres of Memory의 작품 사진이 더 생기면 `images`에 추가(현재 `gridBlur`로 그리드에서는 색면 유지 중, 11월 8일까지).
- 논문 공동 저자 전체 이름(현재 Y. Choi, J. Lee, J. Her 이니셜).
- Moiré 연구의 캡처 이미지 두 장은 해상도가 낮음(약 700–900px). 큰 원본이 있으면 교체.

## 5. 검증 방법

```bash
python3 -m http.server 5173
```
브라우저에서 index / work / project.html?id=face-to-face / about / cv 를 열어 콘솔 오류가 없는지 확인.
이 컨테이너에서는 YouTube 썸네일이 차단되어 회색으로 보이지만 실제 사이트에서는 정상.

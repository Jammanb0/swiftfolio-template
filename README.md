# Swiftfolio Template

React + TypeScript로 만든, 흰 배경과 파란 포인트 컬러를 사용하는 빠르고 담백한 포트폴리오 사이트 템플릿입니다.
누구나 fork/clone해서 자신의 GitHub Pages 포트폴리오(`your-id.github.io`)로 바로 사용할 수 있도록 만들어졌습니다.

## 특징

- **React 19 + TypeScript + Vite** — 빠른 개발 서버와 빌드
- **vanilla-extract** — zero-runtime CSS-in-TS, 타입 안전한 디자인 토큰
- **Framer Motion** — 페이지 전환, 카드 호버, 버튼 인터랙션
- **GSAP + ScrollTrigger** — 히어로 섹션 등장 애니메이션
- **react-router-dom** — 프로젝트 상세 페이지 라우팅 (GitHub Pages SPA 리다이렉트 포함)
- **유튜브 임베드 컴포넌트** — 프로젝트에 영상 하나만 추가하면 끝
- 프로젝트는 **TypeScript 배열 하나(`src/data/projects.ts`)**로 관리 — 별도 CMS 없이 커밋만으로 포트폴리오 추가

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

## 커스터마이징

### 1. 내 정보 입력하기

[`src/data/profile.ts`](src/data/profile.ts) 에서 이름, 역할, 소개, 이메일, 소셜 링크를 수정하세요.

### 2. 프로젝트 추가하기

[`src/data/projects.ts`](src/data/projects.ts) 배열에 새 객체를 추가하면 목록 페이지와 상세 페이지에 자동으로 반영됩니다.

```ts
{
  id: 'my-new-project',        // URL: /projects/my-new-project
  title: '내 프로젝트',
  summary: '카드에 보이는 한 줄 요약',
  description: '상세 페이지에 보이는 설명입니다.\n줄바꿈이 그대로 유지됩니다.',
  thumbnail: '/my-thumb.png',  // public 폴더 기준 경로 (선택)
  youtubeId: 'VIDEO_ID',       // 유튜브 URL의 v= 뒤 부분 (선택)
  tags: ['React', 'TypeScript'],
  links: [
    { label: 'GitHub', url: 'https://github.com/...', icon: 'github' },
    { label: '라이브 데모', url: 'https://...', icon: 'demo' },
  ],
  date: '2026-07-01',
  featured: true,              // 홈 화면 Featured 섹션에 노출
}
```

- `youtubeId`가 있으면 상세 페이지에 반응형 유튜브 플레이어가 자동으로 삽입됩니다.
- `thumbnail`이 없으면 카드에 그라데이션 플레이스홀더가 대신 표시됩니다.
- 이미지는 `public/` 폴더에 넣고 `/파일명.png` 형태의 절대 경로로 참조하세요.

### 3. 색상 / 타이포그래피 / 여백

[`src/styles/theme.css.ts`](src/styles/theme.css.ts) 에서 모든 디자인 토큰(색상, 폰트 크기, 간격, radius, shadow)을 한 곳에서 관리합니다. `color.blue500` 값만 바꿔도 전체 포인트 컬러가 바뀝니다.

## GitHub Pages로 배포하기

이 템플릿은 `your-id.github.io` 형태의 **사용자 페이지**(레포 루트가 곧 사이트가 되는 경우)를 기본값으로 가정합니다.

1. GitHub에서 `your-id.github.io` 이름으로 새 레포지토리를 만들고, 이 템플릿의 내용을 push합니다.
2. 배포:
   ```bash
   npm run deploy
   ```
   `gh-pages` 패키지가 빌드 결과(`dist/`)를 `gh-pages` 브랜치로 push합니다.
3. 레포 Settings → Pages에서 Source를 `gh-pages` 브랜치로 지정합니다.
4. 몇 분 후 `https://your-id.github.io` 에서 확인할 수 있습니다.

### 프로젝트 페이지(`your-id.github.io/repo-name`)로 배포하는 경우

레포 이름이 `username.github.io`가 아니라면 다음 두 곳을 수정하세요:

- [`vite.config.ts`](vite.config.ts) — `base: '/repo-name/'`
- [`public/404.html`](public/404.html) — `pathSegmentsToKeep = 1`

### 라우팅이 GitHub Pages에서 동작하는 원리

GitHub Pages는 정적 호스팅이라 `/projects/foo`처럼 깊은 경로를 새로고침하면 기본적으로 404가 뜹니다. 이 템플릿은 [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 방식의 리다이렉트를 `public/404.html`과 `index.html`에 미리 넣어뒀기 때문에 별도 설정 없이 클린 URL이 그대로 동작합니다.

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 체크 + 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run lint` | oxlint로 코드 검사 |
| `npm run format` | prettier로 코드 포맷팅 |
| `npm run deploy` | 빌드 후 GitHub Pages로 배포 |

## 폴더 구조

```
src/
  components/
    layout/     Header, Footer, Layout, Container
    ui/         Button, Tag 같은 범용 컴포넌트
    portfolio/  ProjectCard, YoutubeEmbed, LinkList
    home/       Hero (GSAP 애니메이션)
  data/
    profile.ts   내 정보
    projects.ts  프로젝트 목록 — 여기에 계속 추가하면 됩니다
  pages/         Home, Projects, ProjectDetail, NotFound
  styles/        theme.css.ts (디자인 토큰), global.css.ts
  types/         Project 타입 정의
```

## 라이선스

자유롭게 fork하고 커스터마이징해서 사용하세요.

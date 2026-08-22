# Swiftfolio Template

React + TypeScript로 만든, 흰 배경과 파란 포인트 컬러를 사용하는 빠르고 담백한 포트폴리오 사이트 템플릿입니다.
누구나 **Use this template**으로 자신의 GitHub Pages 포트폴리오(`your-id.github.io`)를 바로 만들 수 있습니다.

> AI(Claude Code)를 활용해 기획부터 구현까지 진행한 프로젝트입니다. 과정이 궁금하다면 [PROCESS.md](PROCESS.md)를 참고하세요.

## 특징

- **React 19 + TypeScript + Vite** — 빠른 개발 서버와 빌드
- **vanilla-extract** — zero-runtime CSS-in-TS, 타입 안전한 디자인 토큰
- **Framer Motion** — 페이지 전환, 카드 호버, 버튼 인터랙션
- **GSAP + ScrollTrigger** — 히어로 섹션 등장 애니메이션
- **react-router-dom** — 프로젝트 상세 페이지 라우팅 (GitHub Pages SPA 리다이렉트 포함)
- **마크다운 지원 상세 설명** — react-markdown + remark-gfm으로 헤딩/표/굵게/목록/링크를 자유롭게 작성, 본문 중간에 유튜브 임베드도 가능
- **검색 + 태그 + 연도 필터** — Projects 페이지에서 프로젝트를 바로 찾을 수 있음
- **로딩·오류 복구 화면** — 페이지를 불러오는 동안 진행 상태를 보여주고, 렌더링 오류가 나면 재시도와 홈 이동 방법을 안내
- 프로젝트는 **TypeScript 배열 하나(`src/data/projects.ts`)**로 관리 — 별도 CMS 없이 커밋만으로 포트폴리오 추가

## 시작하기

### 1. 내 저장소 만들기

1. 이 저장소 상단의 **Use this template → Create a new repository**를 선택합니다.
2. Repository name을 `<GitHub 사용자명>.github.io`로 입력합니다. 예를 들어 사용자명이 `your-id`라면 `your-id.github.io`입니다.
3. Public 저장소로 생성한 뒤 로컬에 clone합니다.

```bash
git clone https://github.com/your-id/your-id.github.io.git
cd your-id.github.io
```

> Fork나 일반 clone도 가능하지만, 사용자 페이지에 필요한 저장소 이름을 처음부터 지정하고 원본과 독립된 이력으로 시작할 수 있는 Template 방식을 권장합니다.

### 2. 개발 환경 실행

요구 사항:

- Node.js `^20.19.0` 또는 `>=22.12.0` (Node 22 LTS 권장)
- npm `10` 이상 권장

```bash
npm install
npm run dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

## 커스터마이징

### 1. 내 정보 입력하기

[`src/data/profile.ts`](src/data/profile.ts) 에서 이름, 역할, 소개, 이메일, 소셜 링크를 수정하세요.

`heroCta`는 홈 화면 히어로의 두 번째 버튼입니다. 기본은 메일 앱을 여는 "이메일 보내기"이지만, `label`/`href`를 자유롭게 바꿔서 이력서 PDF, 연락처 폼, Calendly 링크 등으로 써도 됩니다. `href`가 `http`로 시작하면 새 탭으로 열립니다.

`avatar`는 Header 로고 옆에 표시되는 원형 프로필 사진입니다. `public/` 폴더에 이미지를 넣고 `/파일명.jpg` 형태로 지정하세요 — 정사각형이 아니어도 자동으로 원형 크롭됩니다. 빈 문자열이면 아무것도 표시되지 않습니다.

`name`과 `avatar`는 브라우저 탭 제목·파비콘에도 자동으로 쓰입니다. 같은 파일 아래의 `siteMetadata.url`에는 실제 배포 주소를, `siteMetadata.image`에는 SNS 공유 대표 이미지 경로를 입력하세요. 제목과 설명은 `name`·`role`·`bio`에서 자동으로 만들어집니다.

페이지별로 브라우저 제목, 설명, canonical URL, Open Graph, X(Twitter) 카드 정보가 자동 설정됩니다. 프로젝트 상세 페이지는 프로젝트의 `title`·`summary`·`thumbnail`을 사용합니다. 홈 기본 메타데이터는 빌드된 HTML에도 포함되므로 자바스크립트를 실행하지 않는 검색·공유 도구도 읽을 수 있습니다.

> GitHub Pages의 프로젝트 상세 주소는 정적 SPA 리다이렉트를 거칩니다. 따라서 자바스크립트를 실행하지 않는 일부 SNS 공유 봇은 프로젝트별 정보 대신 홈 기본 메타데이터를 표시할 수 있습니다. 모든 상세 주소의 미리보기를 완전히 보장하려면 사전 렌더링이나 SSR 같은 별도 구성이 필요합니다.

### 2. 프로젝트 추가하기

[`src/data/projects.ts`](src/data/projects.ts) 배열에 새 객체를 추가하면 목록 페이지와 상세 페이지에 자동으로 반영됩니다.

```ts
{
  id: 'my-new-project',        // URL: /projects/my-new-project
  title: '내 프로젝트',
  summary: '카드에 보이는 한 줄 요약',
  description: `## 상세 페이지 본문

마크다운을 실제 문서처럼 줄바꿈하며 작성합니다.

- **굵게**, 표, 목록을 사용할 수 있습니다.
- [링크](https://example.com)도 그대로 작성합니다.`,
  role: 'Solo Developer',      // 상세 페이지에 기간과 함께 표시 (선택)
  highlights: ['핵심 성과 1', '핵심 성과 2'], // 상세 페이지 상단 강조 bullet (선택)
  thumbnail: '/my-thumb.png',  // public 폴더 기준 경로 (선택)
  youtubeId: 'VIDEO_ID',       // 유튜브 URL의 v= 뒤 부분 — 상세 페이지 최상단 히어로 영상 (선택)
  tags: ['React', 'TypeScript'],
  links: [
    { label: 'GitHub', url: 'https://github.com/...', icon: 'github' },
    { label: '라이브 데모', url: 'https://...', icon: 'demo' },
  ],
  date: '2026-07-01',          // 시작일, 정렬 기준
  endDate: '2026-08-01',       // 생략하면 "진행 중"으로 표시 (선택)
  featured: true,               // 홈 화면 Featured 섹션에 노출 (선택)
}
```

각 필드에 대한 설명은 [`src/data/projects.ts`](src/data/projects.ts) 상단 주석에도 동일하게 적혀 있습니다.

- `description`은 백틱 템플릿 리터럴로 작성하므로 `\n`을 입력하지 않고 실제 마크다운 문서처럼 엔터로 문단을 나눌 수 있습니다.
- **GitHub-flavored Markdown**을 지원합니다 — `#`/`##` 헤딩, `**굵게**`, `*기울임*`, 표, 목록, `[텍스트](url)` 링크를 그대로 쓰면 됩니다. 템플릿 리터럴 안에서 마크다운 백틱을 사용할 때만 앞에 역슬래시를 붙여 `` \`코드\` ``처럼 작성하세요.
- 본문 중간에 유튜브 영상을 넣고 싶으면 코드블록 언어를 `youtube`로 지정하고 영상 ID만 적으세요. 하나의 프로젝트에 여러 개 넣어도 됩니다.

  ````
  ```youtube
  dQw4w9WgXcQ
  ```
  ````

- `youtubeId` 필드는 이것과 별개로, 상세 페이지 최상단에 오는 **대표 히어로 영상**을 지정할 때 씁니다.
- `thumbnail`은 카드 썸네일이자 상세 페이지 배너 이미지로 동시에 쓰입니다. 없으면 카드에 그라데이션 플레이스홀더가 대신 표시됩니다.
- `thumbnail`과 `youtubeId`가 **둘 다 있으면** 상세 페이지에 배너 이미지가 먼저, 유튜브 영상이 그 아래에 순서대로 표시됩니다. **둘 다 없으면** 미디어 영역 자체가 생기지 않고 곧바로 본문으로 이어집니다 — 빈 박스가 뜨지 않습니다.
- 이미지는 `public/` 폴더에 넣고 `/파일명.png` 형태의 절대 경로로 참조하세요.

### 3. 색상 / 타이포그래피 / 여백

[`src/styles/theme.css.ts`](src/styles/theme.css.ts) 에서 모든 디자인 토큰(색상, 폰트 크기, 간격, radius, shadow)을 한 곳에서 관리합니다. `color.blue500` 값만 바꿔도 전체 포인트 컬러가 바뀝니다.

## GitHub Pages로 자동 배포하기

이 템플릿은 `your-id.github.io` 형태의 **사용자 페이지**(레포 루트가 곧 사이트가 되는 경우)를 기본값으로 가정합니다.

### 자동 배포 흐름

`.github/workflows/deploy-pages.yml`이 `main`에 push될 때 다음 과정을 자동으로 실행합니다.

1. 의존성 설치
2. 린트와 테스트
3. 프로덕션 빌드
4. `dist/`를 GitHub Pages artifact로 업로드
5. `github-pages` 환경에 배포

따라서 별도의 배포 명령이나 빌드 결과용 브랜치 없이 `main`의 최신 소스가 사이트에 반영됩니다. 템플릿 원본처럼 저장소 이름이 `.github.io`로 끝나지 않는 곳에서는 실수로 배포되지 않도록 workflow가 자동으로 건너뜁니다.

### 최초 설정

1. 위의 **시작하기** 절차에 따라 `your-id.github.io` 저장소를 만들고 내 정보와 프로젝트를 입력합니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. **Build and deployment → Source**를 **GitHub Actions**로 선택합니다. 이 설정은 최초 한 번만 필요합니다.
4. 변경한 소스를 `main`에 push합니다.
5. 저장소의 **Actions → Deploy to GitHub Pages**에서 진행 상황을 확인합니다.
6. 완료되면 `https://your-id.github.io`에서 확인할 수 있습니다.

### 이후 콘텐츠를 수정할 때마다

최초 설정 이후에는 소스 변경을 `main`에 push하는 것만으로 배포까지 이어집니다.

```bash
# 1. profile.ts, projects.ts 등 main에서 수정

# 2. 변경 내용을 커밋하고 push
git add .
git commit -m "..."
git push origin main
```

push 후 GitHub Actions가 린트·테스트·빌드를 모두 통과한 경우에만 새 사이트를 배포합니다. 실패하면 기존 사이트는 그대로 유지되며, Actions 실행 화면에서 실패한 단계를 확인할 수 있습니다.

### `dist/` 폴더란

`npm run build`를 실행할 때마다 새로 생성되는 폴더입니다. `.gitignore`에 포함되어 있어 `main`에는 커밋되지 않습니다. GitHub Actions에서는 이 폴더를 Pages artifact로 업로드하며, 그 안의 HTML/CSS/JS가 방문자의 브라우저에 전달됩니다.

> **쉽게 말하면**: 소스 코드를 `main`에 push하면 GitHub가 서버에서 `dist/`를 만들고, 테스트에 성공한 결과만 사이트에 자동 반영합니다.

### 기존 `gh-pages` 수동 배포를 계속 사용하는 경우

이전 버전에서 `gh-pages` 브랜치를 배포 소스로 사용하던 저장소를 위해 `npm run deploy` 명령은 호환용으로 남겨두었습니다. 기존 방식을 계속 사용할 경우 `.github/workflows/deploy-pages.yml`을 제거하거나 비활성화하고 Pages Source를 `gh-pages`로 유지하세요. **GitHub Actions 방식과 수동 `gh-pages` 방식 중 하나만 사용해야 합니다.**

### 프로젝트 페이지(`your-id.github.io/repo-name`)로 배포하는 경우

레포 이름이 `username.github.io`가 아니라면 다음 세 곳을 수정하세요:

- [`vite.config.ts`](vite.config.ts) — `base: '/repo-name/'`
- [`public/404.html`](public/404.html) — `pathSegmentsToKeep = 1`
- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — `build`와 `deploy` job의 `if: endsWith(...)` 조건 제거

### 라우팅이 GitHub Pages에서 동작하는 원리

GitHub Pages는 정적 호스팅이라 `/projects/foo`처럼 깊은 경로를 새로고침하면 기본적으로 404가 뜹니다. 이 템플릿은 [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 방식의 리다이렉트를 `public/404.html`과 `index.html`에 미리 넣어뒀기 때문에 별도 설정 없이 클린 URL이 그대로 동작합니다.

## 스크립트

| 명령어            | 설명                             |
| ----------------- | -------------------------------- |
| `npm run dev`     | 개발 서버 실행                   |
| `npm run build`   | 타입 체크 + 프로덕션 빌드        |
| `npm run preview` | 빌드 결과 로컬 미리보기          |
| `npm run lint`    | oxlint로 코드 검사               |
| `npm run test`    | Vitest 테스트 한 번 실행         |
| `npm run format`  | prettier로 코드 포맷팅           |
| `npm run deploy`  | 기존 `gh-pages` 수동 배포 호환용 |

## 폴더 구조

```
src/
  components/
    layout/     Header, Footer, Layout, Container
    ui/         Button, Tag 같은 범용 컴포넌트
    portfolio/  ProjectCard, YoutubeEmbed, LinkList, Markdown, ProjectFilters
    home/       Hero (GSAP 애니메이션)
  data/
    profile.ts   내 정보
    projects.ts  프로젝트 목록 — 여기에 계속 추가하면 됩니다
  lib/
    date.ts      기간 포맷 유틸 ('2026.03 - 진행 중' 형태)
    gsap.ts      GSAP + ScrollTrigger 등록
  pages/         Home, Projects, ProjectDetail, NotFound
  styles/        theme.css.ts (디자인 토큰), global.css.ts
  types/         Project 타입 정의
```

## 라이선스

자유롭게 Template으로 새 저장소를 만들거나 clone해서 커스터마이징하세요.

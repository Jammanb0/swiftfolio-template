# DECISIONS.md

이 프로젝트를 진행하며 논의했던 주요 결정과 그 이유, 그리고 아직 진행 전인 계획들을 기록합니다.
`CLAUDE.md`가 "지켜야 할 규칙"이라면, 이 파일은 "왜 그렇게 하기로 했는지"와 "다음에 뭘 할지"를 담습니다.
최신 항목이 위로 오도록 정리합니다.

---

## [계획] `projects.ts`를 프로젝트별 파일로 분리

**상태**: 아직 미착수 (프로젝트 개수가 많아지면 진행)

**배경**: 지금은 `src/data/projects.ts` 안에 배열 하나로 모든 프로젝트를 관리합니다. 프로젝트가 많아지면
(20~30개 이상) 파일이 길어지고, 특히 `description` 마크다운을 문자열 이스케이프(`\n\n` 등)로 써야 해서
편집이 불편해집니다.

**결정 방향**: Vite의 `import.meta.glob`으로 `src/data/projects/*.ts` 폴더를 자동 인식하는 구조로 변경.

- 프로젝트마다 파일 하나: `src/data/projects/ddok.ts` 등, `export default`로 `Project` 객체 하나.
  파일명이 꼭 `id`와 같을 필요는 없지만 찾기 편하려면 맞춰두는 게 좋음.
- `src/data/projects.ts`(또는 `projects/index.ts`)는:
  ```ts
  const modules = import.meta.glob<{ default: Project }>('./projects/*.ts', { eager: true })
  export const projects: Project[] = Object.values(modules).map((m) => m.default)
  ```
- `sortedProjects` / `featuredProjects` / `getProjectById` / `allTags` / `allYears`는 지금처럼
  `projects`에서 파생되는 형태 그대로 유지.
- 지켜야 할 원칙: "파일 하나 추가하면 끝, 다른 곳은 안 건드려도 됨" — 지금의 단일 배열 방식이 가진
  장점을 그대로 유지하면서 파일만 쪼개는 것.
- 이 작업이 끝나면 README의 "프로젝트 추가하기" 섹션과 CLAUDE.md의 Architecture 섹션도 같이 갱신.

---

## Fork 기반 배포 유지 (GitHub "Template repository" 기능 미사용)

**결정**: swiftfolio-template의 GitHub 저장소 설정에서 "Template repository"를 켜지 않고, 일반 Fork로만
사용하게 둠.

**이유**: Template repository를 켜면 "Use this template" 버튼이 생겨 사용자 경험은 좋아지지만, Fork
카운트가 늘 기회가 줄어든다. 개인 포트폴리오/이력서용으로 "이 템플릿이 N번 fork됨"이라는 눈에 보이는
숫자가 더 중요하다고 판단해 Fork 방식을 유지하기로 함.

---

## 마크다운 + 커스텀 유튜브 임베드 문법

**결정**: `Project.description`은 GitHub-flavored Markdown(react-markdown + remark-gfm)을 지원하고,
본문 중간에 유튜브 영상을 넣고 싶을 땐 ` ```youtube ` 코드블록 안에 영상 ID만 적으면 `YoutubeEmbed`로
치환되도록 커스텀 렌더러를 구현.

**이유**: 표준 마크다운엔 영상 임베드 문법이 없음. `rehype-raw` 등으로 raw HTML을 허용하는 대신, 코드블록
문법을 재활용해 새 의존성 추가 없이(react-markdown의 `components` prop만 활용) 안전하게 구현.

---

## 스타일링은 vanilla-extract 하나로 통일

**결정**: Emotion 등 다른 CSS-in-JS는 추가하지 않고 vanilla-extract만 사용.

**이유**: 스타일링 솔루션이 여러 개면 유지보수 부담이 커짐. zero-runtime이라 성능도 좋고 타입 안전성도
챙길 수 있어 하나로 통일.

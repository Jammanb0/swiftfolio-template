import type { Project } from '@/types/project'

/**
 * Add your own projects here — just append a new object to this array.
 * Nothing else in the app needs to change: the list, detail page, and
 * routing all pick up new entries automatically.
 */
export const projects: Project[] = [
  {
    id: 'sample-web-app',
    title: '샘플 웹 애플리케이션',
    summary: 'React와 TypeScript로 만든 반응형 웹 서비스입니다.',
    description:
      '이 프로젝트는 템플릿 예시입니다.\n\nsrc/data/projects.ts 파일의 이 항목을 자신의 프로젝트 정보로 바꾸거나, 배열에 새 항목을 추가해서 포트폴리오를 채워보세요.\n\n설명은 줄바꿈이 그대로 유지됩니다.',
    thumbnail: '',
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['React', 'TypeScript', 'Vite'],
    links: [
      { label: 'GitHub', url: 'https://github.com', icon: 'github' },
      { label: '라이브 데모', url: 'https://example.com', icon: 'demo' },
    ],
    date: '2026-06-01',
    featured: true,
  },
  {
    id: 'sample-design-system',
    title: '디자인 시스템 구축',
    summary: '팀의 일관된 UI를 위한 컴포넌트 라이브러리를 설계했습니다.',
    description:
      '두 번째 샘플 프로젝트입니다. youtubeId 없이 썸네일과 링크만 있는 카드 형태 예시입니다.',
    tags: ['Storybook', 'vanilla-extract', 'Design System'],
    links: [{ label: 'GitHub', url: 'https://github.com', icon: 'github' }],
    date: '2026-03-15',
    featured: true,
  },
  {
    id: 'sample-side-project',
    title: '사이드 프로젝트',
    summary: '주말 동안 만들어본 작은 프로젝트입니다.',
    description: '세 번째 샘플 프로젝트 설명입니다. 자유롭게 수정하세요.',
    tags: ['Next.js', 'GSAP'],
    links: [{ label: 'GitHub', url: 'https://github.com', icon: 'github' }],
    date: '2026-01-10',
    featured: false,
  },
]

export const sortedProjects = [...projects].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export const featuredProjects = sortedProjects.filter((p) => p.featured)

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

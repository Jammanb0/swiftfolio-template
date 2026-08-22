import type { Project } from '@/types/project'

export interface ProjectValidationIssue {
  projectIndex: number
  projectId: string
  field: string
  message: string
}

const urlSafeIdPattern = /^[A-Za-z0-9._~-]+$/

function isValidIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))

  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  )
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Returns every content error at once so a template user can fix one CI run
 * instead of discovering invalid fields one by one.
 */
export function validateProjects(projects: readonly Project[]): ProjectValidationIssue[] {
  const issues: ProjectValidationIssue[] = []
  const seenIds = new Set<string>()

  const addIssue = (projectIndex: number, projectId: string, field: string, message: string) => {
    issues.push({ projectIndex, projectId, field, message })
  }

  projects.forEach((project, projectIndex) => {
    const projectId = project.id.trim() || `#${projectIndex + 1}`

    for (const [field, value] of [
      ['id', project.id],
      ['title', project.title],
      ['summary', project.summary],
      ['description', project.description],
      ['date', project.date],
    ] as const) {
      if (value.trim() === '') addIssue(projectIndex, projectId, field, '필수 값이 비어 있습니다.')
    }

    if (project.id && !urlSafeIdPattern.test(project.id)) {
      addIssue(
        projectIndex,
        projectId,
        'id',
        'URL에 안전한 영문, 숫자, 마침표, 밑줄, 하이픈, 물결표만 사용할 수 있습니다.',
      )
    }

    if (project.id) {
      if (seenIds.has(project.id)) {
        addIssue(projectIndex, projectId, 'id', '다른 프로젝트와 ID가 중복됩니다.')
      }
      seenIds.add(project.id)
    }

    if (project.date && !isValidIsoDate(project.date)) {
      addIssue(projectIndex, projectId, 'date', '실제 존재하는 YYYY-MM-DD 날짜여야 합니다.')
    }

    if (project.endDate && !isValidIsoDate(project.endDate)) {
      addIssue(projectIndex, projectId, 'endDate', '실제 존재하는 YYYY-MM-DD 날짜여야 합니다.')
    }

    if (
      isValidIsoDate(project.date) &&
      project.endDate &&
      isValidIsoDate(project.endDate) &&
      project.endDate < project.date
    ) {
      addIssue(projectIndex, projectId, 'endDate', '시작일보다 빠를 수 없습니다.')
    }

    const seenTags = new Set<string>()
    project.tags.forEach((tag, tagIndex) => {
      const normalizedTag = tag.trim().toLowerCase()
      if (!normalizedTag) {
        addIssue(projectIndex, projectId, `tags[${tagIndex}]`, '빈 태그를 사용할 수 없습니다.')
      } else if (seenTags.has(normalizedTag)) {
        addIssue(projectIndex, projectId, `tags[${tagIndex}]`, '같은 태그가 중복되었습니다.')
      }
      seenTags.add(normalizedTag)
    })

    project.links?.forEach((link, linkIndex) => {
      if (link.label.trim() === '') {
        addIssue(projectIndex, projectId, `links[${linkIndex}].label`, '링크 이름이 비어 있습니다.')
      }
      if (!isHttpUrl(link.url)) {
        addIssue(
          projectIndex,
          projectId,
          `links[${linkIndex}].url`,
          'http 또는 https로 시작하는 올바른 URL이어야 합니다.',
        )
      }
    })
  })

  return issues
}

export function formatProjectValidationIssues(issues: readonly ProjectValidationIssue[]): string {
  return issues
    .map(
      ({ projectIndex, projectId, field, message }) =>
        `projects[${projectIndex}] (${projectId}).${field}: ${message}`,
    )
    .join('\n')
}

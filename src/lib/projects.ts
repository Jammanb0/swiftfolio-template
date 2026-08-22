import type { Project } from '@/types/project'
import { getYear } from '@/lib/date'

export interface ProjectFilterOptions {
  query: string
  selectedTags: string[]
  tagMode: 'any' | 'all'
  selectedYear: number | 'all'
  currentYear?: number
}

/** Returns a new array ordered by start date, newest first. */
export function sortProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date))
}

/** Every year in which a project was active, including both boundary years. */
export function getProjectYearRange(
  project: Project,
  currentYear = new Date().getFullYear(),
): number[] {
  const start = getYear(project.date)
  const end = project.endDate ? getYear(project.endDate) : currentYear
  const years: number[] = []

  for (let year = start; year <= end; year++) years.push(year)
  return years
}

/** Pure filtering logic shared by the Projects page and its tests. */
export function filterProjects(
  projects: readonly Project[],
  {
    query,
    selectedTags,
    tagMode,
    selectedYear,
    currentYear = new Date().getFullYear(),
  }: ProjectFilterOptions,
): Project[] {
  const normalizedQuery = query.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesQuery =
      normalizedQuery === '' || project.title.toLowerCase().includes(normalizedQuery)
    const matchesTags =
      selectedTags.length === 0 ||
      (tagMode === 'all'
        ? selectedTags.every((tag) => project.tags.includes(tag))
        : selectedTags.some((tag) => project.tags.includes(tag)))
    const matchesYear =
      selectedYear === 'all' || getProjectYearRange(project, currentYear).includes(selectedYear)

    return matchesQuery && matchesTags && matchesYear
  })
}

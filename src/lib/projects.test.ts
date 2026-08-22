import { describe, expect, it } from 'vitest'
import type { Project } from '@/types/project'
import { filterProjects, getProjectYearRange, sortProjects } from '@/lib/projects'

function makeProject(overrides: Partial<Project>): Project {
  return {
    id: 'project',
    title: 'Project',
    summary: 'Summary',
    description: 'Description',
    tags: [],
    date: '2025-01-01',
    ...overrides,
  }
}

const projects = [
  makeProject({
    id: 'alpha',
    title: 'Alpha Dashboard',
    tags: ['React', 'TypeScript'],
    date: '2024-06-01',
    endDate: '2025-02-01',
  }),
  makeProject({
    id: 'beta',
    title: 'Beta Design System',
    tags: ['React', 'Design System'],
    date: '2025-03-01',
  }),
  makeProject({
    id: 'gamma',
    title: 'Gamma API',
    tags: ['Node.js'],
    date: '2023-01-01',
    endDate: '2023-12-01',
  }),
]

describe('project helpers', () => {
  it('sorts projects by start date without mutating the source array', () => {
    const source = [...projects]

    expect(sortProjects(source).map((project) => project.id)).toEqual(['beta', 'alpha', 'gamma'])
    expect(source).toEqual(projects)
  })

  it('includes every active year in a project period', () => {
    expect(getProjectYearRange(projects[0], 2026)).toEqual([2024, 2025])
    expect(getProjectYearRange(projects[1], 2026)).toEqual([2025, 2026])
  })

  it('searches project titles without case or surrounding-space sensitivity', () => {
    const result = filterProjects(projects, {
      query: '  design SYSTEM ',
      selectedTags: [],
      tagMode: 'any',
      selectedYear: 'all',
      currentYear: 2026,
    })

    expect(result.map((project) => project.id)).toEqual(['beta'])
  })

  it('supports any and all tag matching', () => {
    const options = {
      query: '',
      selectedTags: ['React', 'TypeScript'],
      selectedYear: 'all' as const,
      currentYear: 2026,
    }

    expect(
      filterProjects(projects, { ...options, tagMode: 'any' }).map((project) => project.id),
    ).toEqual(['alpha', 'beta'])
    expect(
      filterProjects(projects, { ...options, tagMode: 'all' }).map((project) => project.id),
    ).toEqual(['alpha'])
  })

  it('matches every year in which a project was active', () => {
    const result = filterProjects(projects, {
      query: '',
      selectedTags: [],
      tagMode: 'any',
      selectedYear: 2024,
      currentYear: 2026,
    })

    expect(result.map((project) => project.id)).toEqual(['alpha'])
  })
})

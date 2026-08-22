import { describe, expect, it } from 'vitest'
import type { Project } from '@/types/project'
import { projects } from '@/data/projects'
import { formatProjectValidationIssues, validateProjects } from '@/data/projectValidation'

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'valid-project',
    title: 'Valid Project',
    summary: 'Summary',
    description: 'Description',
    tags: ['React'],
    date: '2026-01-01',
    ...overrides,
  }
}

describe('project data validation', () => {
  it('keeps the template project data valid', () => {
    const issues = validateProjects(projects)

    expect(issues, formatProjectValidationIssues(issues)).toEqual([])
  })

  it('reports blank required fields and unsafe IDs', () => {
    const issues = validateProjects([
      makeProject({ id: 'invalid project', title: '', summary: ' ', description: '' }),
    ])

    expect(issues.map((issue) => issue.field)).toEqual(
      expect.arrayContaining(['id', 'title', 'summary', 'description']),
    )
  })

  it('reports duplicate IDs, invalid dates, date ranges, tags, and URLs together', () => {
    const issues = validateProjects([
      makeProject(),
      makeProject({
        date: '2026-02-30',
        tags: ['React', ' react ', ''],
        links: [{ label: '', url: 'not-a-url' }],
      }),
      makeProject({ id: 'invalid-range', date: '2026-02-01', endDate: '2025-12-31' }),
    ])
    const fields = issues.map((issue) => issue.field)

    expect(fields).toEqual(
      expect.arrayContaining([
        'id',
        'date',
        'endDate',
        'tags[1]',
        'tags[2]',
        'links[0].label',
        'links[0].url',
      ]),
    )
  })
})

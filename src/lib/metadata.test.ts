import { describe, expect, it } from 'vitest'
import { profile, siteMetadata } from '@/data/profile'
import { getPageMetadata } from '@/lib/metadata'

describe('page metadata', () => {
  it('uses configured defaults on the home page', () => {
    expect(getPageMetadata('/')).toEqual({
      title: siteMetadata.title,
      description: siteMetadata.description,
      canonicalUrl: 'https://your-id.github.io/',
      type: 'website',
      imageUrl: undefined,
    })
  })

  it('describes the projects listing page', () => {
    expect(getPageMetadata('/projects/', 'https://portfolio.example.com')).toMatchObject({
      title: `Projects | ${profile.name}`,
      canonicalUrl: 'https://portfolio.example.com/projects',
      type: 'website',
    })
  })

  it('uses project content on a project detail page', () => {
    expect(getPageMetadata('/projects/sample-web-app')).toMatchObject({
      title: `샘플 웹 애플리케이션 | ${profile.name}`,
      description: 'React와 TypeScript로 만든 반응형 웹 서비스입니다.',
      canonicalUrl: 'https://your-id.github.io/projects/sample-web-app',
      type: 'article',
      imageUrl: 'https://placehold.co/1200x675',
    })
  })

  it('prevents unknown routes from being indexed', () => {
    expect(getPageMetadata('/unknown')).toMatchObject({
      title: `페이지를 찾을 수 없음 | ${profile.name}`,
      robots: 'noindex, nofollow',
    })
  })
})

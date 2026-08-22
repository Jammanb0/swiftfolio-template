import { profile, siteMetadata } from '@/data/profile'
import { getProjectById } from '@/data/projects'

export interface PageMetadata {
  title: string
  description: string
  canonicalUrl: string
  type: 'website' | 'article'
  imageUrl?: string
  robots?: string
}

function absoluteUrl(value: string, baseUrl: string): string | undefined {
  if (!value) return undefined

  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return undefined
  }
}

function projectIdFromPath(pathname: string): string | undefined {
  const match = /^\/projects\/([^/]+)\/?$/.exec(pathname)
  if (!match) return undefined

  try {
    return decodeURIComponent(match[1])
  } catch {
    return undefined
  }
}

/** Resolves route-specific browser, search, and social-sharing metadata. */
export function getPageMetadata(pathname: string, baseUrl = siteMetadata.url): PageMetadata {
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
  const canonicalUrl = new URL(normalizedPath || '/', `${baseUrl.replace(/\/+$/, '')}/`).toString()
  const defaultImageUrl = absoluteUrl(siteMetadata.image, baseUrl)

  if (normalizedPath === '/') {
    return {
      title: siteMetadata.title,
      description: siteMetadata.description,
      canonicalUrl,
      type: 'website',
      imageUrl: defaultImageUrl,
    }
  }

  if (normalizedPath === '/projects') {
    return {
      title: `Projects | ${profile.name}`,
      description: `${profile.name}의 프로젝트와 작업 경험을 확인해 보세요.`,
      canonicalUrl,
      type: 'website',
      imageUrl: defaultImageUrl,
    }
  }

  const projectId = projectIdFromPath(normalizedPath)
  const project = projectId ? getProjectById(projectId) : undefined

  if (project) {
    return {
      title: `${project.title} | ${profile.name}`,
      description: project.summary,
      canonicalUrl,
      type: 'article',
      imageUrl: absoluteUrl(project.thumbnail || siteMetadata.image, baseUrl),
    }
  }

  return {
    title: `페이지를 찾을 수 없음 | ${profile.name}`,
    description: siteMetadata.description,
    canonicalUrl,
    type: 'website',
    imageUrl: defaultImageUrl,
    robots: 'noindex, nofollow',
  }
}

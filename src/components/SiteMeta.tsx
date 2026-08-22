import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '@/data/profile'
import { getPageMetadata } from '@/lib/metadata'

function setMeta(attribute: 'name' | 'property', key: string, content?: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}='${key}']`)

  if (!content) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

/**
 * Keeps route-specific browser, search, and social metadata in sync.
 * Renders nothing — mount it once inside BrowserRouter.
 */
export function SiteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = getPageMetadata(pathname, window.location.origin)

    document.title = metadata.title
    setCanonicalLink(metadata.canonicalUrl)
    setMeta('name', 'description', metadata.description)
    setMeta('name', 'robots', metadata.robots)
    setMeta('property', 'og:type', metadata.type)
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:url', metadata.canonicalUrl)
    setMeta('property', 'og:site_name', profile.name)
    setMeta('property', 'og:image', metadata.imageUrl)
    setMeta('name', 'twitter:card', metadata.imageUrl ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', metadata.title)
    setMeta('name', 'twitter:description', metadata.description)
    setMeta('name', 'twitter:image', metadata.imageUrl)

    if (profile.avatar) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = profile.avatar
    }
  }, [pathname])

  return null
}

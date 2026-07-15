export interface ProjectLink {
  label: string
  url: string
  icon?: 'github' | 'external' | 'demo'
}

export interface Project {
  /** Used in the URL: /projects/:id — keep it short and URL-safe */
  id: string
  title: string
  /** One or two lines shown on the project card */
  summary: string
  /** Longer text shown on the project detail page. Line breaks are preserved. */
  description: string
  /** Path under /public or an external image URL, shown on the card and detail hero */
  thumbnail?: string
  /** YouTube video ID (the part after v= in the URL), embeds a responsive player */
  youtubeId?: string
  tags: string[]
  links?: ProjectLink[]
  /** ISO date string, e.g. '2026-05-01'. Used for sorting, newest first. */
  date: string
  /** Featured projects are highlighted on the home page */
  featured?: boolean
}

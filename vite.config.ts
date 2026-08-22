import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import path from 'node:path'
import { profile, siteMetadata } from './src/data/profile.ts'

function absoluteSiteUrl(value: string): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value, `${siteMetadata.url.replace(/\/+$/, '')}/`).toString()
  } catch {
    return undefined
  }
}

function siteMetadataPlugin(): Plugin {
  return {
    name: 'site-metadata',
    transformIndexHtml() {
      const imageUrl = absoluteSiteUrl(siteMetadata.image)
      const tags: HtmlTagDescriptor[] = [
        { tag: 'title', children: siteMetadata.title, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { name: 'description', content: siteMetadata.description },
          injectTo: 'head',
        },
        {
          tag: 'link',
          attrs: { rel: 'canonical', href: siteMetadata.url },
          injectTo: 'head',
        },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: siteMetadata.title },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: siteMetadata.description },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:url', content: siteMetadata.url },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: profile.name },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:title', content: siteMetadata.title },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:description', content: siteMetadata.description },
          injectTo: 'head',
        },
      ]

      if (imageUrl) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:image', content: imageUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: imageUrl }, injectTo: 'head' },
        )
      }

      return tags
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // If you deploy this as a project page (username.github.io/repo-name),
  // change base to '/repo-name/'. For a username.github.io user page, keep '/'.
  base: '/',
  plugins: [react(), vanillaExtractPlugin(), siteMetadataPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

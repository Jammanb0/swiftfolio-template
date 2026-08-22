import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PageError } from './ErrorBoundary'
import { PageLoading } from './PageLoading'

describe('page status feedback', () => {
  it('announces lazy-route loading as a busy status', () => {
    const html = renderToStaticMarkup(<PageLoading />)

    expect(html).toContain('role="status"')
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('aria-busy="true"')
    expect(html).toContain('콘텐츠를 불러오고 있습니다')
  })

  it('offers recovery actions when rendering fails', () => {
    const html = renderToStaticMarkup(<PageError />)

    expect(html).toContain('role="alert"')
    expect(html).toContain('다시 시도')
    expect(html).toContain('href="/"')
    expect(html).toContain('홈으로 이동')
  })
})

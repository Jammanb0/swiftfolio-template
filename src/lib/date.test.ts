import { describe, expect, it } from 'vitest'
import { formatPeriod, getYear } from '@/lib/date'

describe('date helpers', () => {
  it('formats an ongoing period', () => {
    expect(formatPeriod('2026-03-15')).toBe('2026.03 - 진행 중')
  })

  it('formats a completed period', () => {
    expect(formatPeriod('2025-11-10', '2026-01-10')).toBe('2025.11 - 2026.01')
  })

  it('reads the year without timezone conversion', () => {
    expect(getYear('2026-01-01')).toBe(2026)
  })
})

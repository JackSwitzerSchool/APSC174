import { formatDate } from '@/app/notes/utils'

describe('formatDate', () => {
  it('formats date without time', () => {
    const date = '2024-01-01'
    expect(formatDate(date)).toBe('January 1, 2024')
  })

  it('formats date with time when specified', () => {
    const date = '2024-01-01T12:00:00'
    expect(formatDate(date, true)).toMatch(/January 1, 2024, (12|0):00/)
  })
}) 
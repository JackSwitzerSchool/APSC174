import { parseFrontmatter } from '@/app/notes/utils'

// Export parseFrontmatter in utils.ts
export function parseFrontmatter(fileContent: string): {
  metadata: Metadata
  content: string
} {
  // ... existing implementation
}

describe('parseFrontmatter', () => {
  it('parses frontmatter correctly', () => {
    const content = `---
title: Test Title
publishedAt: 2024-01-01
summary: Test summary
---
Test content`

    const result = parseFrontmatter(content)
    expect(result).toEqual({
      metadata: {
        title: 'Test Title',
        publishedAt: '2024-01-01',
        summary: 'Test summary'
      },
      content: 'Test content'
    })
  })

  it('handles content without frontmatter', () => {
    const content = '# Test Title\nTest content'
    const result = parseFrontmatter(content)
    
    expect(result.metadata.title).toBe('Test Title')
    expect(result.content).toBe('# Test Title\nTest content')
  })
}) 
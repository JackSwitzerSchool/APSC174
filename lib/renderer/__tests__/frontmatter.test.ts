import { describe, it, expect } from 'vitest'
import { parseFrontmatter } from '../frontmatter'

describe('Frontmatter Parser', () => {
  it('parses simple key-value pairs', () => {
    const md = `---
title: Test Note
category: test
---

Content here`

    const result = parseFrontmatter(md)
    expect(result.data.title).toBe('Test Note')
    expect(result.data.category).toBe('test')
    expect(result.content).toBe('\nContent here')
  })

  it('parses numbers', () => {
    const md = `---
order: 5
weight: 20
---

Content`

    const result = parseFrontmatter(md)
    expect(result.data.order).toBe(5)
    expect(result.data.weight).toBe(20)
  })

  it('parses booleans', () => {
    const md = `---
isPublished: true
draft: false
---

Content`

    const result = parseFrontmatter(md)
    expect(result.data.isPublished).toBe(true)
    expect(result.data.draft).toBe(false)
  })

  it('parses arrays with - syntax', () => {
    const md = `---
tags:
  - first
  - second
  - third
---

Content`

    const result = parseFrontmatter(md)
    expect(result.data.tags).toEqual(['first', 'second', 'third'])
  })

  it('parses inline arrays with [] syntax', () => {
    const md = `---
relatedContent: ["one", "two", "three"]
---

Content`

    const result = parseFrontmatter(md)
    expect(result.data.relatedContent).toEqual(['one', 'two', 'three'])
  })

  it('parses quoted strings', () => {
    const md = `---
title: "Quoted Title"
summary: 'Single quoted'
---

Content`

    const result = parseFrontmatter(md)
    expect(result.data.title).toBe('Quoted Title')
    expect(result.data.summary).toBe('Single quoted')
  })

  it('handles no frontmatter', () => {
    const md = `# Just Markdown

No frontmatter here`

    const result = parseFrontmatter(md)
    expect(result.data).toEqual({})
    expect(result.content).toBe(md)
  })

  it('parses real-world frontmatter', () => {
    const md = `---
title: Sets
type: note
category: set-theory
order: 2
tags:
  - sets
  - fundamentals
publishedAt: '2025-01-11'
summary: "Introduction to set theory and basic set operations."
relatedContent: ["empty-set", "subset", "union"]
isPublished: true
---

## Definition
A set is an unordered collection.`

    const result = parseFrontmatter(md)
    expect(result.data.title).toBe('Sets')
    expect(result.data.type).toBe('note')
    expect(result.data.category).toBe('set-theory')
    expect(result.data.order).toBe(2)
    expect(result.data.tags).toEqual(['sets', 'fundamentals'])
    expect(result.data.publishedAt).toBe('2025-01-11')
    expect(result.data.summary).toBe('Introduction to set theory and basic set operations.')
    expect(result.data.relatedContent).toEqual(['empty-set', 'subset', 'union'])
    expect(result.data.isPublished).toBe(true)
    expect(result.content).toContain('## Definition')
  })
})

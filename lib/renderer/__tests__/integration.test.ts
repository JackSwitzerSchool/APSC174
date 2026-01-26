import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../index'

describe('Markdown Renderer Integration', () => {
  describe('renderMarkdown', () => {
    it('renders plain text', async () => {
      const result = await renderMarkdown('Hello world')
      expect(result).toContain('Hello world')
      expect(result).toContain('<p>')
    })

    it('renders headings', async () => {
      const result = await renderMarkdown('## Definition')
      expect(result).toContain('<h2')
      expect(result).toContain('Definition')
    })

    it('renders inline math', async () => {
      const result = await renderMarkdown('The value $x + y$ is important.')
      expect(result).toContain('katex')
      expect(result).toContain('The value')
      expect(result).toContain('is important')
    })

    it('renders display math', async () => {
      const result = await renderMarkdown(`
$$
\\frac{a}{b} = c
$$
`)
      expect(result).toContain('katex-display')
    })

    it('renders wiki-links', async () => {
      const result = await renderMarkdown('See [[notation|Notation]] for more.')
      expect(result).toContain('href="/notes/notation"')
      expect(result).toContain('Notation')
    })

    it('renders wiki-links without alias', async () => {
      const result = await renderMarkdown('Check out [[vector-space]].')
      expect(result).toContain('href="/notes/vector-space"')
    })

    it('renders external links with target blank', async () => {
      const result = await renderMarkdown('[Google](https://google.com)')
      expect(result).toContain('href="https://google.com"')
      expect(result).toContain('target="_blank"')
      expect(result).toContain('rel="noopener noreferrer"')
    })

    it('renders internal links normally', async () => {
      const result = await renderMarkdown('[Notes](/notes)')
      expect(result).toContain('href="/notes"')
      expect(result).not.toContain('target="_blank"')
    })

    it('renders PDF links with correct path', async () => {
      const result = await renderMarkdown('[Download](syllabus.pdf)')
      expect(result).toContain('/assets/pdf/syllabus.pdf')
    })

    it('renders images with correct path', async () => {
      const result = await renderMarkdown('![Diagram](diagram.png)')
      expect(result).toContain('src="/assets/images/diagram.png"')
      expect(result).toContain('loading="lazy"')
    })

    it('renders code blocks', async () => {
      const result = await renderMarkdown('```python\nprint("hello")\n```')
      expect(result).toContain('<pre')
      expect(result).toContain('<code')
      expect(result).toContain('print')
    })

    it('renders lists', async () => {
      const result = await renderMarkdown('- Item 1\n- Item 2')
      expect(result).toContain('<ul')
      expect(result).toContain('<li')
      expect(result).toContain('Item 1')
    })

    it('renders complex document with multiple features', async () => {
      const markdown = `
## Sets

A set $\\mathbb{X}$ is a collection of objects.

See [[empty-set|Empty Set]] for the simplest case.

$$
\\emptyset \\subset \\mathbb{N}
$$

For more info, visit [Wikipedia](https://wikipedia.org).
`
      const result = await renderMarkdown(markdown)

      // Check all features rendered
      expect(result).toContain('<h2')
      expect(result).toContain('katex')
      expect(result).toContain('href="/notes/empty-set"')
      expect(result).toContain('Empty Set')
      expect(result).toContain('katex-display')
      expect(result).toContain('href="https://wikipedia.org"')
      expect(result).toContain('target="_blank"')
    })
  })

  describe('frontmatter handling', () => {
    it('extracts frontmatter and renders content', async () => {
      const markdown = `---
title: Sets
category: set-theory
---

## Definition

A set is a collection.
`
      const result = await renderMarkdown(markdown)

      // Frontmatter should not appear in output
      expect(result).not.toContain('title: Sets')
      expect(result).not.toContain('---')

      // Content should be rendered
      expect(result).toContain('Definition')
      expect(result).toContain('collection')
    })
  })
})

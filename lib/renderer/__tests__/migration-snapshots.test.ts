import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../index'

/**
 * Migration Snapshot Tests
 *
 * These tests capture the current output of the unified/remark/rehype pipeline.
 * When migrating to marked, all these tests must produce identical output.
 */

describe('Migration Snapshots', () => {
  describe('Basic Markdown', () => {
    it('renders headings h1-h6', async () => {
      const md = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`
      const html = await renderMarkdown(md)
      expect(html).toContain('<h1>Heading 1</h1>')
      expect(html).toContain('<h2>Heading 2</h2>')
      expect(html).toContain('<h3>Heading 3</h3>')
      expect(html).toContain('<h4>Heading 4</h4>')
      expect(html).toContain('<h5>Heading 5</h5>')
      expect(html).toContain('<h6>Heading 6</h6>')
    })

    it('renders paragraphs', async () => {
      const md = `First paragraph.

Second paragraph.`
      const html = await renderMarkdown(md)
      expect(html).toContain('<p>First paragraph.</p>')
      expect(html).toContain('<p>Second paragraph.</p>')
    })

    it('renders bold and italic', async () => {
      const md = `**bold** and *italic* and ***bold italic***`
      const html = await renderMarkdown(md)
      expect(html).toContain('<strong>bold</strong>')
      expect(html).toContain('<em>italic</em>')
      expect(html).toMatch(/<(strong|em)>.*<(strong|em)>bold italic<\/(strong|em)>.*<\/(strong|em)>/)
    })

    it('renders unordered lists', async () => {
      const md = `- Item 1
- Item 2
  - Nested item
- Item 3`
      const html = await renderMarkdown(md)
      expect(html).toContain('<ul>')
      expect(html).toContain('<li>Item 1</li>')
      expect(html).toContain('<li>Item 2')
      expect(html).toContain('<li>Nested item</li>')
    })

    it('renders ordered lists', async () => {
      const md = `1. First
2. Second
3. Third`
      const html = await renderMarkdown(md)
      expect(html).toContain('<ol>')
      expect(html).toContain('<li>First</li>')
      expect(html).toContain('<li>Second</li>')
    })

    it('renders inline code', async () => {
      const md = 'Use `const x = 5` for variables.'
      const html = await renderMarkdown(md)
      expect(html).toContain('<code>const x = 5</code>')
    })

    it('renders code blocks', async () => {
      const md = '```javascript\nconst x = 5;\n```'
      const html = await renderMarkdown(md)
      expect(html).toContain('<pre>')
      expect(html).toContain('<code')
      expect(html).toContain('const x = 5;')
    })

    it('renders blockquotes', async () => {
      const md = `> This is a quote
> with multiple lines`
      const html = await renderMarkdown(md)
      expect(html).toContain('<blockquote>')
      expect(html).toContain('This is a quote')
    })

    it('renders horizontal rules', async () => {
      const md = `Above

---

Below`
      const html = await renderMarkdown(md)
      expect(html).toContain('<hr')
    })

    it('renders standard links', async () => {
      const md = '[Google](https://google.com)'
      const html = await renderMarkdown(md)
      expect(html).toContain('<a href="https://google.com"')
      expect(html).toContain('>Google</a>')
    })

    it('renders standard images', async () => {
      const md = '![Alt text](image.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('<img')
      expect(html).toContain('alt="Alt text"')
    })
  })

  describe('Math Rendering', () => {
    it('renders inline math', async () => {
      const md = 'The equation $x + y = z$ is simple.'
      const html = await renderMarkdown(md)
      expect(html).toContain('class="math-inline-rendered"')
      expect(html).toContain('class="katex"')
    })

    it('renders display math', async () => {
      const md = `Here is a formula:

$$
\\frac{a}{b} = c
$$

And more text.`
      const html = await renderMarkdown(md)
      expect(html).toContain('class="math-display-rendered"')
      expect(html).toContain('class="katex-display"')
    })

    it('renders indented display math', async () => {
      const md = `Some text

    $$
    x = y + z
    $$

More text`
      const html = await renderMarkdown(md)
      expect(html).toContain('class="math-display-rendered"')
    })

    it('renders multiple math blocks', async () => {
      const md = `Inline $a$ and $b$ and display:

$$c = d$$

And more $e$.`
      const html = await renderMarkdown(md)
      // Count katex instances
      const inlineCount = (html.match(/math-inline-rendered/g) || []).length
      const displayCount = (html.match(/math-display-rendered/g) || []).length
      expect(inlineCount).toBe(3)
      expect(displayCount).toBe(1)
    })

    it('handles math with special characters', async () => {
      const md = '$\\alpha + \\beta = \\gamma$'
      const html = await renderMarkdown(md)
      expect(html).toContain('class="katex"')
    })

    it('handles invalid LaTeX gracefully', async () => {
      const md = '$\\invalid{$'
      const html = await renderMarkdown(md)
      // Should not throw, should contain error class or escaped content
      expect(html).toBeDefined()
    })

    it('handles escaped dollar signs', async () => {
      const md = 'Price is \\$100 dollars.'
      const html = await renderMarkdown(md)
      // Should not be treated as math
      expect(html).not.toContain('class="katex"')
    })
  })

  describe('Wiki-Links', () => {
    it('renders basic wiki-link', async () => {
      const md = 'See [[sets]] for more.'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('>sets</a>')
    })

    it('renders wiki-link with alias', async () => {
      const md = 'See [[sets|Set Theory]] for more.'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('>Set Theory</a>')
    })

    it('normalizes wiki-link slugs', async () => {
      const md = '[[Empty Set]] and [[VECTORS]] and [[Linear-Dependence]]'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/empty-set"')
      expect(html).toContain('href="/notes/vectors"')
      expect(html).toContain('href="/notes/linear-dependence"')
    })

    it('renders multiple wiki-links in one paragraph', async () => {
      const md = 'See [[sets]], [[union]], and [[intersection]].'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('href="/notes/union"')
      expect(html).toContain('href="/notes/intersection"')
    })

    it('renders wiki-link at start and end of line', async () => {
      const md = '[[sets]] is important and so is [[union]]'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('href="/notes/union"')
    })

    it('renders wiki-link adjacent to punctuation', async () => {
      const md = 'Check [[sets]], [[union]]. Also [[intersection]]!'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('</a>,') // comma after closing tag
      expect(html).toContain('</a>.') // period after closing tag
      expect(html).toContain('</a>!') // exclamation after closing tag
    })
  })

  describe('Link Processing', () => {
    it('adds target blank to external http links', async () => {
      const md = '[Example](http://example.com)'
      const html = await renderMarkdown(md)
      expect(html).toContain('target="_blank"')
      expect(html).toContain('rel="noopener noreferrer"')
    })

    it('adds target blank to external https links', async () => {
      const md = '[Example](https://example.com)'
      const html = await renderMarkdown(md)
      expect(html).toContain('target="_blank"')
      expect(html).toContain('rel="noopener noreferrer"')
    })

    it('does not add target blank to internal links', async () => {
      const md = '[Notes](/notes)'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes"')
      expect(html).not.toContain('target="_blank"')
    })

    it('processes relative PDF links', async () => {
      const md = '[Download](syllabus.pdf)'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/assets/pdf/syllabus.pdf"')
      expect(html).toContain('target="_blank"')
    })

    it('processes absolute PDF links', async () => {
      const md = '[Download](/docs/file.pdf)'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/docs/file.pdf"')
      expect(html).toContain('target="_blank"')
    })

    it('keeps external PDF URLs unchanged', async () => {
      const md = '[Download](https://example.com/doc.pdf)'
      const html = await renderMarkdown(md)
      expect(html).toContain('href="https://example.com/doc.pdf"')
      expect(html).toContain('target="_blank"')
    })
  })

  describe('Image Processing', () => {
    it('resolves relative image paths', async () => {
      const md = '![Diagram](diagram.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('src="/assets/images/diagram.png"')
    })

    it('keeps absolute image paths', async () => {
      const md = '![Diagram](/images/diagram.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('src="/images/diagram.png"')
    })

    it('keeps external image URLs', async () => {
      const md = '![Diagram](https://example.com/image.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('src="https://example.com/image.png"')
    })

    it('adds lazy loading to images', async () => {
      const md = '![Test](test.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('loading="lazy"')
    })

    it('adds CSS classes to images', async () => {
      const md = '![Test](test.png)'
      const html = await renderMarkdown(md)
      expect(html).toContain('class=')
      expect(html).toMatch(/max-w-full|h-auto|rounded/)
    })
  })

  describe('Complex Documents', () => {
    it('renders document with all features', async () => {
      const md = `# Title

This has **bold** and *italic*.

## Math Section

Inline math $x + y$ and display:

$$
\\frac{a}{b}
$$

## Links

See [[sets|Set Theory]] and [Google](https://google.com).

![Image](test.png)

- List item 1
- List item 2`

      const html = await renderMarkdown(md)

      // Check all features rendered
      expect(html).toContain('<h1>Title</h1>')
      expect(html).toContain('<strong>bold</strong>')
      expect(html).toContain('<em>italic</em>')
      expect(html).toContain('class="katex"')
      expect(html).toContain('class="katex-display"')
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('href="https://google.com"')
      expect(html).toContain('target="_blank"')
      expect(html).toContain('<img')
      expect(html).toContain('<ul>')
    })

    it('renders math adjacent to wiki-links', async () => {
      const md = `The [[sets|set]] has cardinality $|A| = n$.`
      const html = await renderMarkdown(md)
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('class="katex"')
    })

    it('renders real content structure', async () => {
      const md = `## Definition

A [[vector-space|Vector Space]] is a [[sets|Set]] $\\mathbb{V}$ with two operations.

### Addition

The addition map: $+:\\mathbb{V} \\times \\mathbb{V} \\rightarrow \\mathbb{V}$`

      const html = await renderMarkdown(md)
      expect(html).toContain('<h2>Definition</h2>')
      expect(html).toContain('href="/notes/vector-space"')
      expect(html).toContain('href="/notes/sets"')
      expect(html).toContain('class="katex"')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content', async () => {
      const html = await renderMarkdown('')
      expect(html).toBe('')
    })

    it('handles content with only whitespace', async () => {
      const html = await renderMarkdown('   \n\n   ')
      expect(html.trim()).toBe('')
    })

    it('handles raw HTML in markdown', async () => {
      const md = '<div class="custom">Custom HTML</div>'
      const html = await renderMarkdown(md)
      expect(html).toContain('<div class="custom">Custom HTML</div>')
    })

    it('handles nested formatting', async () => {
      const md = '***bold and italic***'
      const html = await renderMarkdown(md)
      expect(html).toContain('<strong>')
      expect(html).toContain('<em>')
    })

    it('handles code blocks with special characters', async () => {
      const md = '```\nconst x = 5;\nconst y = 10;\n```'
      const html = await renderMarkdown(md)
      expect(html).toContain('<pre>')
      expect(html).toContain('<code>')
      expect(html).toContain('const x = 5;')
    })
  })
})

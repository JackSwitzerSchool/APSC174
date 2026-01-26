import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import matter from 'gray-matter'
import { visit } from 'unist-util-visit'
import type { Root, Element, Text } from 'hast'
import type { Root as MdastRoot } from 'mdast'
import { renderInlineMath, renderDisplayMath } from './math'
import { processWikiLink, processExternalLink, processPdfLink, processImagePath } from './links'

// Wiki-link regex: [[slug]] or [[slug|text]]
const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

/**
 * Custom remark plugin to transform wiki-links before going to HTML
 */
function remarkWikiLinks() {
  return (tree: MdastRoot) => {
    visit(tree, 'text', (node: any, index, parent) => {
      if (!parent || index === undefined) return

      const text = node.value as string
      const matches = Array.from(text.matchAll(wikiLinkRegex))

      if (matches.length === 0) return

      const children: any[] = []
      let lastIndex = 0

      for (const match of matches) {
        const [fullMatch, slug, alias] = match
        const matchIndex = match.index!

        // Add text before the match
        if (matchIndex > lastIndex) {
          children.push({
            type: 'text',
            value: text.slice(lastIndex, matchIndex),
          })
        }

        // Add the wiki-link as a proper link
        const { href, text: linkText } = processWikiLink(slug, alias || null)
        children.push({
          type: 'link',
          url: href,
          children: [{ type: 'text', value: linkText }],
        })

        lastIndex = matchIndex + fullMatch.length
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        children.push({
          type: 'text',
          value: text.slice(lastIndex),
        })
      }

      // Replace the text node with the new children
      parent.children.splice(index, 1, ...children)
    })
  }
}

/**
 * Rehype plugin to render math nodes to KaTeX HTML
 */
function rehypeKatexStatic() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      // Handle inline math
      if (
        node.tagName === 'span' &&
        node.properties?.className &&
        (node.properties.className as string[]).includes('math-inline')
      ) {
        const textNode = node.children[0] as Text
        if (textNode?.type === 'text') {
          const html = renderInlineMath(textNode.value)
          node.tagName = 'span'
          node.properties = {}
          node.children = [{ type: 'raw', value: html } as any]
        }
      }

      // Handle display math
      if (
        node.tagName === 'div' &&
        node.properties?.className &&
        (node.properties.className as string[]).includes('math-display')
      ) {
        const textNode = node.children[0] as Text
        if (textNode?.type === 'text') {
          const html = renderDisplayMath(textNode.value)
          node.tagName = 'div'
          node.properties = { className: ['math-display-wrapper'] }
          node.children = [{ type: 'raw', value: html } as any]
        }
      }
    })
  }
}

/**
 * Rehype plugin to process links (external, PDF, internal)
 */
function rehypeLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string

        // Check if PDF
        if (href.endsWith('.pdf')) {
          node.properties.href = processPdfLink(href)
          node.properties.target = '_blank'
          node.properties.rel = 'noopener noreferrer'
          return
        }

        // Check if external
        const { isExternal } = processExternalLink(href)
        if (isExternal) {
          node.properties.target = '_blank'
          node.properties.rel = 'noopener noreferrer'
        }
      }
    })
  }
}

/**
 * Rehype plugin to process images
 */
function rehypeImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src as string
        node.properties.src = processImagePath(src)
        node.properties.loading = 'lazy'
        node.properties.className = ['max-w-full', 'h-auto', 'rounded-lg', 'mx-auto', 'my-4']
      }
    })
  }
}

/**
 * Main render function - converts markdown to static HTML
 * All math is pre-rendered to HTML at build time
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  // Extract frontmatter if present
  const { content } = matter(markdown)

  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkWikiLinks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatexStatic)
    .use(rehypeLinks)
    .use(rehypeImages)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const result = await processor.process(content)
  return String(result)
}

/**
 * Render markdown and extract frontmatter
 */
export async function renderMarkdownWithMeta(markdown: string): Promise<{
  html: string
  frontmatter: Record<string, any>
}> {
  const { content, data } = matter(markdown)

  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkWikiLinks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatexStatic)
    .use(rehypeLinks)
    .use(rehypeImages)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const result = await processor.process(content)
  return {
    html: String(result),
    frontmatter: data,
  }
}

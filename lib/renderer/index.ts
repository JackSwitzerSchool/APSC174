import { marked } from 'marked'
import { renderInlineMath, renderDisplayMath } from './math'
import { processWikiLink, processExternalLink, processPdfLink, processImagePath } from './links'
import { parseFrontmatter } from './frontmatter'

// Configure marked
marked.setOptions({
  breaks: false,
})

// Wiki-link regex: [[slug]] or [[slug|text]]
const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

/**
 * Pre-process markdown to render math BEFORE markdown parsing
 * This handles indented display math that other parsers fail on
 */
function preprocessMath(content: string): string {
  // First, handle display math ($$...$$) - including multiline and indented
  const displayMathRegex = /\$\$([\s\S]*?)\$\$/g

  content = content.replace(displayMathRegex, (_, latex: string) => {
    const trimmedLatex = latex.trim()
    const html = renderDisplayMath(trimmedLatex)
    // Wrap in a div with blank lines before/after
    return `\n\n<div class="math-display-rendered">${html}</div>\n\n`
  })

  // Then handle inline math ($...$) - but not $$
  const inlineMathRegex = /(?<!\$)\$(?!\$)((?:[^$\\]|\\.)+?)\$(?!\$)/g

  content = content.replace(inlineMathRegex, (_, latex: string) => {
    const html = renderInlineMath(latex.trim())
    return `<span class="math-inline-rendered">${html}</span>`
  })

  return content
}

/**
 * Pre-process wiki-links to standard markdown links BEFORE parsing
 * Converts [[slug|text]] to [text](/notes/slug)
 */
function preprocessWikiLinks(content: string): string {
  return content.replace(wikiLinkRegex, (_, slug: string, alias?: string) => {
    const { href, text } = processWikiLink(slug, alias || null)
    return `[${text}](${href})`
  })
}

/**
 * Post-process HTML to add attributes to links and images
 */
function postprocessHTML(html: string): string {
  // Process links: add target="_blank" for external and PDF links
  html = html.replace(/<a\s+href="([^"]+)"([^>]*)>/g, (match, href: string, rest: string) => {
    // Skip if already has target
    if (rest.includes('target=')) return match

    // Check if PDF
    if (href.endsWith('.pdf')) {
      const resolvedHref = processPdfLink(href)
      return `<a href="${resolvedHref}" target="_blank" rel="noopener noreferrer"${rest}>`
    }

    // Check if external
    const { isExternal } = processExternalLink(href)
    if (isExternal) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${rest}>`
    }

    return match
  })

  // Process images: resolve paths and add attributes
  html = html.replace(/<img\s+([^>]*)>/g, (match, attrs: string) => {
    // Extract src
    const srcMatch = attrs.match(/src="([^"]+)"/)
    if (!srcMatch) return match

    const src = srcMatch[1]
    const resolvedSrc = processImagePath(src)

    // Build new attributes
    let newAttrs = attrs.replace(/src="[^"]+"/, `src="${resolvedSrc}"`)

    // Add loading="lazy" if not present
    if (!newAttrs.includes('loading=')) {
      newAttrs += ' loading="lazy"'
    }

    // Add classes if not present
    if (!newAttrs.includes('class=')) {
      newAttrs += ' class="max-w-full h-auto rounded-lg mx-auto my-4"'
    }

    return `<img ${newAttrs}>`
  })

  return html
}

/**
 * Main render function - converts markdown to static HTML
 * All math is pre-rendered to HTML at build time
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  // Extract frontmatter if present
  const { content } = parseFrontmatter(markdown)

  // Pre-render math before markdown parsing
  const withMath = preprocessMath(content)

  // Convert wiki-links to standard markdown links
  const withLinks = preprocessWikiLinks(withMath)

  // Parse markdown to HTML
  const html = marked.parse(withLinks) as string

  // Post-process HTML for links and images
  return postprocessHTML(html)
}

/**
 * Render markdown and extract frontmatter
 */
export async function renderMarkdownWithMeta(markdown: string): Promise<{
  html: string
  frontmatter: Record<string, unknown>
}> {
  const { content, data } = parseFrontmatter(markdown)

  // Pre-render math before markdown parsing
  const withMath = preprocessMath(content)

  // Convert wiki-links to standard markdown links
  const withLinks = preprocessWikiLinks(withMath)

  // Parse markdown to HTML
  const html = marked.parse(withLinks) as string

  // Post-process HTML for links and images
  return {
    html: postprocessHTML(html),
    frontmatter: data,
  }
}

/**
 * Process wiki-style links [[slug|Text]]
 */
export function processWikiLink(slug: string, alias: string | null): { href: string; text: string } {
  // Normalize slug: lowercase, replace spaces with hyphens
  const normalizedSlug = slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')

  return {
    href: `/notes/${normalizedSlug}`,
    text: alias || slug,
  }
}

/**
 * Check if a link is external
 */
export function processExternalLink(href: string): { href: string; isExternal: boolean } {
  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  return { href, isExternal }
}

/**
 * Process PDF links - resolve relative paths to /assets/pdf/
 */
export function processPdfLink(href: string): string {
  // External URLs - keep as-is
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  // Already absolute path - keep as-is
  if (href.startsWith('/')) {
    return href
  }

  // Relative path - resolve to /assets/pdf/
  return `/assets/pdf/${href}`
}

/**
 * Process image paths - resolve relative paths to /assets/images/
 */
export function processImagePath(src: string): string {
  // External URLs - keep as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  // Already absolute path - keep as-is
  if (src.startsWith('/')) {
    return src
  }

  // Relative path - resolve to /assets/images/
  return `/assets/images/${src}`
}

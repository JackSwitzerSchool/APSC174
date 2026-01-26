import katex from 'katex'

/**
 * Clean KaTeX output to fix rendering issues
 * - Removes newlines from SVG path data which can cause display problems
 */
function cleanKatexOutput(html: string): string {
  // Remove newlines inside SVG path d attributes
  return html.replace(/<path d="([^"]+)"/g, (match, pathData) => {
    const cleanedPath = pathData.replace(/\n/g, ' ')
    return `<path d="${cleanedPath}"`
  })
}

/**
 * Render inline math (no display mode)
 * Returns pure HTML string - no JS needed on client
 */
export function renderInlineMath(latex: string): string {
  try {
    const html = katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      strict: false,
      trust: true,
    })
    return cleanKatexOutput(html)
  } catch {
    // Return the raw latex wrapped in a span if rendering fails
    return `<span class="katex-error">${escapeHtml(latex)}</span>`
  }
}

/**
 * Render display math (centered, larger)
 * Returns pure HTML string - no JS needed on client
 */
export function renderDisplayMath(latex: string): string {
  try {
    const html = katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false,
      strict: false,
      trust: true,
    })
    return cleanKatexOutput(html)
  } catch {
    return `<div class="katex-error katex-display">${escapeHtml(latex)}</div>`
  }
}

/**
 * Render math with auto-detection
 * @param latex - The LaTeX string to render
 * @param isDisplay - Whether this is display math ($$...$$) vs inline ($...$)
 */
export function renderMath(latex: string, isDisplay: boolean): string {
  return isDisplay ? renderDisplayMath(latex) : renderInlineMath(latex)
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

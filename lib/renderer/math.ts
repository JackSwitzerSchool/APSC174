import katex from 'katex'

/**
 * Render inline math (no display mode)
 * Returns pure HTML string - no JS needed on client
 */
export function renderInlineMath(latex: string): string {
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      strict: false,
      trust: true,
    })
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
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false,
      strict: false,
      trust: true,
    })
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

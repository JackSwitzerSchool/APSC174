import { describe, it, expect } from 'vitest'
import { renderMath, renderInlineMath, renderDisplayMath } from '../math'

describe('Math Rendering', () => {
  describe('renderInlineMath', () => {
    it('renders simple inline math', () => {
      const result = renderInlineMath('x + y')
      expect(result).toContain('katex')
      expect(result).toContain('x')
      expect(result).toContain('+')
      expect(result).toContain('y')
    })

    it('renders fractions', () => {
      const result = renderInlineMath('\\frac{a}{b}')
      expect(result).toContain('katex')
      expect(result).toContain('frac')
    })

    it('renders Greek letters', () => {
      const result = renderInlineMath('\\alpha + \\beta')
      expect(result).toContain('α')
      expect(result).toContain('β')
    })

    it('renders set notation', () => {
      const result = renderInlineMath('a \\in \\mathbb{X}')
      expect(result).toContain('katex')
      expect(result).toContain('∈')
    })

    it('handles invalid math gracefully', () => {
      const result = renderInlineMath('\\invalid{command}')
      // Should not throw, should return something
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })
  })

  describe('renderDisplayMath', () => {
    it('renders display math with displayMode', () => {
      const result = renderDisplayMath('\\sum_{i=1}^{n} x_i')
      expect(result).toContain('katex')
      expect(result).toContain('katex-display')
    })

    it('renders complex equations', () => {
      const result = renderDisplayMath('\\emptyset \\subset \\mathbb{N} \\subset \\mathbb{Z}')
      expect(result).toContain('katex')
      expect(result).toContain('∅')
    })

    it('renders matrices', () => {
      const result = renderDisplayMath('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}')
      expect(result).toContain('katex')
    })
  })

  describe('renderMath (auto-detect)', () => {
    it('detects inline math with single $', () => {
      const result = renderMath('$x + y$', false)
      expect(result).toContain('katex')
      expect(result).not.toContain('katex-display')
    })

    it('detects display math with $$', () => {
      const result = renderMath('x + y', true)
      expect(result).toContain('katex-display')
    })
  })
})

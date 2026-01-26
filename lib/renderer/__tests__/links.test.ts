import { describe, it, expect } from 'vitest'
import { processWikiLink, processExternalLink, processPdfLink, processImagePath } from '../links'

describe('Link Processing', () => {
  describe('processWikiLink', () => {
    it('converts wiki-link with alias', () => {
      const result = processWikiLink('notation', 'Notation')
      expect(result.href).toBe('/notes/notation')
      expect(result.text).toBe('Notation')
    })

    it('converts wiki-link without alias', () => {
      const result = processWikiLink('vector-space', null)
      expect(result.href).toBe('/notes/vector-space')
      expect(result.text).toBe('vector-space')
    })

    it('handles uppercase slugs', () => {
      const result = processWikiLink('Sets', 'Sets')
      expect(result.href).toBe('/notes/sets')
    })

    it('handles spaces in slugs', () => {
      const result = processWikiLink('empty set', 'Empty Set')
      expect(result.href).toBe('/notes/empty-set')
    })
  })

  describe('processExternalLink', () => {
    it('identifies external links', () => {
      const result = processExternalLink('https://example.com')
      expect(result.isExternal).toBe(true)
      expect(result.href).toBe('https://example.com')
    })

    it('identifies internal links', () => {
      const result = processExternalLink('/notes/sets')
      expect(result.isExternal).toBe(false)
    })

    it('handles http links', () => {
      const result = processExternalLink('http://example.com')
      expect(result.isExternal).toBe(true)
    })
  })

  describe('processPdfLink', () => {
    it('resolves relative PDF paths', () => {
      const result = processPdfLink('document.pdf')
      expect(result).toBe('/assets/pdf/document.pdf')
    })

    it('preserves absolute PDF paths', () => {
      const result = processPdfLink('/assets/pdf/doc.pdf')
      expect(result).toBe('/assets/pdf/doc.pdf')
    })

    it('preserves external PDF URLs', () => {
      const result = processPdfLink('https://example.com/doc.pdf')
      expect(result).toBe('https://example.com/doc.pdf')
    })
  })

  describe('processImagePath', () => {
    it('resolves relative image paths', () => {
      const result = processImagePath('diagram.png')
      expect(result).toBe('/assets/images/diagram.png')
    })

    it('preserves absolute image paths', () => {
      const result = processImagePath('/assets/images/photo.jpg')
      expect(result).toBe('/assets/images/photo.jpg')
    })

    it('preserves external image URLs', () => {
      const result = processImagePath('https://example.com/img.png')
      expect(result).toBe('https://example.com/img.png')
    })
  })
})

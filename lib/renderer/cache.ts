/**
 * Runtime cache reader for pre-built content
 * At runtime, this just reads from the JSON cache (no serialization)
 */

import fs from 'fs'
import path from 'path'

interface CompiledNote {
  slug: string
  html: string
  frontmatter: {
    title: string
    type?: string
    category?: string
    order?: number
    tags?: string[]
    publishedAt?: string
    summary?: string
    relatedContent?: string[]
    isPublished?: boolean
    displayInNotes?: boolean
  }
}

interface ContentCache {
  buildTime: string
  notes: Record<string, CompiledNote>
}

// Cache the loaded content in memory
let cachedContent: ContentCache | null = null

function loadCache(): ContentCache {
  if (cachedContent) return cachedContent

  const cachePath = path.join(process.cwd(), '.content-cache.json')

  if (!fs.existsSync(cachePath)) {
    throw new Error(
      'Content cache not found. Run `npm run prebuild` first.'
    )
  }

  const raw = fs.readFileSync(cachePath, 'utf-8')
  cachedContent = JSON.parse(raw) as ContentCache
  return cachedContent
}

/**
 * Get a single note by slug
 */
export function getCachedNote(slug: string): CompiledNote | null {
  const cache = loadCache()
  const normalizedSlug = slug.toLowerCase()
  return cache.notes[normalizedSlug] || null
}

/**
 * Get all notes (for listing pages)
 */
export function getAllCachedNotes(): CompiledNote[] {
  const cache = loadCache()
  return Object.values(cache.notes)
}

/**
 * Get all note slugs (for generateStaticParams)
 */
export function getAllNoteSlugs(): string[] {
  const cache = loadCache()
  return Object.keys(cache.notes)
}

/**
 * Filter notes by criteria
 */
export function filterCachedNotes(options: {
  category?: string
  tags?: string[]
  isPublished?: boolean
  displayInNotes?: boolean
}): CompiledNote[] {
  const notes = getAllCachedNotes()

  return notes.filter(note => {
    const fm = note.frontmatter

    if (options.category && fm.category !== options.category) return false
    if (options.isPublished !== undefined && fm.isPublished !== options.isPublished) return false
    if (options.displayInNotes !== undefined && fm.displayInNotes !== options.displayInNotes) return false
    if (options.tags && options.tags.length > 0) {
      const noteTags = fm.tags || []
      if (!options.tags.some(tag => noteTags.includes(tag))) return false
    }

    return true
  })
}

/**
 * Get cache build time
 */
export function getCacheBuildTime(): string {
  const cache = loadCache()
  return cache.buildTime
}

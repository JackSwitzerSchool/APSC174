import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import type { Plugin } from 'unified'
import {
  Content,
  ContentFilter,
  ContentList,
  ContentMeta,
  ContentNotFoundError,
  InvalidContentError
} from './content-types'

// Constants
const CONTENT_DIR = path.join(process.cwd(), 'content')
const CACHE_FILE = path.join(process.cwd(), '.next/cache/content-cache.json')
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

// MDX configuration
const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [
      remarkMath,
      [remarkWikiLink, {
        pageResolver: (name: string) => {
          const cleanName = name.replace(/^!/, '').split('|')[0].trim()
          return [cleanName.toLowerCase().replace(/[^a-z0-9-]/g, '-')]
        },
        hrefTemplate: (permalink: string) => {
          if (permalink.startsWith('./')) return permalink
          if (permalink.startsWith('http')) return permalink
          if (permalink.startsWith('youtube:')) return permalink
          return `/notes/${permalink}`
        },
        aliasDivider: '|'
      }]
    ] as Array<[Plugin, any] | Plugin>,
    rehypePlugins: [rehypeKatex],
    development: process.env.NODE_ENV === 'development'
  }
}

// Cache management
let contentCache: ContentList | null = null
let cacheTimestamp: number = 0

async function loadCache(): Promise<ContentList | null> {
  try {
    const cache = await fs.readFile(CACHE_FILE, 'utf8')
    const { data, timestamp } = JSON.parse(cache)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  } catch (error) {
    console.warn('Cache load failed:', error)
  }
  return null
}

async function saveCache(data: ContentList) {
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
    await fs.writeFile(
      CACHE_FILE,
      JSON.stringify({ data, timestamp: Date.now() })
    )
  } catch (error) {
    console.error('Cache save failed:', error)
  }
}

// Content loading
async function loadContent(filePath: string): Promise<Content> {
  const source = await fs.readFile(filePath, 'utf8')
  const { data: meta, content } = matter(source)
  
  // Validate required metadata
  if (!meta.title || !meta.type || !meta.publishedAt) {
    throw new InvalidContentError(filePath, 'Missing required metadata')
  }

  // Generate slug if not provided
  if (!meta.slug) {
    meta.slug = path.basename(filePath, path.extname(filePath))
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
  }

  // Set defaults for optional fields
  meta.displayInNotes = meta.displayInNotes ?? (meta.type === 'note')
  
  const mdxContent = await serialize(content.trim(), mdxOptions)
  
  return {
    meta: meta as ContentMeta,
    content: mdxContent,
    originalPath: filePath
  }
}

// Public API
export async function getAllContent(refresh = false): Promise<ContentList> {
  // Return cached content if available and not forced refresh
  if (!refresh && contentCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return contentCache
  }

  // Try loading from file cache
  if (!refresh) {
    const cached = await loadCache()
    if (cached) {
      contentCache = cached
      cacheTimestamp = Date.now()
      return cached
    }
  }

  // Initialize empty content list
  const content: ContentList = {
    notes: [],
    pages: []
  }

  // Load all content
  try {
    const loadDirectory = async (dir: string) => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        
        if (entry.isDirectory()) {
          await loadDirectory(fullPath)
        } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
          try {
            const item = await loadContent(fullPath)
            switch (item.meta.type) {
              case 'note':
                content.notes.push(item)
                break
              case 'page':
                content.pages.push(item)
                break
            }
          } catch (error) {
            console.error(`Error loading ${fullPath}:`, error)
          }
        }
      }
    }

    await loadDirectory(CONTENT_DIR)

    // Sort content by date and order
    const sortContent = (items: Content[]) => {
      return items.sort((a, b) => {
        if (a.meta.order && b.meta.order) return a.meta.order - b.meta.order
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
      })
    }

    content.notes = sortContent(content.notes)
    content.pages = sortContent(content.pages)

    // Update cache
    contentCache = content
    cacheTimestamp = Date.now()
    await saveCache(content)

    return content
  } catch (error) {
    console.error('Error loading content:', error)
    throw error
  }
}

export async function getContentBySlug(slug: string): Promise<Content> {
  const content = await getAllContent()
  const allContent = [...content.notes, ...content.pages]
  const found = allContent.find(item => item.meta.slug === slug)
  
  if (!found) {
    throw new ContentNotFoundError(slug)
  }
  
  return found
}

export async function filterContent(filter: ContentFilter): Promise<Content[]> {
  const content = await getAllContent()
  const allContent = [...content.notes, ...content.pages]
  
  return allContent.filter(item => {
    if (filter.type && item.meta.type !== filter.type) return false
    if (filter.tags && !filter.tags.some(tag => item.meta.tags?.includes(tag))) return false
    if (filter.category && item.meta.category !== filter.category) return false
    if (filter.displayInNotes !== undefined && item.meta.displayInNotes !== filter.displayInNotes) return false
    return true
  })
} 
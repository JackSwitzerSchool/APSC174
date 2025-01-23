import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import matter from 'gray-matter'
import path from 'path'
import { promises as fs } from 'fs'

const ALLOWED_CATEGORIES = ['notes', 'tutorials', 'base', 'internships']

const CACHE_FILE = path.join(process.cwd(), '.next/cache/mdx-cache.json')

// Add cache invalidation time
const CACHE_INVALIDATION_TIME = 1000 * 60 * 60 // 1 hour

// Memoize MDX processing results
const mdxProcessingCache = new Map<string, MDXRemoteSerializeResult>()

// Move wikiLinkConfig before it's used in mdxOptions
const wikiLinkConfig = {
  pageResolver: (name: string) => {
    const cleanName = name.replace(/^!/, '').split('|')[0].trim()
    const slug = cleanName.toLowerCase().replace(/\s+/g, '-')
    console.log(`WikiLink pageResolver: ${name} -> ${slug}`)
    return [slug]
  },
  hrefTemplate: (permalink: string) => {
    const href = `/notes/${permalink.toLowerCase()}`
    console.log(`WikiLink hrefTemplate: ${permalink} -> ${href}`)
    return href
  },
  aliasDivider: '|',
  wikiLinkClassName: 'wiki-link',
  validate: (permalink: string) => {
    const posts = getBlogPosts()
    console.log(`WikiLink validate: checking ${permalink}`)
    return true
  }
}

// Optimize MDX serialization by reusing remark/rehype plugins
const mdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [
      remarkMath,
      [(options: any) => {
        const plugin = remarkWikiLink(options)
        return (tree: any) => {
          console.log('Processing wiki links in tree:', tree)
          return plugin(tree)
        }
      }, wikiLinkConfig]
    ],
    rehypePlugins: [rehypeKatex],
    development: process.env.NODE_ENV === 'development'
  }
}

async function serializeMDX(content: string, filePath: string): Promise<MDXRemoteSerializeResult> {
  const cacheKey = `${filePath}:${content}`
  
  if (mdxProcessingCache.has(cacheKey)) {
    return mdxProcessingCache.get(cacheKey)!
  }

  const serialized = await serialize(content.trim(), mdxOptions)
  mdxProcessingCache.set(cacheKey, serialized)
  return serialized
}

async function loadFromCache() {
  try {
    const cache = await fs.readFile(CACHE_FILE, 'utf8')
    const { data, timestamp } = JSON.parse(cache)
    
    // Check if cache is still valid
    if (Date.now() - timestamp < CACHE_INVALIDATION_TIME) {
      return data
    }
    return null
  } catch {
    return null
  }
}

async function saveToCache(data: any) {
  const cacheData = {
    data,
    timestamp: Date.now()
  }
  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
  await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData))
}

export function formatDate(date: string, includeTime: boolean = false) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  if (includeTime) {
    options.hour = 'numeric'
    options.minute = 'numeric'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

export type BlogPost = {
  content: MDXRemoteSerializeResult & {
    compiledSource: string
  }
  slug: string
  category: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    image?: string
    link?: string
  }
  originalFilename: string
}

function normalizeSlug(slug: string): string {
  const normalized = slug.toLowerCase().replace(/\.md$/, '').replace(/\s+/g, '-')
  console.log(`Normalizing slug: ${slug} -> ${normalized}`)
  return normalized
}

// Add caching for processed MDX content
const mdxCache = new Map<string, BlogPost[]>()

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Try loading from cache first
  const cached = await loadFromCache()
  if (cached) return cached

  // Check if we have cached results
  const cacheKey = 'all-posts'
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!
  }

  const posts: BlogPost[] = []
  const directories = {
    notes: path.join(process.cwd(), 'public/notes'),
    base: path.join(process.cwd(), 'public/base'),
    tutorials: path.join(process.cwd(), 'public/tutorials'),
    internships: path.join(process.cwd(), 'public/internships')
  }

  // Process all directories in parallel
  await Promise.all(
    Object.entries(directories).map(async ([category, dir]) => {
      try {
        const files = await fs.readdir(dir)
        const mdFiles = files.filter(file => file.endsWith('.md'))

        await Promise.all(
          mdFiles.map(async file => {
            try {
              const filePath = path.join(dir, file)
              const content = await fs.readFile(filePath, 'utf8')
              const { data: metadata, content: markdownContent } = matter(content)

              if (!markdownContent?.trim()) {
                console.warn(`Empty content in file: ${file}`)
                return
              }

              const serializedContent = await serializeMDX(markdownContent, filePath)

              if (!serializedContent || !serializedContent.compiledSource) {
                console.warn(`Failed to serialize content for file: ${file}`)
                return
              }

              const slug = normalizeSlug(file.replace(/\.md$/, ''))
              const fileCategory = metadata.category || category

              posts.push({
                content: serializedContent,
                slug,
                category: fileCategory,
                metadata: {
                  title: metadata.title || slug,
                  publishedAt: metadata.publishedAt || new Date().toISOString(),
                  summary: metadata.summary,
                  image: metadata.image,
                  link: metadata.link
                },
                originalFilename: file
              })
            } catch (error) {
              console.error(`Error processing file ${file} in ${category}:`, error)
            }
          })
        )
      } catch (error) {
        console.error(`Error processing directory ${dir}:`, error)
      }
    })
  )

  // Cache the results
  mdxCache.set(cacheKey, posts)

  // Save to cache
  await saveToCache(posts)
  return posts
}

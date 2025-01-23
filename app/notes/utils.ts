import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import matter from 'gray-matter'
import path from 'path'
import { promises as fs } from 'fs'

const ALLOWED_CATEGORIES = ['notes', 'tutorials', 'base', 'internships']

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

const wikiLinkConfig = {
  pageResolver: (name: string) => {
    const cleanName = name.replace(/^!/, '').split('|')[0].trim()
    return [cleanName.toLowerCase().replace(/\s+/g, '-')]
  },
  hrefTemplate: (permalink: string) => {
    return permalink.startsWith('/') ? permalink : `/notes/${permalink}`
  },
  aliasDivider: '|',
  wikiLinkClassName: (embedded: boolean) => {
    return embedded ? 'embedded-note' : 'wiki-link'
  }
}

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/\s+/g, '-')
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const NOTES_DIR = path.join(process.cwd(), 'public/notes')
  const BASE_DIR = path.join(process.cwd(), 'public/base')
  const TUTORIALS_DIR = path.join(process.cwd(), 'public/tutorials')
  const INTERNSHIPS_DIR = path.join(process.cwd(), 'public/internships')
  
  const posts: BlogPost[] = []

  const processDirectory = async (dir: string, category: string) => {
    try {
      console.log(`Processing directory: ${dir}`)
      const files = await fs.readdir(dir)
      console.log(`Found files in ${category}:`, files)
      
      const mdFiles = files.filter(file => file.endsWith('.md'))
      console.log(`Markdown files in ${category}:`, mdFiles)

      for (const file of mdFiles) {
        try {
          const filePath = path.join(dir, file)
          console.log(`Processing file: ${filePath}`)
          
          const content = await fs.readFile(filePath, 'utf8')
          const { data: metadata, content: markdownContent } = matter(content)
          
          if (!markdownContent?.trim()) {
            console.warn(`Empty content in file: ${file}`)
            continue
          }

          const serializedContent = await serialize(markdownContent.trim(), {
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkMath, [remarkWikiLink, wikiLinkConfig]],
              rehypePlugins: [rehypeKatex],
              format: 'mdx'
            }
          })

          if (!serializedContent || !serializedContent.compiledSource) {
            console.warn(`Failed to serialize content for file: ${file}`)
            continue
          }

          const slug = normalizeSlug(file.replace(/\.md$/, '').toLowerCase())
          
          // Category is inferred from directory, can be overridden by frontmatter
          const fileCategory = metadata.category || category
          
          const post = {
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
          }
          
          console.log(`Successfully processed ${fileCategory}/${file}:`, {
            slug: post.slug,
            title: post.metadata.title,
            hasContent: !!post.content.compiledSource
          })
          
          posts.push(post)
        } catch (error) {
          console.error(`Error processing file ${file} in ${category}:`, error)
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error)
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        console.warn(`Directory ${dir} does not exist`)
      }
    }
  }

  // Process directories sequentially to avoid any race conditions
  await processDirectory(NOTES_DIR, 'notes')
  await processDirectory(BASE_DIR, 'base')
  await processDirectory(TUTORIALS_DIR, 'tutorials')
  await processDirectory(INTERNSHIPS_DIR, 'internships')

  console.log('Total posts processed:', posts.length)
  
  // Group posts by category in a more compatible way
  const postsByCategory = posts.reduce((acc, post) => {
    acc[post.category] = acc[post.category] || []
    acc[post.category].push(post)
    return acc
  }, {} as Record<string, BlogPost[]>)
  
  console.log('Posts by category:', 
    Object.fromEntries(
      Object.entries(postsByCategory).map(([category, posts]) => 
        [category, posts.length]
      )
    )
  )

  return posts
}

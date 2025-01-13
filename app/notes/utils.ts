import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import matter from 'gray-matter'
import path from 'path'
import { promises as fs } from 'fs'

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
    const parts = name.split('|')
    const pageName = parts[0].trim()
    return [pageName.toLowerCase().replace(/\s+/g, '-')]
  },
  hrefTemplate: (permalink: string) => {
    return permalink.startsWith('/') ? permalink : `/notes/${permalink}`
  },
  aliasDivider: '|',
  wikiLinkClassName: 'wiki-link'
}

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/\s+/g, '-')
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const NOTES_DIR = path.join(process.cwd(), 'public/notes')
  const BASE_DIR = path.join(process.cwd(), 'public/base')
  const TUTORIALS_DIR = path.join(process.cwd(), 'public/tutorials')
  
  const posts: BlogPost[] = []

  const processDirectory = async (dir: string, category: string) => {
    try {
      const files = await fs.readdir(dir)
      const mdFiles = files.filter(file => file.endsWith('.md'))

      for (const file of mdFiles) {
        try {
          const content = await fs.readFile(path.join(dir, file), 'utf8')
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
          
          posts.push({
            content: serializedContent,
            slug,
            category,
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
          console.error(`Error processing file ${file}:`, error)
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error)
    }
  }

  await processDirectory(NOTES_DIR, 'notes')
  await processDirectory(BASE_DIR, 'base')
  await processDirectory(TUTORIALS_DIR, 'tutorials')

  return posts
}

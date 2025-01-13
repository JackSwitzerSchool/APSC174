import path from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkRehype from 'remark-rehype'
import matter from 'gray-matter'

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

export interface Metadata {
  title: string
  publishedAt: string
  summary?: string
  image?: string
}

function parseFrontmatter(fileContent: string): {
  metadata: Metadata
  content: string
} {
  // Handle files without frontmatter by providing defaults
  if (!fileContent.startsWith('---')) {
    const title = fileContent.split('\n')[0].replace('#', '').trim()
    return {
      metadata: {
        title,
        publishedAt: new Date().toISOString(),
        summary: '',
      },
      content: fileContent,
    }
  }

  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

async function getMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir)
    return files.filter((file) => ['.md', '.mdx'].includes(path.extname(file)))
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}`, error)
    return []
  }
}

async function readMarkdownFile(filePath: string) {
  try {
    const rawContent = await fs.readFile(filePath, 'utf-8')
    
    // For tutorial header, return only the content after frontmatter
    if (filePath.includes('tutorialsHeader.md')) {
      const parts = rawContent.split('---')
      return {
        metadata: {
          title: 'Tutorial Materials',
          publishedAt: new Date().toISOString(),
          summary: 'Tutorial materials and practice problems'
        },
        content: parts.length >= 3 ? parts.slice(2).join('---').trim() : rawContent.trim()
      }
    }
    
    // For all other files, parse normally
    return parseFrontmatter(rawContent)
  } catch (error) {
    console.error(`Error reading file ${filePath}`, error)
    return {
      metadata: {
        title: 'Error',
        publishedAt: new Date().toISOString(),
        summary: 'Error loading content',
      },
      content: 'Error loading content',
    }
  }
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

export type BlogPost = {
  content: MDXRemoteSerializeResult
  slug: string
  category: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    image?: string
  }
  originalFilename: string
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
          if (file === 'tutorialsHeader.md') {
            continue
          }

          const content = await fs.readFile(path.join(dir, file), 'utf8')
          const { data: metadata, content: markdownContent } = matter(content)
          
          if (!markdownContent) {
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
          
          const slug = file.replace(/\.md$/, '').toLowerCase()
          
          posts.push({
            content: serializedContent,
            slug,
            category,
            metadata: {
              title: metadata.title || slug,
              publishedAt: metadata.publishedAt || new Date().toISOString(),
              summary: metadata.summary,
              image: metadata.image
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

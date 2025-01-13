import path from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkRehype from 'remark-rehype'

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
    
    // Don't transform absolute paths
    if (pageName.startsWith('/')) {
      return [pageName]
    }
    
    // For relative paths, convert to lowercase and replace spaces with hyphens
    return [pageName.toLowerCase().replace(/\s+/g, '-')]
  },
  hrefTemplate: (permalink: string) => {
    // Handle absolute paths (starting with /)
    if (permalink.startsWith('/')) {
      return permalink
    }

    // Convert spaces to hyphens and lowercase for all relative paths
    const normalizedPermalink = permalink
      .toLowerCase()
      .replace(/\s+/g, '-')

    // Check if the permalink starts with a category prefix
    if (permalink.startsWith('base/') || 
        permalink.startsWith('tutorials/') || 
        permalink.startsWith('notes/')) {
      return `/${normalizedPermalink}`
    }

    // Default to notes directory
    return `/notes/${normalizedPermalink}`
  },
  aliasDivider: '|',
  wikiLinkClassName: 'wiki-link'
}

export interface BlogPost {
  slug: string
  category: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
  }
  content: MDXRemoteSerializeResult
  originalFilename?: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const directories = [
    path.join(process.cwd(), 'public', 'notes'),
    path.join(process.cwd(), 'public', 'base'),
    path.join(process.cwd(), 'public', 'tutorials')
  ]
  
  let allPosts: BlogPost[] = []
  
  for (const dir of directories) {
    try {
      const files = await fs.readdir(dir)
      const mdFiles = files.filter(file => ['.md', '.mdx'].includes(path.extname(file)))
      
      const posts = await Promise.all(mdFiles.map(async (file) => {
        const filePath = path.join(dir, file)
        const content = await fs.readFile(filePath, 'utf-8')
        const { metadata, content: mdxContent } = parseFrontmatter(content)
        const slug = path.basename(file, path.extname(file))
        
        return {
          metadata,
          slug: slug.toLowerCase().replace(/\s+/g, '-'),
          originalFilename: slug,
          content: await serialize(mdxContent, {
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [
                () => remarkMath,
                [remarkWikiLink, wikiLinkConfig]
              ],
              rehypePlugins: [
                () => rehypeKatex
              ],
              format: 'mdx'
            }
          }),
          category: path.basename(dir)
        }
      }))
      
      allPosts = [...allPosts, ...posts]
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}`, error)
    }
  }

  return allPosts
}

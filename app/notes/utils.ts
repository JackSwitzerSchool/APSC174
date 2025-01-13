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
  originalFilename: string
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
      console.log(`Reading directory ${dir}:`, await fs.readdir(dir))
      
      const files = (await fs.readdir(dir))
        .filter(file => file.endsWith('.md'))
      console.log(`Markdown files in ${dir}:`, files)
      
      const posts = await Promise.all(files.map(async (file) => {
        try {
          // Use the full directory path when reading files
          const filePath = path.join(dir, file)
          console.log(`Processing file: ${filePath}`)
          
          // Skip processing tutorialsHeader.md as a regular post
          if (file === 'tutorialsHeader.md') {
            console.log('Found tutorialsHeader.md, skipping as regular post')
            return null
          }

          const content = await fs.readFile(filePath, 'utf-8')
          const { metadata, content: mdxContent } = parseFrontmatter(content)
          const slug = path.basename(file, path.extname(file))
          
          if (!mdxContent) {
            console.error(`Empty content for file: ${filePath}`)
            return null
          }

          const serializedContent = await serialize(mdxContent, {
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [
                remarkMath,
                [remarkWikiLink, wikiLinkConfig] as any
              ],
              rehypePlugins: [
                rehypeKatex
              ],
              format: 'mdx'
            }
          })

          // Ensure metadata has required fields
          if (!metadata.title || !metadata.publishedAt) {
            console.error(`Missing required metadata in ${filePath}`, metadata)
            return null
          }

          const post: BlogPost = {
            metadata,
            slug: slug.toLowerCase().replace(/\s+/g, '-'),
            originalFilename: slug,
            content: serializedContent,
            category: path.basename(dir)
          }
          
          console.log(`Successfully processed post: ${post.category}/${post.slug}`)
          return post
        } catch (error) {
          console.error(`Error processing file ${file}:`, error)
          return null
        }
      }))
      
      const validPosts = posts.filter((post): post is NonNullable<typeof post> => post !== null)
      console.log(`Valid posts from ${dir}:`, validPosts.map(p => p.slug))
      
      allPosts = [...allPosts, ...validPosts]
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}`, error)
    }
  }

  console.log('All posts:', allPosts.map(p => `${p.category}/${p.slug}`))
  return allPosts
}

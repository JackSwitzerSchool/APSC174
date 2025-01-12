import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'

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

type Metadata = {
  title: string
  publishedAt: string
  summary?: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  // Handle files without frontmatter by providing defaults
  if (!fileContent.startsWith('---')) {
    const title = fileContent.split('\n')[0].replace('#', '').trim()
    return {
      metadata: {
        title,
        publishedAt: new Date().toISOString(),
        summary: '',
      } as Metadata,
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

function getMarkdownFiles(dir) {
  try {
    const files = fs.readdirSync(dir).filter((file) => 
      ['.md', '.mdx'].includes(path.extname(file))
    )
    // Log found files for debugging
    console.log('Found files in', dir, ':', files)
    return files
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}`, error)
    return []
  }
}

function readMarkdownFile(filePath) {
  try {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    
    // For tutorial header, only return the content after frontmatter
    if (filePath.includes('tutorialsHeader.md')) {
      const parts = rawContent.split('---')
      const content = parts.slice(2).join('').trim()
      return {
        metadata: {
          title: 'Tutorial Materials',
          publishedAt: new Date().toISOString(),
        },
        content
      }
    }
    
    // For all other files, parse normally
    const parsed = parseFrontmatter(rawContent)
    return parsed
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
    console.log('Resolving wiki link:', name)
    const pageName = parts[0].trim()
    
    // Don't transform absolute paths
    if (pageName.startsWith('/')) {
      return [pageName]
    }
    
    // For relative paths, convert to lowercase and replace spaces with hyphens
    return [pageName.toLowerCase().replace(/\s+/g, '-')]
  },
  hrefTemplate: (permalink: string) => {
    console.log('Creating href for:', permalink)
    
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

export async function getBlogPosts() {
  const directories = [
    path.join(process.cwd(), 'public', 'notes'),
    path.join(process.cwd(), 'public', 'base'),
    path.join(process.cwd(), 'public', 'tutorials')
  ]
  
  let allPosts = []
  
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`)
      continue
    }
    
    let mdFiles = getMarkdownFiles(dir)
    console.log('Found files in', dir, ':', mdFiles)
    
    const posts = await Promise.all(mdFiles.map(async (file) => {
      let { metadata, content } = readMarkdownFile(path.join(dir, file))
      let slug = path.basename(file, path.extname(file))
      
      // Store both the original filename and the lowercase slug
      return {
        metadata,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),  // Convert spaces to hyphens
        originalFilename: slug,
        content: await serialize(content, {
          parseFrontmatter: file !== 'tutorialsHeader.md',
          mdxOptions: {
            remarkPlugins: [remarkMath, [remarkWikiLink, wikiLinkConfig]],
            rehypePlugins: [rehypeKatex],
            format: 'mdx'
          }
        }),
        category: path.basename(dir)
      }
    }))
    
    allPosts = [...allPosts, ...posts]
  }

  return allPosts
}

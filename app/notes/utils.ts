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
      const content = rawContent.split('---').slice(2).join('---').trim()
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
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return [pageName]
  },
  hrefTemplate: (permalink: string) => {
    console.log('Creating href for:', permalink)
    
    // Check if the permalink starts with a category prefix
    if (permalink.startsWith('base/') || 
        permalink.startsWith('tutorials/') || 
        permalink.startsWith('notes/')) {
      return `/${permalink}`
    }

    // Special case for Course Resources
    if (permalink === 'course-resources') {
      return `/notes/base/Course%20Resources`
    }

    // Default to notes directory
    return `/notes/${permalink}`
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
      let slug = path.basename(file, path.extname(file)).toLowerCase()
      
      // For tutorials header, don't include frontmatter in serialization
      const mdxOptions = {
        parseFrontmatter: file !== 'tutorialsHeader.md',
        mdxOptions: {
          remarkPlugins: [
            remarkMath,
            [remarkWikiLink, wikiLinkConfig]
          ],
          rehypePlugins: [rehypeKatex],
          format: 'mdx',
          development: process.env.NODE_ENV === 'development'
        }
      }

      const mdxSource = await serialize(content, mdxOptions)

      return {
        metadata,
        slug,
        content: mdxSource,
        category: path.basename(dir)
      }
    }))
    
    allPosts = [...allPosts, ...posts]
  }

  return allPosts
}

import fs from 'fs'
import path from 'path'

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
    return fs.readdirSync(dir).filter((file) => 
      ['.md', '.mdx'].includes(path.extname(file))
    )
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}`, error)
    return []
  }
}

function readMarkdownFile(filePath) {
  try {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
  } catch (error) {
    console.error(`Error reading file ${filePath}`, error)
    return {
      metadata: {
        title: 'Error',
        publishedAt: new Date().toISOString(),
        summary: 'Error loading content',
      } as Metadata,
      content: 'Error loading content',
    }
  }
}

export function getBlogPosts() {
  const notesDir = path.join(process.cwd(), 'public', 'notes')
  let mdFiles = getMarkdownFiles(notesDir)
  
  return mdFiles.map((file) => {
    let { metadata, content } = readMarkdownFile(path.join(notesDir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
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

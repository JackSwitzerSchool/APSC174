import fs from 'fs'
import path from 'path'

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
    console.log('Reading file:', filePath)
    console.log('Raw content:', rawContent.substring(0, 200)) // Log first 200 chars
    const parsed = parseFrontmatter(rawContent)
    console.log('Parsed content:', parsed)
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

export function getBlogPosts() {
  const notesDir = path.join(process.cwd(), 'public', 'notes')
  console.log('Looking for notes in:', notesDir)
  
  if (!fs.existsSync(notesDir)) {
    console.warn(`Notes directory not found: ${notesDir}`)
    return []
  }
  
  let mdFiles = getMarkdownFiles(notesDir)
  console.log('Found files:', mdFiles)
  
  return mdFiles.map((file) => {
    let { metadata, content } = readMarkdownFile(path.join(notesDir, file))
    let slug = path.basename(file, path.extname(file)).toLowerCase()
    console.log('Created slug:', slug, 'for file:', file) // Debug log

    return {
      metadata,
      slug,
      content,
    }
  })
}

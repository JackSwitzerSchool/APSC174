import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
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

// Update to handle both .md and .mdx files
function getMarkdownFiles(dir) {
  return fs.readdirSync(dir).filter((file) => 
    ['.md', '.mdx'].includes(path.extname(file))
  )
}

function readMarkdownFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  
  // Process Obsidian-style wiki links [[Page Name]]
  rawContent = rawContent.replace(
    /\[\[(.*?)\]\]/g,
    (match, pageName) => {
      const [name, alias] = pageName.split('|')
      const slug = name.toLowerCase().replace(/\s+/g, '-')
      return `[${alias || name}](/notes/${slug})`
    }
  )

  // Process Obsidian-style images ![[image.png]]
  rawContent = rawContent.replace(
    /!\[\[(.*?)\]\]/g,
    (match, imageName) => `![${imageName}](/images/${imageName})`
  )

  return parseFrontmatter(rawContent)
}

function getMarkdownData(dir) {
  let mdFiles = getMarkdownFiles(dir)
  return mdFiles.map((file) => {
    let { metadata, content } = readMarkdownFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  // Look in both app/notes and public/notes directories
  const appNotes = getMarkdownData(path.join(process.cwd(), 'app', 'notes'))
  const publicNotes = getMarkdownData(path.join(process.cwd(), 'public', 'notes'))
  
  return [...appNotes, ...publicNotes].sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
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

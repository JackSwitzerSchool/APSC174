import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Note {
  title: string
  slug: string
  category?: string
  [key: string]: any
}

export async function getNotes(): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), 'content/notes')
  const files = await fs.readdir(notesDirectory)
  
  const notes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(notesDirectory, file)
      const content = await fs.readFile(filePath, 'utf8')
      const { data } = matter(content)
      
      // If no category is specified in frontmatter, determine it based on filename or content
      if (!data.category) {
        if (file.startsWith('tutorial') || file.includes('week-')) {
          data.category = 'tutorials'
        } else if (file === 'course-resources.md' || file.match(/midterm|final|webwork/i)) {
          data.category = 'resources'
        } else if (file === 'intern-v1.md') {
          data.category = 'internships'
        } else {
          data.category = 'notes'
        }
      }
      
      return {
        ...data,
        slug: file.replace(/\.mdx?$/, ''),
      } as Note
    })
  )

  return notes.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
}

export async function getNote(slug: string): Promise<Note & { content: string }> {
  const notePath = path.join(process.cwd(), 'content/notes', `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'content/notes', `${slug}.md`)
  
  try {
    // Try MDX first
    const content = await fs.readFile(notePath, 'utf8')
    const { data, content: markdown } = matter(content)
    return {
      ...data,
      content: markdown,
      slug,
    } as Note & { content: string }
  } catch {
    // Try MD if MDX doesn't exist
    const content = await fs.readFile(mdPath, 'utf8')
    const { data, content: markdown } = matter(content)
    return {
      ...data,
      content: markdown,
      slug,
    } as Note & { content: string }
  }
} 
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Note {
  title: string
  slug: string
  category?: string
  [key: string]: any
}

// Map frontmatter categories to route categories
const categoryMap: Record<string, string> = {
  'course-content': 'notes',
  'reference': 'notes',
  'tutorial': 'tutorials',
  'resource': 'resources',
  'internship': 'internships'
}

export async function getNotes(): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), 'content/notes')
  const files = await fs.readdir(notesDirectory)
  
  const notes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(notesDirectory, file)
      const content = await fs.readFile(filePath, 'utf8')
      const { data } = matter(content)
      
      // Map the frontmatter category to a route category
      if (data.category) {
        data.category = categoryMap[data.category] || data.category
      }
      
      // If no category is specified, determine it based on filename
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
  const extensions = ['.mdx', '.md']
  const notesDir = path.join(process.cwd(), 'content/notes')
  let lastError: Error | null = null
  
  for (const ext of extensions) {
    const filePath = path.join(notesDir, `${slug}${ext}`)
    try {
      const content = await fs.readFile(filePath, 'utf8')
      const { data, content: markdown } = matter(content)
      
      // If no category is specified, determine it based on filename
      if (!data.category) {
        if (slug.startsWith('tutorial') || slug.includes('week-')) {
          data.category = 'tutorials'
        } else if (slug === 'course-resources' || slug.match(/midterm|final|webwork/i)) {
          data.category = 'resources'
        } else if (slug === 'intern-v1') {
          data.category = 'internships'
        } else {
          data.category = 'notes'
        }
      }

      // Ensure required fields are present
      if (!data.title) {
        data.title = slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }
      
      return {
        ...data,
        content: markdown,
        slug,
      } as Note & { content: string }
    } catch (error) {
      lastError = error as Error
      // Continue to next extension if file not found
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
  }
  
  console.error(`Failed to find note: ${slug}`, lastError)
  throw new Error(`Note not found: ${slug}`)
} 
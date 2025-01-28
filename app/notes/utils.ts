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
  
  // Normalize the slug to kebab-case
  const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-')
  
  // Get all files in the directory
  const files = await fs.readdir(notesDir)
  
  // Find a case-insensitive match
  const matchingFile = files.find(file => 
    file.toLowerCase().replace(/\.mdx?$/, '') === normalizedSlug
  )
  
  if (!matchingFile) {
    console.error(`No matching file found for slug: ${slug}`)
    throw new Error(`Note not found: ${slug}`)
  }
  
  const filePath = path.join(notesDir, matchingFile)
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const { data, content: markdown } = matter(content)
    
    // If no category is specified, determine it based on filename
    if (!data.category) {
      if (matchingFile.startsWith('tutorial') || matchingFile.includes('week-')) {
        data.category = 'tutorials'
      } else if (matchingFile === 'course-resources.md' || matchingFile.match(/midterm|final|webwork/i)) {
        data.category = 'resources'
      } else if (matchingFile === 'intern-v1.md') {
        data.category = 'internships'
      } else {
        data.category = 'notes'
      }
    }

    // Ensure required fields are present
    if (!data.title) {
      data.title = normalizedSlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }
    
    return {
      ...data,
      content: markdown,
      slug: normalizedSlug,
    } as Note & { content: string }
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error)
    throw error
  }
} 
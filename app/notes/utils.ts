import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Note {
  title: string
  slug: string
  category?: string
  subcategory?: string
  order?: number
  weight?: number
  isPublished?: boolean
  type?: string
  displayInNotes?: boolean
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

// List of special pages to exclude from general notes listing
const excludedSlugs = [
  'page',
  'course-resources',
  'tutorialsHeader',
  'internships',
  'weekly-summary',
  'weekly-reviews',
  'finding-an-internship-v1'
]

// Main categories in preferred order
const mainCategories = [
  'foundations',
  'operations',
  'functions',
  'applications',
  'weekly-content'
]

export async function getNotes(): Promise<Note[]> {
  const notesDirectory = path.join(process.cwd(), 'content/notes')
  const files = await fs.readdir(notesDirectory)
  
  const notes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(notesDirectory, file)
      const content = await fs.readFile(filePath, 'utf8')
      const { data } = matter(content)
      
      // Ensure title exists
      if (!data.title) {
        data.title = file.replace(/\.mdx?$/, '').split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
      
      // Map category if it exists in categoryMap
      const mappedCategory = data.category ? categoryMap[data.category] || data.category : 'notes'
      
      // Handle weekly content subcategory
      let subcategory = data.subcategory
      if (data.subcategory?.startsWith('week-') || data.subcategory?.startsWith('Week')) {
        subcategory = 'weekly-content'
      }
      
      return {
        ...data,
        slug: file.replace(/\.mdx?$/, ''),
        category: mappedCategory,
        subcategory: subcategory || 'foundations',
        order: data.order || 0,
        weight: data.weight || 0,
        isPublished: data.isPublished !== false, // default to true if not specified
        displayInNotes: data.displayInNotes !== false // default to true if not specified
      } as Note
    })
  )

  // Filter out excluded pages, unpublished content, and special types
  return notes
    .filter(note => 
      !excludedSlugs.includes(note.slug) && 
      note.isPublished !== false &&
      note.type !== 'page' &&
      note.displayInNotes !== false &&
      !note.slug.toLowerCase().includes('page') // Exclude any page.tsx files
    )
    .sort((a, b) => {
      // First sort by category order
      const aCatIndex = mainCategories.indexOf(a.subcategory || '')
      const bCatIndex = mainCategories.indexOf(b.subcategory || '')
      if (aCatIndex !== -1 && bCatIndex !== -1 && aCatIndex !== bCatIndex) {
        return aCatIndex - bCatIndex
      }
      
      // Then by order if available
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      
      // Then by weight if available
      if (a.weight !== undefined && b.weight !== undefined) {
        return a.weight - b.weight
      }
      
      // Finally by title
      return (a.title || '').localeCompare(b.title || '')
    })
}

export async function getNote(slug: string): Promise<Note & { content: string }> {
  const notesDir = path.join(process.cwd(), 'content/notes')
  
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
    
    // Map category if it exists in categoryMap
    const mappedCategory = data.category ? categoryMap[data.category] || data.category : 'notes'
    
    return {
      ...data,
      content: markdown,
      slug: normalizedSlug,
      category: mappedCategory,
      subcategory: data.subcategory || 'Uncategorized',
      order: data.order || 0,
      weight: data.weight || 0
    } as Note & { content: string }
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error)
    throw error
  }
} 
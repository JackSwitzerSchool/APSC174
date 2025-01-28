import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Note {
  title: string
  slug: string
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
  const filePath = path.join(process.cwd(), 'content/notes', `${slug}.mdx`)
  const content = await fs.readFile(filePath, 'utf8')
  const { data, content: markdown } = matter(content)
  
  return {
    ...data,
    content: markdown,
    slug,
  } as Note & { content: string }
} 
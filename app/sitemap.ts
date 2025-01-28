import { getNotes } from '@/app/notes/utils'
import { MetadataRoute } from 'next'

interface Note {
  slug: string
  category?: string
}

export const baseUrl = 'https://apsc174.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes()
  
  // Filter out posts that should have their own routes
  const filteredPosts = notes.filter((note: Note) => {
    if (note.category === 'tutorials' || 
        (note.category === 'base' && note.slug === 'course-resources')) {
      return false
    }
    return true
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/course-resources`,
      lastModified: new Date(),
    },
    ...filteredPosts.map((note: Note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: new Date(),
    })),
  ]
}

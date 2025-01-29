import { getNotes } from '@/app/notes/utils'
import { MetadataRoute } from 'next'

interface Note {
  slug: string
  category?: string
}

export const baseUrl = 'https://jackswitzer.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes()
  
  // Filter out posts that should have their own routes
  const filteredPosts = notes.filter((note: Note) => {
    // Only include notes and weekly summaries in sitemap
    return note.category === 'notes' || note.category === 'weekly-summary'
  })

  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/course-resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...filteredPosts.map((note: Note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}

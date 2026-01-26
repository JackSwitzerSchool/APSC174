import { getAllCachedNotes } from '@/lib/renderer/cache'
import { MetadataRoute } from 'next'
import config from '@/lib/config'

function formatDate(date: string | Date | undefined): string {
  if (!date) return new Date().toISOString()
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date().toISOString()
    return d.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const cachedNotes = getAllCachedNotes()

  // Filter to main categories
  const filteredNotes = cachedNotes.filter((note) => {
    const category = note.frontmatter.category as string | undefined
    return category === 'set-theory' ||
           category === 'functions' ||
           category === 'vector-spaces' ||
           category === 'applications'
  })

  const currentDate = new Date().toISOString()

  return [
    {
      url: config.baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${config.baseUrl}/notes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...filteredNotes.map((note) => ({
      url: `${config.baseUrl}/notes/${note.slug}`,
      lastModified: formatDate(note.frontmatter.publishedAt as string | undefined),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}

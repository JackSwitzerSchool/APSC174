import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Internships',
  description: 'Internship opportunities and resources.',
}

export default async function InternshipsPage() {
  const notes = await getNotes()
  const internships = notes
    .filter(note => note.category === 'internships')
    .sort((a, b) => {
      // Sort by version number if present (e.g., v1, v2)
      const versionA = parseInt(a.slug.match(/v(\d+)/)?.[1] || '0')
      const versionB = parseInt(b.slug.match(/v(\d+)/)?.[1] || '0')
      return versionB - versionA // Latest version first
    })
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Internship Resources
      </h1>
      <div className="prose dark:prose-invert">
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Resources and guides to help you find and secure internship opportunities.
        </p>
        <Notes notes={internships} />
      </div>
    </section>
  )
} 
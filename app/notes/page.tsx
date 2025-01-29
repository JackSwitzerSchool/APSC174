import { getNotes } from './utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

export default async function NotesPage() {
  const notes = await getNotes()
  
  // Group notes by subcategory
  const notesByCategory = notes.reduce((acc, note) => {
    const category = note.subcategory || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(note)
    return acc
  }, {} as Record<string, typeof notes>)
  
  // Sort notes within each category
  Object.keys(notesByCategory).forEach(category => {
    notesByCategory[category].sort((a, b) => {
      // First sort by order if available
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
  })
  
  // Sort categories by weight first, then alphabetically
  const sortedCategories = Object.keys(notesByCategory).sort((a, b) => {
    const aWeight = notesByCategory[a][0]?.weight || 0
    const bWeight = notesByCategory[b][0]?.weight || 0
    if (aWeight !== bWeight) {
      return aWeight - bWeight
    }
    return a.localeCompare(b)
  })
  
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Notes
      </h1>
      <div className="grid gap-8">
        {sortedCategories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="font-medium text-xl tracking-tighter capitalize">
              {category.replace(/-/g, ' ')}
            </h2>
            <div className="pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
              <Notes notes={notesByCategory[category]} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 
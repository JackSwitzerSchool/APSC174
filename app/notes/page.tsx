import { getNotes } from './utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Course Notes',
  description: 'All course notes and materials organized by topic.',
}

export default async function NotesPage() {
  const allNotes = await getNotes()
  
  // Filter out weekly summaries and organize remaining notes by category
  const notes = allNotes.filter(note => note.category !== 'weekly-summary')
  
  // Group notes by subcategory
  const notesByCategory = notes.reduce((acc, note) => {
    const category = note.subcategory || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(note)
    return acc
  }, {} as Record<string, typeof notes>)
  
  // Sort notes within each category by order/weight if available, then by title
  Object.keys(notesByCategory).forEach(category => {
    notesByCategory[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      if (a.weight !== undefined && b.weight !== undefined) {
        return a.weight - b.weight
      }
      return a.title.localeCompare(b.title)
    })
  })
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Notes
      </h1>
      {Object.entries(notesByCategory).map(([category, categoryNotes]) => (
        <div key={category} className="mb-12">
          <h2 className="font-medium text-xl mb-4 tracking-tighter capitalize">
            {category.replace(/-/g, ' ')}
          </h2>
          <Notes notes={categoryNotes} />
        </div>
      ))}
    </section>
  )
} 
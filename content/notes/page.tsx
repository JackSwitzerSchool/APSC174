import Notes from '@/app/components/notes'
import { getNotes } from '@/app/notes/utils'

export const metadata = {
  title: 'Course Notes',
  description: 'Course notes and learning materials.',
}

export default async function Page() {
  const notes = await getNotes()
  const courseNotes = notes.filter(note => note.category === 'notes')
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Notes</h1>
      <Notes notes={courseNotes} />
    </section>
  )
} 
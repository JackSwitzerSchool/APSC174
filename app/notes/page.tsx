import Notes from '@/app/components/notes'
import { getNotes } from './utils'

export const metadata = {
  title: 'Notes',
  description: 'Course notes and materials.',
}

export default async function NotesPage() {
  const notes = await getNotes()
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Course Notes
      </h1>
      <Notes notes={notes} />
    </section>
  )
} 
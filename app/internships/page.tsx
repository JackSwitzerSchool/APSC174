import { getNotes } from '@/app/notes/utils'
import Notes from '@/app/components/notes'

export const metadata = {
  title: 'Internships',
  description: 'Internship opportunities and resources.',
}

export default async function InternshipsPage() {
  const notes = await getNotes()
  const internships = notes.filter(note => note.category === 'internships')
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Internship Opportunities
      </h1>
      <Notes notes={internships} />
    </section>
  )
} 
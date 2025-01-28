import Link from 'next/link'

interface Note {
  slug: string
  title: string
  description?: string
}

export default function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <article key={note.slug} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <Link href={`/notes/${note.slug}`} className="block">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            {note.description && (
              <p className="text-gray-600">{note.description}</p>
            )}
          </Link>
        </article>
      ))}
    </div>
  )
} 
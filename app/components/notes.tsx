import Link from 'next/link'

interface Note {
  slug: string
  title: string
  description?: string
  summary?: string
}

export default function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <Link 
          key={note.slug} 
          href={`/notes/${note.slug}`}
          className="block w-full p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <article className="flex flex-col gap-1.5">
            <h3 className="font-medium text-[15px] text-neutral-900 dark:text-neutral-100 break-words">
              {note.title}
            </h3>
            {(note.description || note.summary) && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 break-words line-clamp-3">
                {note.description || note.summary}
              </p>
            )}
          </article>
        </Link>
      ))}
    </div>
  )
} 
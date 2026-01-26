import { getAllCachedNotes } from '@/lib/renderer/cache'
import Link from 'next/link'

export const metadata = {
  title: 'Home',
  description: 'Weekly summaries and course materials.',
}

export default async function HomePage() {
  const cachedNotes = getAllCachedNotes()

  // Filter for weekly summaries and sort by week number in reverse order
  const weeklySummaries = cachedNotes
    .filter((n) => n.frontmatter.category === 'weekly-summary')
    .map((n) => ({
      slug: n.slug,
      title: n.frontmatter.title as string,
      summary: n.frontmatter.summary as string | undefined,
    }))
    .sort((a, b) => {
      const weekA = parseInt(a.slug.replace('week-', '')) || 0
      const weekB = parseInt(b.slug.replace('week-', '')) || 0
      return weekB - weekA // Reverse order
    })

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineers
      </h1>
      <div className="mb-8">
        <h2 className="font-medium text-xl mb-4 tracking-tighter">Weekly Summaries</h2>
        <div className="space-y-3">
          {weeklySummaries.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="block w-full p-4 sm:p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            >
              <article className="flex flex-col gap-2">
                <h3 className="font-medium text-lg text-neutral-900 dark:text-neutral-100">
                  {note.title}
                </h3>
                {note.summary && (
                  <p className="text-base text-neutral-600 dark:text-neutral-400 line-clamp-3">
                    {note.summary}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

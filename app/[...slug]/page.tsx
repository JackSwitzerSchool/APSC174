import { notFound, redirect } from 'next/navigation'
import { getCachedNote, getAllNoteSlugs } from '@/lib/renderer/cache'
import StaticContent from '@/app/components/static-content'

// Enable ISR - revalidate every hour (though content is pre-built)
export const revalidate = 3600

// Generate static params for all notes at build time
export async function generateStaticParams() {
  const slugs = getAllNoteSlugs()

  return [
    // All notes under /notes/[slug]
    ...slugs.map((slug) => ({ slug: ['notes', slug] })),
    // Special routes
    { slug: ['course-resources'] },
    { slug: ['tutorials'] },
    { slug: ['internships'] },
  ]
}

interface Props {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DynamicPage({ params }: Props) {
  const resolvedParams = await params

  if (!resolvedParams?.slug?.length) {
    notFound()
  }

  const fullPath = resolvedParams.slug.join('/')

  // Handle static assets and favicons - redirect to public
  if (
    fullPath.includes('assets/') ||
    fullPath.endsWith('.ico') ||
    fullPath.endsWith('.png') ||
    fullPath.endsWith('.jpg') ||
    fullPath.endsWith('.jpeg') ||
    fullPath.endsWith('.svg') ||
    fullPath.endsWith('.pdf')
  ) {
    return redirect(`/${fullPath}`)
  }

  const lastSlug = resolvedParams.slug[resolvedParams.slug.length - 1].toLowerCase()

  // Handle special routes
  if (lastSlug === 'course-resources') {
    const note = getCachedNote('course-resources')
    if (!note) notFound()
    return (
      <article>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {note.frontmatter.title}
        </h1>
        <StaticContent html={note.html} />
      </article>
    )
  }

  if (lastSlug === 'tutorials') {
    const note = getCachedNote('tutorialsheader')
    if (!note) notFound()
    return (
      <article>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {note.frontmatter.title}
        </h1>
        <StaticContent html={note.html} />
      </article>
    )
  }

  if (lastSlug === 'internships') {
    const note = getCachedNote('intern-v1')
    if (!note) notFound()
    return (
      <article>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {note.frontmatter.title}
        </h1>
        <StaticContent html={note.html} />
      </article>
    )
  }

  // Only serve notes under /notes/ path
  if (!fullPath.startsWith('notes/')) {
    notFound()
  }

  // Get pre-built note from cache
  const note = getCachedNote(lastSlug)

  if (!note) {
    console.error(`Note not found in cache: ${lastSlug}`)
    notFound()
  }

  return (
    <article>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {note.frontmatter.title}
      </h1>
      <StaticContent html={note.html} />
    </article>
  )
}

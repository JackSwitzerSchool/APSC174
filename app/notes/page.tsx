import { getBlogPosts } from '../notes/utils'
import Link from 'next/link'

export default async function NotesPage() {
  const posts = await getBlogPosts()

  const categories = {
    notes: 'Course Notes',
    base: 'Course Information',
    tutorials: 'Tutorial Materials',
    assorted: 'Other Resources'
  }

  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.category || 'notes'
    if (!acc[category]) acc[category] = []
    acc[category].push(post)
    return acc
  }, {})

  const getPostHref = (post) => {
    if (post.category === 'notes') {
      return `/notes/${post.slug}`
    }
    if (post.category === 'tutorials' && post.slug === 'tutorialsheader') {
      return '/notes/tutorials'
    }
    return `/notes/${post.category}/${post.slug}`
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-bold text-2xl mb-4 tracking-tighter">Course Notes</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          A collection of notes covering fundamental concepts in Linear Algebra, 
          including Set Theory, Functions, Linear Systems, and more.
        </p>
      </div>

      {Object.entries(categories).map(([category, title]) => (
        groupedPosts[category]?.length > 0 && (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="grid gap-4">
              {groupedPosts[category]
                .sort((a, b) => 
                  new Date(b.metadata.publishedAt).getTime() - 
                  new Date(a.metadata.publishedAt).getTime()
                )
                .map((post) => (
                  <Link
                    key={post.slug}
                    className="flex flex-col space-y-1 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    href={getPostHref(post)}
                  >
                    <div className="w-full flex flex-col">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                        {post.metadata.title}
                      </h3>
                      {post.metadata.summary && (
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {post.metadata.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )
      ))}
    </section>
  )
} 
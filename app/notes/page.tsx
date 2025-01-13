import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'

export default async function NotesPage() {
  const posts = await getBlogPosts()
  
  // Filter for notes category and sort by date
  const notePosts = posts
    .filter(post => post.category === 'notes')
    .sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Notes</h1>
      <div className="prose prose-neutral dark:prose-invert">
        {notePosts.map((post) => (
          <article key={post.slug} className="mb-8">
            <h2 className="text-xl font-medium">
              <a href={`/notes/${post.slug}`} className="text-neutral-900 dark:text-neutral-100">
                {post.metadata.title}
              </a>
            </h2>
            {post.metadata.summary && (
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                {post.metadata.summary}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
} 
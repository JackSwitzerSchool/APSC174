import { getBlogPosts } from '@/app/notes/utils'
import Link from 'next/link'

export default async function NotesPage() {
  const posts = await getBlogPosts()

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">All Notes</h1>
      <div className="prose prose-neutral dark:prose-invert">
        {posts
          .sort((a, b) => 
            new Date(b.metadata.publishedAt).getTime() - 
            new Date(a.metadata.publishedAt).getTime()
          )
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/notes/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  )
} 
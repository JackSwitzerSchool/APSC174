import { getBlogPosts } from './notes/utils'
import { CustomMDX } from './components/mdx'
import Link from 'next/link'

export default async function Page() {
  const posts = await getBlogPosts()
  const week1Post = posts.find(post => 
    post.slug === 'week-1' && post.category === 'notes'
  )

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        {week1Post ? (
          <>
            <h1 className="font-bold text-2xl mb-8 tracking-tighter">
              {week1Post.metadata.title}
            </h1>
            <CustomMDX source={week1Post.content} />
            <div className="mt-8">
              <Link 
                href="/notes" 
                className="text-blue-500 hover:underline"
              >
                View all notes →
              </Link>
            </div>
          </>
        ) : (
          <p>Week 1 content not found</p>
        )}
      </div>
    </section>
  )
}

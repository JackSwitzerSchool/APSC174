import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import Link from 'next/link'

export default async function Page() {
  const posts = await getBlogPosts()
  
  const week1Post = posts.find((post): post is BlogPost => 
    (post.slug === 'week-1' || 
     post.slug === 'week1' ||
     post.slug === 'week 1') && 
    post.category === 'notes'
  )

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        {week1Post ? (
          <>
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
          <p>Week 1 content not found. Please check the notes page for available content.</p>
        )}
      </div>
    </section>
  )
}

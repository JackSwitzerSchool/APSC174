import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// Add reserved slugs that should not be handled by the notes route
const RESERVED_SLUGS = ['tutorials', 'course-resources']

export default async function NotePage({ params }: { params: { slug: string } }) {
  // Redirect reserved slugs to their proper routes
  if (RESERVED_SLUGS.includes(params.slug)) {
    return notFound()
  }

  try {
    const posts = await getBlogPosts()
    const post = posts.find(
      (post): post is BlogPost => 
        post.category === 'notes' && 
        post.slug === params.slug &&
        !RESERVED_SLUGS.includes(post.slug) // Extra safety check
    )

    if (!post?.content) {
      console.error(`Post not found for slug: ${params.slug}`)
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {post.metadata?.title || post.slug}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={post.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in NotePage:', error)
    notFound()
  }
}

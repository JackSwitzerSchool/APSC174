import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// Add this to prevent certain slugs from being treated as notes
const EXCLUDED_SLUGS = ['tutorials', 'course-resources']

export default async function NotePage({ params }: { params: { slug: string } }) {
  // First check if this is an excluded slug
  if (EXCLUDED_SLUGS.includes(params.slug)) {
    notFound()
  }

  try {
    const posts = await getBlogPosts()
    const post = posts.find(
      (post): post is BlogPost => 
        post.category === 'notes' && 
        post.slug === params.slug
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

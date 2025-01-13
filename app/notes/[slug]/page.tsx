import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound, redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// Add reserved slugs that should redirect to their proper routes
const RESERVED_ROUTES = {
  'tutorials': '/tutorials',
  'course-resources': '/course-resources'
} as const

export default async function NotePage({ params }: { params: { slug: string } }) {
  // Check if this is a reserved route and redirect if it is
  const redirectPath = RESERVED_ROUTES[params.slug as keyof typeof RESERVED_ROUTES]
  if (redirectPath) {
    redirect(redirectPath)
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

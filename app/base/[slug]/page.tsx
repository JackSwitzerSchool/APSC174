import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function BasePage({ params }: { params: { slug: string } }) {
  try {
    const posts = await getBlogPosts()
    const post = posts.find(
      (post): post is BlogPost => 
        post.category === 'base' && 
        post.slug === params.slug
    )

    if (!post?.content) {
      console.error(`Base post not found for slug: ${params.slug}`)
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
    console.error('Error in BasePage:', error)
    notFound()
  }
} 
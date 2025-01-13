import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string[] } }) {
  if (!params?.slug?.length) {
    notFound()
  }

  try {
    const posts = await getBlogPosts()
    const slug = params.slug.join('/')
    
    const post = posts.find((post): post is BlogPost => {
      const postSlug = `${post.category}/${post.slug}`
      return (postSlug === slug || post.slug === slug) && !!post.content
    })

    if (!post?.content) {
      console.log(`Post not found or invalid for slug: ${slug}`)
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {post.metadata?.title || post.slug}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <CustomMDX source={post.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in NotePage:', error)
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Error</h1>
        <p>Failed to load content. Please try again later.</p>
      </section>
    )
  }
} 
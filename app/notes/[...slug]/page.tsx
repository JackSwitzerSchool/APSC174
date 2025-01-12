import { getBlogPosts } from '../utils'
import { CustomMDX } from '../../components/mdx'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string[] } }) {
  const posts = await getBlogPosts()
  
  // Handle spaces in filenames
  const slug = params.slug[params.slug.length - 1].replace(/%20/g, ' ')
  const category = params.slug[0]
  
  const post = posts.find(
    post => post.slug === slug.toLowerCase() && post.category === category
  )

  if (!post) {
    notFound()
  }

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </div>
    </section>
  )
} 
import { getBlogPosts } from '../utils'
import { CustomMDX } from '../../components/mdx'
import { notFound } from 'next/navigation'

export default async function NotePage({ params }: { params: { slug: string[] } }) {
  const posts = await getBlogPosts()
  
  // For a URL like /notes/cartesian-product, normalize the slug
  const slug = decodeURIComponent(params.slug[params.slug.length - 1])
    .toLowerCase()
    .replace(/\s+/g, '-')
  const category = params.slug[0]
  
  console.log('Looking for post with slug:', slug, 'and category:', category)
  
  const post = posts.find(
    post => post.slug === slug && post.category === category
  )

  if (!post) {
    console.log('Post not found. Available posts:', 
      posts.map(p => ({ slug: p.slug, category: p.category })))
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
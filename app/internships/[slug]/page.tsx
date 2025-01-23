import { getBlogPosts } from '@/app/notes/utils'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Internship Advice',
  description: 'Tips and guidance for finding internships and starting your career.',
}

export default async function InternshipPage({ params }: { params: { slug: string } }) {
  try {
    const posts = await getBlogPosts()
    const internshipPost = posts.find(
      post => post.category === 'internships' && post.slug === params.slug
    )

    if (!internshipPost?.content) {
      console.error('Internship content not found')
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {internshipPost.metadata.title}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={internshipPost.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in InternshipPage:', error)
    notFound()
  }
} 
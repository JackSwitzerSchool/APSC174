import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

export default async function TutorialsPage() {
  try {
    const posts = await getBlogPosts()
    const tutorialHeader = posts.find(
      (post): post is BlogPost => 
        post.originalFilename === 'tutorialsHeader.md' && 
        post.category === 'tutorials'
    )

    if (!tutorialHeader?.content) {
      return (
        <section>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
          <div className="prose prose-neutral dark:prose-invert">
            <p>Tutorial content will be available soon.</p>
          </div>
        </section>
      )
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {tutorialHeader.metadata?.title || 'Tutorials'}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={tutorialHeader.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in TutorialsPage:', error)
    notFound()
  }
} 
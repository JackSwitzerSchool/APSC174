import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const CustomMDX = dynamic(() => import('@/app/components/mdx').then(mod => mod.CustomMDX), {
  loading: () => <div>Loading...</div>,
  ssr: false
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

    if (!tutorialHeader?.content?.compiledSource) {
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
          {tutorialHeader.metadata.title || 'Tutorials'}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="prose prose-neutral dark:prose-invert">
            <CustomMDX source={tutorialHeader.content} />
          </div>
        </Suspense>
      </section>
    )
  } catch (error) {
    console.error('Error in TutorialsPage:', error)
    notFound()
  }
} 
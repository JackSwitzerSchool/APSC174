import { getBlogPosts } from '@/app/notes/utils'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const metadata = {
  title: 'Tutorials',
  description: 'Weekly tutorial materials and solutions.',
}

export default async function TutorialsPage() {
  try {
    const posts = await getBlogPosts()
    const tutorialHeader = posts.find(
      post => post.category === 'tutorials' && post.slug === 'tutorialsheader'
    )

    if (!tutorialHeader?.content) {
      console.error('Tutorial header content not found')
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          Tutorial Materials
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
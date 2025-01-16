import { getBlogPosts } from '@/app/notes/utils'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function TutorialsPage() {
  const posts = await getBlogPosts()
  const tutorialHeader = posts.find(
    post => post.category === 'tutorials' && post.slug === 'tutorialsHeader'
  )

  if (!tutorialHeader?.content) {
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          Tutorial Materials
        </h1>
        <p>No tutorial materials available yet.</p>
      </section>
    )
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
} 
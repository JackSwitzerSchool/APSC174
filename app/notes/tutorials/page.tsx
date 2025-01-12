import { getBlogPosts } from '@/app/notes/utils'
import { CustomMDX } from '@/app/components/mdx'

export default async function TutorialsPage() {
  const posts = await getBlogPosts()
  const tutorialHeader = posts.find(
    post => post.slug === 'tutorialsheader' && post.category === 'tutorials'
  )

  if (!tutorialHeader) {
    return <div>Tutorial content not found</div>
  }

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={tutorialHeader.content} />
      </div>
    </section>
  )
} 
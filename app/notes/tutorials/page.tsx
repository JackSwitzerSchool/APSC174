import { getBlogPosts } from '../../notes/utils'
import { CustomMDX } from '../../components/mdx'

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
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        {tutorialHeader.metadata.title}
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={tutorialHeader.content} />
      </div>
    </section>
  )
} 
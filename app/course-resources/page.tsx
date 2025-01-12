import { getBlogPosts } from '../notes/utils'
import { CustomMDX } from '../components/mdx'

export default async function Page() {
  const posts = await getBlogPosts()
  const courseResources = posts.find(
    post => post.slug === 'course resources' && post.category === 'base'
  )

  if (!courseResources) {
    return <div>Course Resources content not found</div>
  }

  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={courseResources.content} />
      </div>
    </section>
  )
}
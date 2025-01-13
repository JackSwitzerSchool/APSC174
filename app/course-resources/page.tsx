import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function CourseResourcesPage() {
  try {
    const posts = await getBlogPosts()
    const courseResources = posts.find(
      (post): post is BlogPost => 
        post.originalFilename === 'course-resources.md' && 
        post.category === 'base'
    )

    if (!courseResources?.content) {
      console.error('Course resources content not found')
      notFound()
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {courseResources.metadata?.title || 'Course Resources'}
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={courseResources.content} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error in CourseResourcesPage:', error)
    notFound()
  }
}
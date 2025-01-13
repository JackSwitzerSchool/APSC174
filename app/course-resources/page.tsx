import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import MDXContent from '@/app/components/mdx-content'
import { notFound } from 'next/navigation'

export default async function CourseResourcesPage() {
  try {
    const posts = await getBlogPosts()
    const courseResources = posts.find(
      (post): post is BlogPost => 
        post.slug === 'course-resources' && 
        post.category === 'base'
    )

    if (!courseResources?.content?.compiledSource) {
      return (
        <section>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Resources</h1>
          <div className="prose prose-neutral dark:prose-invert">
            <p>Course resources content will be available soon.</p>
          </div>
        </section>
      )
    }

    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {courseResources.metadata.title || 'Course Resources'}
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
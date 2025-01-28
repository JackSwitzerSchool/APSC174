import { getBlogPosts, type BlogPost } from '@/app/notes/utils'
import { redirect, notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function CourseResourcesPage() {
  try {
    // Redirect to the base version of course-resources
    redirect('/base/course-resources')
    
  } catch (error) {
    console.error('Error in CourseResourcesPage:', error)
    notFound()
  }
}
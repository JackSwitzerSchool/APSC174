import { getContentBySlug } from '@/lib/content'
import { ContentNotFoundError } from '@/lib/content-types'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default async function ContentPage({ params }: { params: { slug: string } }) {
  try {
    const content = await getContentBySlug(params.slug)
    
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {content.meta.title}
        </h1>
        {content.meta.summary && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            {content.meta.summary}
          </p>
        )}
        <div className="prose prose-neutral dark:prose-invert">
          <MDXContent source={content.content} />
        </div>
        
        {/* Show related content if available */}
        {content.meta.relatedContent && content.meta.relatedContent.length > 0 && (
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="font-semibold text-xl mb-4">Related Content</h2>
            <ul className="space-y-2">
              {content.meta.relatedContent.map(slug => (
                <li key={slug}>
                  <a 
                    href={`/content/notes/${slug}`}
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {slug}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    )
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      notFound()
    }
    
    console.error('Error in ContentPage:', error)
    throw error
  }
} 
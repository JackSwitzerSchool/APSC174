/**
 * Static content component - renders pre-built HTML
 * No client-side JS needed for content rendering
 */

interface StaticContentProps {
  html: string
}

export default function StaticContent({ html }: StaticContentProps) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

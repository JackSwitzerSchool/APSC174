import Link from 'next/link'
import EmbeddedNote from './embedded-note'

export default function WikiLink({ href, children, embedded }: any) {
  // Clean up the href by removing special characters and converting to lowercase
  const cleanHref = href.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  
  // Handle special cases
  const specialRoutes: Record<string, string> = {
    'course-resources': '/course-resources',
    'webwork': '/base/webwork',
    'notation': '/notes/notation',
    'intern-v1': '/internships/intern-v1'
  }

  if (specialRoutes[cleanHref]) {
    return (
      <Link 
        href={specialRoutes[cleanHref]}
        prefetch={false}
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        {children || href}
      </Link>
    )
  }
  
  // For embedded notes
  if (embedded) {
    return <EmbeddedNote slug={cleanHref} />
  }

  // Default case - assume it's a note
  const formattedHref = `/notes/${cleanHref}`
  
  return (
    <Link 
      href={formattedHref}
      prefetch={false}
      className="text-blue-500 hover:text-blue-600 hover:underline"
    >
      {children || href}
    </Link>
  )
} 
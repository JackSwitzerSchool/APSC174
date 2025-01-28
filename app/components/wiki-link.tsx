import Link from 'next/link'
import EmbeddedNote from './embedded-note'

export default function WikiLink({ href, children, embedded }: any) {
  // Clean up the href by removing special characters and converting to lowercase
  const cleanHref = href.toLowerCase().replace(/[^a-z0-9-\.]/g, '-')
  
  // Handle PDF files
  if (cleanHref.endsWith('.pdf')) {
    return (
      <Link 
        href={`/base/${cleanHref}`}
        prefetch={false}
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        {children || href}
      </Link>
    )
  }
  
  // Handle special cases - base pages and other special routes
  const basePages = ['midterm-1', 'midterm-2', 'webwork', 'final-exam', 'course-resources']
  const specialRoutes: Record<string, string> = {
    'notation': '/notes/notation',
    'intern-v1': '/internships/intern-v1',
    'midterm-1': '/base/midterm-1'
  }

  // Check if it's a base page first
  if (basePages.includes(cleanHref)) {
    return (
      <Link 
        href={`/base/${cleanHref}`}
        prefetch={false}
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        {children || href}
      </Link>
    )
  }

  // Then check other special routes
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
import Link from 'next/link'
import EmbeddedNote from './embedded-note'

export default function WikiLink({ href, children, embedded }: any) {
  console.log('WikiLink render:', { href, children, embedded })
  
  // Ensure href is properly formatted
  const formattedHref = href.startsWith('/') ? href : `/notes/${href}`
  
  if (embedded) {
    return <EmbeddedNote slug={href} />
  }
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
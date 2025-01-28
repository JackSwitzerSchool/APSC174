import Link from 'next/link'
import { useMemo } from 'react'
import EmbeddedNote from './embedded-note'
import dynamic from 'next/dynamic'

const YouTubeEmbed = dynamic(() => import('./youtube-embed'), {
  loading: () => <div>Loading video...</div>,
  ssr: false
})

interface WikiLinkProps {
  href: string
  children?: React.ReactNode
  embedded?: boolean
}

type LinkType = 'asset' | 'note' | 'external' | 'embed'

function getLinkType(href: string): { type: LinkType; path: string } {
  // Check if it's an embed (starts with !)
  if (href.startsWith('!')) {
    return { type: 'embed', path: href.slice(1) }
  }

  // Check if it's an asset link (starts with ./)
  if (href.startsWith('./')) {
    return { type: 'asset', path: href }
  }

  // Check if it's an external link (starts with http:// or https://)
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return { type: 'external', path: href }
  }

  // Default case - it's a note link
  return { type: 'note', path: href }
}

function processEmbedLink(path: string): { type: string; id: string } {
  // Handle YouTube embeds
  if (path.startsWith('youtube:')) {
    return { type: 'youtube', id: path.split(':')[1] }
  }

  // Handle image embeds
  if (path.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
    return { type: 'image', id: path }
  }

  // Default case - treat as note embed
  return { type: 'note', id: path }
}

export default function WikiLink({ href, children, embedded = false }: WikiLinkProps) {
  const linkInfo = useMemo(() => getLinkType(href), [href])
  
  // Handle embeds
  if (linkInfo.type === 'embed') {
    const embedInfo = processEmbedLink(linkInfo.path)
    
    switch (embedInfo.type) {
      case 'youtube':
        return <YouTubeEmbed videoId={embedInfo.id} />
      case 'image':
        return (
          <img 
            src={embedInfo.id} 
            alt={children?.toString() || 'Embedded image'} 
            className="max-w-full h-auto"
          />
        )
      case 'note':
        return <EmbeddedNote slug={embedInfo.id} />
      default:
        return <div className="text-red-500">Unsupported embed type</div>
    }
  }

  // Handle asset links
  if (linkInfo.type === 'asset') {
    return (
      <Link
        href={linkInfo.path}
        prefetch={false}
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        {children || linkInfo.path}
      </Link>
    )
  }

  // Handle external links
  if (linkInfo.type === 'external') {
    return (
      <a
        href={linkInfo.path}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 hover:underline"
      >
        {children || linkInfo.path}
      </a>
    )
  }

  // Handle note links
  const cleanPath = linkInfo.path.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  return (
    <Link
      href={`/content/notes/${cleanPath}`}
      prefetch={false}
      className="text-blue-500 hover:text-blue-600 hover:underline"
    >
      {children || linkInfo.path}
    </Link>
  )
} 
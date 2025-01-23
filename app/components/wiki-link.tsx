import Link from 'next/link'
import EmbeddedNote from './embedded-note'

export default function WikiLink({ href, children, embedded }: any) {
  if (embedded) {
    return <EmbeddedNote slug={href} />
  }
  return (
    <Link href={href} prefetch={false}>
      {children}
    </Link>
  )
} 
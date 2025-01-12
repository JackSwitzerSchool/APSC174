'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const CustomLink = ({ href, ...props }: CustomLinkProps) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />
}

interface CustomImageProps {
  src?: string
  source?: string
  width?: number | string
  height?: number | string
  alt?: string
  [key: string]: any // for other props that might be passed
}

const CustomImage = (props: CustomImageProps) => {
  // Default width and height if not provided
  const width = props.width || 800
  const height = props.height || 600
  
  // Handle both src and source props
  const src = props.src || props.source || ''
  
  return (
    <div className="my-6">
      <Image 
        {...props}
        src={src}
        width={Number(width)}
        height={Number(height)}
        alt={props.alt || 'Image'}
        className="rounded-lg mx-auto"
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
        unoptimized // For static files
      />
    </div>
  )
}

export const MDXComponents = {
  a: CustomLink,
  Image
}

interface CustomMDXProps {
  source: MDXRemoteSerializeResult
}

export function CustomMDX({ source }: CustomMDXProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote {...source} components={MDXComponents} />
    </article>
  )
}

'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import type { ComponentProps } from 'react'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

// Extend the base anchor props but make href required
interface CustomLinkProps extends Omit<ComponentProps<'a'>, 'href' | 'ref'> {
  href: string
}

const CustomLink = ({ href, className, children, ...props }: CustomLinkProps) => {
  if (href.startsWith('/')) {
    return (
      <Link 
        href={href} 
        className={className}
        {...props}
      >
        {children}
      </Link>
    )
  }

  return (
    <a 
      target="_blank" 
      rel="noopener noreferrer" 
      href={href} 
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src?: string
  source?: string
}

const CustomImage = (props: CustomImageProps) => {
  const width = props.width || 800
  const height = props.height || 600
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
        unoptimized
      />
    </div>
  )
}

const components = {
  a: CustomLink,
  Image: CustomImage,
} as MDXComponentsType

interface MDXProps {
  source: MDXRemoteSerializeResult
}

export function CustomMDX({ source }: MDXProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </article>
  )
}

export { components as MDXComponents }

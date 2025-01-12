'use client'

import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import Image from 'next/image'

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} className="text-blue-500 hover:text-blue-600 hover:underline">
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a className="text-blue-500 hover:text-blue-600 hover:underline" {...props} />
  }

  return (
    <a 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:text-blue-600 hover:underline"
      {...props} 
    />
  )
}

const CustomImage = (props) => {
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
        width={width}
        height={height}
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

const components = {
  Image: CustomImage,
  img: CustomImage,  // Handle both Image and img tags
  a: CustomLink,
  p: (props) => <p className="mb-4" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal pl-6" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props) => <th className="px-4 py-2 bg-gray-50" {...props} />,
  td: (props) => <td className="px-4 py-2 border-t" {...props} />
}

export function CustomMDX({ source }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </article>
  )
}

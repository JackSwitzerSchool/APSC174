'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { highlight } from 'sugar-high'
import React from 'react'
import { MDXComponents } from 'mdx/types'

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link 
        href={href} 
        className="text-blue-500 hover:text-blue-600 hover:underline" 
        {...props}
      >
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

const RoundedImage = (props) => {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

const Code = ({ children, ...props }) => {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components: MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  code: Code
}

interface CustomMDXProps {
  source: any
}

export function CustomMDX({ source }: CustomMDXProps) {
  if (!source) {
    console.error('No source provided to CustomMDX')
    return <div>Error: No content available</div>
  }

  return (
    <MDXRemote
      {...source}
      components={components}
    />
  )
}

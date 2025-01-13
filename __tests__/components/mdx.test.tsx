import { render, screen } from '@testing-library/react'
import { CustomMDX } from '@/app/components/mdx'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

describe('CustomMDX', () => {
  it('renders markdown content correctly', () => {
    const mockSource: MDXRemoteSerializeResult = {
      compiledSource: 'Test content',
      scope: {},
      frontmatter: {}
    }

    render(<CustomMDX source={mockSource} />)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders links correctly', () => {
    const mockSource = {
      compiledSource: '<a href="/test">Test Link</a>',
      scope: {}
    }

    render(<CustomMDX source={mockSource} />)
    const link = screen.getByText('Test Link')
    expect(link).toHaveAttribute('href', '/test')
  })
}) 
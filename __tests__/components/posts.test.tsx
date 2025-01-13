import { render, screen } from '@testing-library/react'
import { BlogPosts } from '@/app/components/posts'

jest.mock('@/app/notes/utils', () => ({
  getBlogPosts: jest.fn().mockResolvedValue([{
    slug: 'test-post',
    category: 'notes',
    metadata: {
      title: 'Test Post',
      publishedAt: '2024-01-01'
    },
    content: {
      compiledSource: '',
      scope: {}
    }
  }]),
  formatDate: jest.fn().mockReturnValue('January 1, 2024')
}))

describe('BlogPosts', () => {
  it('renders posts correctly', async () => {
    const { container } = render(await BlogPosts())
    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })
}) 
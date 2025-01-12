import { render, screen } from '@testing-library/react'
import { BlogPosts } from '@/app/components/posts'

// Mock the utils module
jest.mock('@/app/notes/utils', () => ({
  getBlogPosts: jest.fn(),
  formatDate: jest.fn().mockReturnValue('January 1, 2024'),
}))

describe('BlogPosts', () => {
  it('renders posts correctly', async () => {
    const mockPosts = [{
      slug: 'test-post',
      category: 'notes',
      metadata: {
        title: 'Test Post',
        publishedAt: '2024-01-01',
      },
    }]

    // Mock getBlogPosts to return our test data
    require('@/app/notes/utils').getBlogPosts.mockResolvedValue(mockPosts)

    render(await BlogPosts())

    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })
}) 
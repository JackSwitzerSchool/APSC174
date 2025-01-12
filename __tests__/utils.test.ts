import { getBlogPosts } from '@/app/notes/utils'
import fs from 'fs'

describe('getBlogPosts', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('should handle empty directories', async () => {
    // Mock fs.readdir to return empty array
    ;(fs.promises.readdir as jest.Mock).mockResolvedValue([])

    const posts = await getBlogPosts()
    expect(posts).toEqual([])
  })

  it('should process markdown files correctly', async () => {
    // Mock file system operations
    ;(fs.promises.readdir as jest.Mock).mockResolvedValue(['test.md'])
    ;(fs.promises.readFile as jest.Mock).mockResolvedValue(`---
title: Test Post
publishedAt: 2024-01-01
---
Test content`)

    const posts = await getBlogPosts()
    expect(posts[0]).toMatchObject({
      metadata: {
        title: 'Test Post',
        publishedAt: '2024-01-01',
      },
      slug: 'test',
    })
  })

  it('should handle file system errors gracefully', async () => {
    // Mock fs.readdir to throw error
    ;(fs.promises.readdir as jest.Mock).mockRejectedValue(new Error('Test error'))

    const posts = await getBlogPosts()
    expect(posts).toEqual([])
  })
}) 
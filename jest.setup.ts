import '@testing-library/jest-dom'

// Mock the fs module
jest.mock('fs', () => ({
  promises: {
    readdir: jest.fn(),
    readFile: jest.fn(),
  },
  existsSync: jest.fn().mockReturnValue(true),
}))

// Mock process.cwd()
process.cwd = jest.fn().mockReturnValue('/fake/path')

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock next-mdx-remote
jest.mock('next-mdx-remote', () => ({
  MDXRemote: ({ children }) => <div>{children}</div>,
  serialize: jest.fn().mockResolvedValue({ compiledSource: '', scope: {} })
}))

// Console warning/error suppression for cleaner test output
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
} 
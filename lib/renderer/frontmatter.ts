/**
 * Simple frontmatter parser - replaces gray-matter
 * Handles the YAML subset used in our markdown files:
 * - Simple key: value pairs
 * - Arrays with - syntax
 * - Arrays with [] syntax
 * - Quoted strings, booleans, numbers
 */

export interface ParsedFrontmatter {
  data: Record<string, unknown>
  content: string
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(markdown: string): ParsedFrontmatter {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: markdown }
  }

  const [, yamlContent, content] = match
  const data = parseSimpleYaml(yamlContent)

  return { data, content }
}

/**
 * Parse simple YAML (subset used in frontmatter)
 */
function parseSimpleYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const lines = yaml.split('\n')

  let currentKey: string | null = null
  let currentArray: unknown[] | null = null

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue

    // Check for array item (starts with -)
    const arrayItemMatch = line.match(/^\s+-\s+(.+)$/)
    if (arrayItemMatch && currentKey && currentArray) {
      currentArray.push(parseValue(arrayItemMatch[1].trim()))
      continue
    }

    // Check for key: value pair
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/)
    if (keyValueMatch) {
      // Save previous array if exists
      if (currentKey && currentArray) {
        result[currentKey] = currentArray
      }

      const [, key, rawValue] = keyValueMatch
      const value = rawValue.trim()

      if (value === '') {
        // Start of array
        currentKey = key
        currentArray = []
      } else {
        // Simple key-value
        currentKey = null
        currentArray = null
        result[key] = parseValue(value)
      }
    }
  }

  // Save final array if exists
  if (currentKey && currentArray) {
    result[currentKey] = currentArray
  }

  return result
}

/**
 * Parse a YAML value to its appropriate type
 */
function parseValue(value: string): unknown {
  // Remove quotes if present
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }

  // Check for inline array [item1, item2]
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1)
    if (!inner.trim()) return []
    return inner.split(',').map(item => parseValue(item.trim()))
  }

  // Boolean
  if (value === 'true') return true
  if (value === 'false') return false

  // Number
  const num = Number(value)
  if (!isNaN(num) && value !== '') return num

  // String (unquoted)
  return value
}

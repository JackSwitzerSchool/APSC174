/**
 * Pre-build script that compiles all markdown notes to static HTML at build time
 * Run with: npx tsx scripts/prebuild-content.ts
 */

import fs from 'fs'
import path from 'path'
import { renderMarkdownWithMeta } from '../lib/renderer'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'notes')
const OUTPUT_FILE = path.join(process.cwd(), '.content-cache.json')

interface CompiledNote {
  slug: string
  html: string
  frontmatter: {
    title: string
    type?: string
    category?: string
    order?: number
    tags?: string[]
    publishedAt?: string
    summary?: string
    relatedContent?: string[]
    isPublished?: boolean
    displayInNotes?: boolean
  }
}

interface ContentCache {
  buildTime: string
  notes: Record<string, CompiledNote>
}

async function prebuildContent() {
  console.log('📚 Pre-building content...')
  const startTime = Date.now()

  // Read all markdown files
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} markdown files`)

  const notes: Record<string, CompiledNote> = {}

  for (const file of files) {
    const slug = file.replace(/\.md$/, '').toLowerCase()
    const filePath = path.join(CONTENT_DIR, file)
    const markdown = fs.readFileSync(filePath, 'utf-8')

    try {
      const { html, frontmatter } = await renderMarkdownWithMeta(markdown)

      notes[slug] = {
        slug,
        html,
        frontmatter: frontmatter as CompiledNote['frontmatter'],
      }

      console.log(`  ✓ ${slug}`)
    } catch (error) {
      console.error(`  ✗ ${slug}: ${error}`)
    }
  }

  // Write cache file
  const cache: ContentCache = {
    buildTime: new Date().toISOString(),
    notes,
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cache, null, 2))

  const duration = Date.now() - startTime
  console.log(`\n✅ Pre-built ${Object.keys(notes).length} notes in ${duration}ms`)
  console.log(`📦 Cache written to ${OUTPUT_FILE}`)
}

prebuildContent().catch(console.error)

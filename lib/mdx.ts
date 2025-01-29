import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkWikiLink from 'remark-wiki-link'

interface SerializeOptions {
  parseFrontmatter?: boolean
}

export async function serializeMDX(content: string, options: SerializeOptions = {}) {
  return serialize(content, {
    parseFrontmatter: options.parseFrontmatter,
    mdxOptions: {
      remarkPlugins: [
        remarkMath,
        [remarkWikiLink, {
          pageResolver: (name: string) => {
            // Convert wiki-link format to our route format
            // [[vector-space|Vector Space]] -> /content/notes/vector-space
            const parts = name.split('|')
            const slug = parts[0].toLowerCase().trim()
            return [`/content/notes/${slug}`]
          },
          hrefTemplate: (permalink: string) => permalink,
          aliasDivider: '|',
        }],
      ],
      rehypePlugins: [rehypeKatex],
    },
  })
} 
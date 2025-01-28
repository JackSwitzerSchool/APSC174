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
            const slug = name.split('|')[0].toLowerCase()
            return [`/content/notes/${slug}`]
          },
          hrefTemplate: (permalink: string) => permalink,
        }],
      ],
      rehypePlugins: [rehypeKatex],
    },
  })
} 
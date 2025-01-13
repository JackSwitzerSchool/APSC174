declare module 'remark-wiki-link' {
  import type { Plugin } from 'unified'
  import type { Root } from 'mdast'

  interface WikiLinkOptions {
    pageResolver?: (name: string) => string[]
    hrefTemplate?: (permalink: string) => string
    aliasDivider?: string
    wikiLinkClassName?: string
    newClassName?: string
  }

  const remarkWikiLink: Plugin<[WikiLinkOptions?], Root>
  export = remarkWikiLink
}
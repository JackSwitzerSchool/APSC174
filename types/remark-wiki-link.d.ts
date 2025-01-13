declare module 'remark-wiki-link' {
  import { Plugin } from 'unified'

  interface WikiLinkOptions {
    pageResolver?: (name: string) => string[]
    hrefTemplate?: (permalink: string) => string
    aliasDivider?: string
    wikiLinkClassName?: string
    newClassName?: string
    hrefTemplate?: (permalink: string) => string
  }

  const remarkWikiLink: Plugin<[WikiLinkOptions?]>
  export default remarkWikiLink
}
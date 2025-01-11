import 'katex/dist/katex.min.css'
import katex from 'katex'

export function InlineMath({ children }: { children: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode: false,
          throwOnError: false,
        }),
      }}
    />
  )
}

export function BlockMath({ children }: { children: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode: true,
          throwOnError: false,
        }),
      }}
    />
  )
} 
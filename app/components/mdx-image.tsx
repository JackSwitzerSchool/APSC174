import Image from 'next/image'
import { memo } from 'react'

interface MDXImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
}

export default memo(function MDXImage({ src, alt = '', width = 800, height = 400 }: MDXImageProps) {
  return (
    <div className="relative w-full h-auto my-4">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}) 
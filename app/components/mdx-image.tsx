import Image from 'next/image'

export default function MDXImage({ src, alt = '', ...props }: any) {
  if (!src) return null
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      loading="lazy"
      {...props}
    />
  )
} 
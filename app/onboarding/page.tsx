'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  return (
    <iframe
      src="/animation.html"
      className="w-full h-screen border-0"
      title="Welcome Animation"
    />
  )
} 
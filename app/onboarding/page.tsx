'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen -mt-16">
      <iframe
        src="/assorted/animation.html"
        className="w-full max-w-3xl h-screen border-0 overflow-hidden"
        title="Welcome Animation"
        scrolling="no"
      />
    </div>
  )
} 
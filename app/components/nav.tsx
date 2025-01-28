'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Content, ContentType } from '@/lib/content-types'

// Static nav items that are always present
const staticNavItems = {
  '/': {
    name: 'home',
    order: 0
  },
  '/content/notes': {
    name: 'notes',
    order: 1
  },
  '/content/tutorials': {
    name: 'tutorials',
    order: 2
  }
}

export function Navbar() {
  const pathname = usePathname() || '/'
  const [dynamicNavItems, setDynamicNavItems] = useState<Record<string, { name: string, order: number }>>({})

  useEffect(() => {
    // Fetch navigation items from content API
    async function loadNavItems() {
      try {
        const response = await fetch('/api/content?type=page&displayInNotes=true')
        if (!response.ok) throw new Error('Failed to fetch navigation items')
        
        const data: Content[] = await response.json()
        
        // Convert content items to nav items
        const items = data.reduce((acc, item) => {
          acc[`/content/${item.meta.slug}`] = {
            name: item.meta.title.toLowerCase(),
            order: item.meta.order || 99 // Default to end if no order specified
          }
          return acc
        }, {} as Record<string, { name: string, order: number }>)

        setDynamicNavItems(items)
      } catch (error) {
        console.error('Error loading navigation items:', error)
      }
    }

    loadNavItems()
  }, [])

  // Combine static and dynamic nav items
  const allNavItems = { ...staticNavItems, ...dynamicNavItems }

  // Sort nav items by order
  const sortedNavItems = Object.entries(allNavItems)
    .sort(([, a], [, b]) => a.order - b.order)

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {sortedNavItems.map(([path, { name }]) => {
              const isActive = pathname === path ||
                (path !== '/' && pathname.startsWith(path))

              return (
                <Link
                  key={path}
                  href={path}
                  className={`
                    transition-all hover:text-neutral-800 dark:hover:text-neutral-200 
                    flex align-middle relative py-1 px-2 m-1
                    ${isActive ? 'font-semibold' : ''}
                  `}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}

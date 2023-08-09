'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { icons } from 'lucide-react'

import type { SideNav } from '@/types/nav'
import { cn } from '@/lib/utils'

export interface SidebarNavProps {
  items: SideNav[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className='flex w-full flex-col gap-2'>
      {items.map((item) => {
        // @ts-ignore
        const LucideIcon = icons[item.icon]

        return item.url ? (
          <Link
            key={item.name}
            href={item.url}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            <span
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                pathname === item.url
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <LucideIcon className='mr-2 h-5 w-5' />
              <span>{item.name}</span>
            </span>
          </Link>
        ) : (
          <span
            key={item.name}
            className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
          >
            {item.name}
          </span>
        )
      })}
    </div>
  )
}

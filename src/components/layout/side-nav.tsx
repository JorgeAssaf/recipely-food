'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { SidebarNavItem } from '@/types/nav'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className='flex w-full flex-col gap-2'>
      {items[0].items.map((item, i) => {
        // @ts-ignore
        const LucideIcon = Icons[item.icon]! || Icons.book

        return item.href ? (
          <Link
            key={i}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            <span
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                pathname === item.href
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <LucideIcon className='mr-2 h-5 w-5' aria-hidden='true' />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={item.title + i}
            className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}

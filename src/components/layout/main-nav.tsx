'use client'

import { forwardRef, type FC } from 'react'
import Link from 'next/link'
import { Pizza } from 'lucide-react'

import type { MainNavItem } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { cn, toTitleCase } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

interface MainNavProps {
  items?: MainNavItem[]
}

export const MainNav: FC<MainNavProps> = ({ items }) => {
  return (
    <div className='hidden gap-6 lg:flex'>
      <Link
        aria-label='Home'
        href='/'
        className='hidden items-center space-x-2 lg:flex'
      >
        <Pizza className='h-6 w-6' aria-hidden='true' />
        <span className='hidden font-bold lg:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item, i) =>
              item.items ? (
                <NavigationMenuItem key={item.title + i}>
                  <NavigationMenuTrigger className='h-auto capitalize'>
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                      {item.items.map((item, i) => (
                        <ListItem
                          aria-label={item.title}
                          key={item.title + i}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description} a
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title + i}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(navigationMenuTriggerStyle(), 'h-auto')}
                      aria-label={item.title}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              ),
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={`${href}`}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>
            {toTitleCase(title!)}
          </div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

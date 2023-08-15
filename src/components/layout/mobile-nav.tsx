'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, Pizza } from 'lucide-react'

import type { MainNavItem } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface MobileNavProps {
  mainNavItemItems?: MainNavItem[]
  // sidebarNavItems: SidebarNavItem[]
}

export function MobileNav({ mainNavItemItems }: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden'
        >
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pl-1 pr-0'>
        <div className='px-7'>
          <Link
            aria-label='Home'
            href='/'
            className='flex items-center'
            onClick={() => setIsOpen(false)}
          >
            <Pizza className='mr-2 h-4 w-4' aria-hidden='true' />
            <span className='font-bold'>{siteConfig.name}</span>
          </Link>
        </div>

        <ScrollArea className='my-4 h-[calc(100vh-8rem)] px-6 pb-10'>
          {mainNavItemItems?.map((item, index) =>
            item.items ? (
              <Accordion type='single' collapsible key={index}>
                <AccordionItem value={item.title}>
                  <AccordionTrigger className='py-1 text-sm capitalize'>
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col'>
                      {item.items.map((item, index) => (
                        <MobileLink
                          href={item.href!}
                          key={index + item.title}
                          className='flex flex-col gap-y-3'
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          <span className='text-sm capitalize'>
                            {item.title}
                          </span>
                        </MobileLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              item.href && (
                <div className='flex flex-col space-y-4 font-medium'>
                  <MobileLink
                    href={item.href}
                    key={index + item.title}
                    pathname={pathname}
                    setIsOpen={setIsOpen}
                  >
                    <span className='text-sm capitalize'>{item.title}</span>
                  </MobileLink>
                </div>
              )
            ),
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  className?: string
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  className,
  pathname,
  setIsOpen,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { AvatarImage } from '@radix-ui/react-avatar'
import { LayoutDashboard, User2 } from 'lucide-react'

import { siteConfig } from '@/config/site'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback } from '../ui/avatar'
import MainNav from './main-nav'

const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <MainNav items={siteConfig.mainNav} />

        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src='/avatar.jpg' alt='avatar' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {/* {user.firstName} {user.lastName} */}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {/* {email} */}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/account'>
                    <User2 className='mr-2 h-4 w-4' aria-hidden='true' />
                    Account
                    <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>
                    <LayoutDashboard
                      className='mr-2 h-4 w-4'
                      aria-hidden='true'
                    />
                    Dashboard
                    <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default SiteHeader

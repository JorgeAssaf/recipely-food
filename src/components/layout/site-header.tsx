'use client'

import { type FC } from 'react'
import Link from 'next/link'
import { User } from '@clerk/nextjs/server'
import { AvatarImage } from '@radix-ui/react-avatar'
import { LayoutDashboard, LogOut, User2 as UserIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
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
import { buttonVariants } from '../ui/button'
import MainNav from './main-nav'

interface SiteHeaderProps {
  user: User | null
}

const SiteHeader: FC<SiteHeaderProps> = ({ user }) => {
  if (!user) null
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId,
  )?.emailAddress

  const initials = user?.firstName?.at(0) + user?.lastName?.at(0)!

  return (
    <header className='sticky top-0 z-40 w-full bg-background'>
      <div className='container flex h-20 items-center'>
        <MainNav items={siteConfig.mainNav} />

        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className={cn('h-10 w-10')}>
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user?.firstName + user?.lastName!}
                    />
                    <AvatarFallback>
                      <span>{initials}</span>
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/account'>
                      <UserIcon className='mr-2 h-4 w-4' aria-hidden='true' />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/recipes'>
                      <LayoutDashboard
                        className='mr-2 h-4 w-4'
                        aria-hidden='true'
                      />
                      Dashboard
                      <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/signout'>
                      <LogOut className='mr-2 h-4 w-4' aria-hidden='true' />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href='/sign-in' className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
export default SiteHeader

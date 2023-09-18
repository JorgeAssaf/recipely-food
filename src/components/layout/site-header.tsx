import { type FC } from 'react'
import Link from 'next/link'
import { User } from '@clerk/nextjs/server'
import {
  BookmarkIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  User2 as UserIcon,
} from 'lucide-react'

import { dashboardConfig } from '@/config/dashboard'
import { siteConfig } from '@/config/site'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Combobox from '../combobox'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button, buttonVariants } from '../ui/button'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

interface SiteHeaderProps {
  user: User | null
}

const SiteHeader: FC<SiteHeaderProps> = ({ user }) => {
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId,
  )?.emailAddress

  const initials = user?.firstName?.at(0) + user?.lastName?.at(0)!

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <MainNav items={siteConfig.MainNavItem} />
        <MobileNav
          mainNavItems={siteConfig.MainNavItem}
          dashboardItem={dashboardConfig.sidebarNav}
        />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <Combobox />
            {user ? (
              <Link
                href='/dashboard/recipes'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'icon',
                })}
              >
                <BookmarkIcon className='h-6 w-6' aria-hidden='true' />
                <span className='sr-only'>View saved recipes</span>
              </Link>
            ) : null}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label='Open user menu'
                    variant='secondary'
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={user.imageUrl ?? ''}
                        loading='lazy'
                        alt={user.username ?? ''}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user.firstName ?? user.username} {user.lastName ?? ''}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href='dashboard/account'>
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
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href='/dashboard/settings'>
                        <Settings className='mr-2 h-4 w-4' aria-hidden='true' />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
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
              <Link
                href='/signin'
                className={buttonVariants({
                  size: 'sm',
                })}
              >
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

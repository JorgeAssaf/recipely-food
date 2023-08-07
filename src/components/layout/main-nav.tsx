'use client'
import type { FC } from 'react'
import Link from 'next/link'
// import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { MainNav } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { Logo } from '../icons'
interface MainNavProps {
  items: MainNav[]

}
const MainNav: FC<MainNavProps> = ({ items }) => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
      <div className='hidden h-10 items-center md:flex gap-10'>
        <Link
          aria-label="Home"
          href="/"
          className=" items-center space-x-2 flex"
        >
          <Logo className="h-6 w-6" aria-hidden="true" />
          <span className=" text-lg font-bold ">
            {siteConfig.name}
          </span>
        </Link>

        <div className='flex gap-6 items-center'>
          {items?.slice(1).map((item) => (
            <MenuLink
              pathname={pathname}
              key={item.name}
              href={item.url}
              className=' font-medium'
            >
              {item.name}
            </MenuLink>
          ))}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </>
  )
}

export default MainNav
interface MenuLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  pathname: string
  className?: string
}

function MenuLink({
  children,
  href,
  disabled,
  pathname,
  className,
}: MenuLinkProps) {
  return (
    <Link
      href={`${href}`}
      className={cn(
        'text-foreground transition-colors hover:text-primary/90',
        pathname === href && 'text-muted-foreground',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
    >
      {children}
    </Link>
  )
}

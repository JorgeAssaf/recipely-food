import { currentUser } from '@clerk/nextjs'

import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'

interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const user = await currentUser()

  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}

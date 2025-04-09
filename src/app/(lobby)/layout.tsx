import { currentUser } from '@clerk/nextjs/server'

import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'

export default async function LobbyLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}

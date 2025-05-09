import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import { dashboardConfig } from '@/config/dashboard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNav } from '@/components/layout/side-nav'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <aside className='fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r-2 md:sticky md:block'>
          <ScrollArea className='py-6 pr-6 lg:py-8'>
            <SidebarNav items={dashboardConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        <main className='flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  )
}

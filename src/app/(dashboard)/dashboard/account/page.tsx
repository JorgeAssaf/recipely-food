import type { Metadata } from 'next'

import { UserProfile } from '@/components/auth/user-profile'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Account',
  description: 'Manage your account settings',
}

export default function AccountPage() {
  return (
    <Shell variant='sidebar'>
      <PageHeader
        id='account-header'
        aria-labelledby='account-header-heading'
        title='Account'
      >
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>

      <section
        id='user-account-info'
        aria-labelledby='user-account-info-heading'
        className='w-full overflow-hidden'
      >
        <UserProfile />
      </section>
    </Shell>
  )
}

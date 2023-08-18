import type { Metadata } from 'next'

import { Heading } from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'View all categories',
}

export default async function CategotyPage() {
  return (
    <Shell as='div' className='py-3'>
      <PageHeader
        size='sm'
        title='Categories'
        description='View all categories'
      />
    </Shell>
  )
}

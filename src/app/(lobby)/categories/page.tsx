import { Heading } from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export default async function CategotyPage() {
  return (
    <Shell as='div' className='py-3'>
      <PageHeader size='sm' title='Categories' description='View all categories' />
    </Shell>
  )
}

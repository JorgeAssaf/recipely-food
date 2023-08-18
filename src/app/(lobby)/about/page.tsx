import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Recipes',
}
export default function AboutPage() {
  return (
    <Shell>
      <PageHeader size='sm' title='About' description='About the Recipes' />
    </Shell>
  )
}

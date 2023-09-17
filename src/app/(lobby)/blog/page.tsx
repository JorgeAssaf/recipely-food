import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the new Recipes',
}

export default function BlogPage() {
  return (
    <Shell>
      <PageHeader title='Blog' description='Read the new Recipes' />
    </Shell>
  )
}

import type { Metadata } from 'next'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Blog',
  description: 'Read the new Recipes',
}

export default function BlogPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <PageHeaderDescription>Read the new Recipes</PageHeaderDescription>
      </PageHeader>
    </Shell>
  )
}

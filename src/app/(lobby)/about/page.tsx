import type { Metadata } from 'next'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'About',
  description: 'About the Recipes',
}
export default function AboutPage() {
  return (
    <Shell as='section'>
      <PageHeader>
        <PageHeaderHeading>About</PageHeaderHeading>
        <PageHeaderDescription>About the Recipes</PageHeaderDescription>
      </PageHeader>
    </Shell>
  )
}

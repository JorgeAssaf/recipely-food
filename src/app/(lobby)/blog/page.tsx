import type { Metadata } from 'next'
import { allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'

import { PostCard } from '@/components/cards/post-card'
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
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <Shell>
      <div>
        <PageHeader>
          <PageHeaderHeading>Blog</PageHeaderHeading>
          <PageHeaderDescription>Read the new Recipes</PageHeaderDescription>
        </PageHeader>
      </div>
      <div className='py-8'>
        {posts.length > 0 ? (
          posts.map((post, idx) => <PostCard key={idx} {...post} />)
        ) : (
          <div>No posts</div>
        )}
      </div>
    </Shell>
  )
}

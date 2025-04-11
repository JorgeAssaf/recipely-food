import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'

import { Mdx } from '@/components/mdx/mdx-component'

import '@/styles/mdx.css'

import Link from 'next/link'
import { allPosts } from 'content-collections'
import { ChevronLeftIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MdxPager } from '@/components/mdx/mdx-pager'
import { Shell } from '@/components/shell'

interface PostPageProps {
  readonly params: Promise<{
    slug: string
  }>
}
// eslint-disable-next-line @typescript-eslint/require-await
async function getPostFromParams(params: PostPageProps['params']) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }
  return {
    title: post?.title,
    description: post?.description,
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const posts = allPosts

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const PostLayout = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <Shell as={'section'} variant={'markdown'} className='relative'>
      <Link
        href='/blog'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden text-muted-foreground xl:inline-flex',
        )}
      >
        <ChevronLeftIcon className='mr-2 h-4 w-4' aria-hidden='true' />
        See all posts
      </Link>
      <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <time dateTime={post.date} className='mb-1 text-xs text-primary/70'>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
      </div>
      <h1 className='mb-7 inline-block text-4xl font-bold leading-tight lg:text-5xl'>
        {post.title}
      </h1>
      <Mdx code={post.mdx} />

      <div className='mt-12'>
        <MdxPager currentPost={post} allPosts={allPosts} />
      </div>
    </Shell>
  )
}

export default PostLayout

import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

interface MdxPagerItem {
  title: string
  slug: string
}

interface MdxPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPost: MdxPagerItem
  allPosts: MdxPagerItem[]
}

export const MdxPager = ({
  currentPost,
  className,
  allPosts,
  ...props
}: MdxPagerProps) => {
  const pager = getPerger(currentPost, allPosts)
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {pager?.previousPost ? (
        <Link
          aria-label='Previous post'
          href={pager.previousPost.slug}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-muted-foreground',
          )}
        >
          <ChevronLeftIcon className='mr-2 h-4 w-4' aria-hidden='true' />
          {pager.previousPost.title}
        </Link>
      ) : null}
      {pager?.nextPost ? (
        <Link
          aria-label='Next post'
          href={pager.nextPost.slug}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-muted-foreground',
          )}
        >
          {pager.nextPost.title}
          <ChevronRightIcon className='ml-2 h-4 w-4' aria-hidden='true' />
        </Link>
      ) : null}
    </div>
  )
}

function getPerger(currentPost: MdxPagerItem, allPosts: MdxPagerItem[]) {
  const allFlattenedPosts = allPosts.flat()
  const currentIndex = allFlattenedPosts.findIndex(
    (link) => link.slug === currentPost.slug,
  )
  const nextPost =
    currentIndex !== allFlattenedPosts.length - 1
      ? allFlattenedPosts[currentIndex + 1]
      : null
  const previousPost =
    currentIndex !== 0 ? allFlattenedPosts[currentIndex - 1] : null

  return {
    nextPost,
    previousPost,
  }
}

import Link from 'next/link'
import { type Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

export function PostCard(post: Post) {
  return (
    <div className='mb-8 max-w-sm'>
      <h2 className='line-clamp-1 text-3xl'>
        <Link href={post.slug}>{post.title}</Link>
      </h2>
      <time dateTime={post.date} className='mb-2 block text-xs text-primary/70'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

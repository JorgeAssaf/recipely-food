import Link from 'next/link'
import type { Post } from 'content-collections'
import { format, parseISO } from 'date-fns'

export function PostCard(post: Post) {
  return (
    <div className='mb-8 max-w-sm'>
      <h2 className='line-clamp-1 text-3xl'>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <time dateTime={post.date} className='text-primary/70 mb-2 block text-xs'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

import Link from 'next/link'
import { type Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { Mdx } from '../mdx/mdx-component'

export function PostCard(post: Post) {

  return (
    <div className='mb-8 max-w-xs'>
      <h2 className='text-3xl'>
        <Link
          href={post.slug}
          className='text-blue-700 hover:text-blue-900'
          legacyBehavior
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className='mb-2 block text-xs text-primary/70'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className='line-clamp-1 text-sm'>
        <Mdx code={post.body.code} />
      </div>
    </div>
  )
}

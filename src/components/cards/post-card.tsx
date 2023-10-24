import Link from 'next/link'
import { type Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getMDXComponent } from 'next-contentlayer/hooks'

export function PostCard(post: Post) {
  const Content = getMDXComponent(post.body.code)

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
        <Content />
      </div>
    </div>
  )
}

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getMDXComponent } from 'next-contentlayer/hooks'

interface PostPageProps {
  readonly params: {
    slug: string[]
  }
}
// eslint-disable-next-line @typescript-eslint/require-await
async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/')
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
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

const PostLayout = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const Content = getMDXComponent(post.body.code)
  return (
    <article className='mx-auto max-w-[75ch] py-8'>
      <div className='mb-2'>
        <time dateTime={post.date} className='mb-1 text-xs text-primary/70'>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Content />
    </article>
  )
}

export default PostLayout

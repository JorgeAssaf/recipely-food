import type { ServerRuntime } from 'next'
import { ImageResponse } from 'next/server'

export const runtime: ServerRuntime = 'edge'

export function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const parsedValues = Object.fromEntries(url.searchParams)

    const { mode, title, description, type } = parsedValues
    const paint = mode === 'dark' ? '#fff' : '#000'
    return new ImageResponse(
      (
        <div
          tw='flex h-full w-full flex-col items-center justify-center'
          style={{
            color: paint,
            background: mode === 'dark' ? 'black' : 'white',
          }}
        >
          <div tw='flex flex-col items-center justify-center text-3xl'>
            <svg
              width='130'
              height='130'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              aria-hidden='true'
            >
              <path d='M15 11h.01'></path>
              <path d='M11 15h.01'></path>
              <path d='M16 16h.01'></path>
              <path d='m2 16 20 6-6-20A20 20 0 0 0 2 16'></path>
              <path d='M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4'></path>
            </svg>
          </div>
          <div
            tw='mt-10 flex max-w-4xl flex-col items-center justify-center'
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {type ? (
              <div tw='px-8 text-xl font-medium uppercase leading-tight tracking-tight dark:text-zinc-50'>
                {type}
              </div>
            ) : null}
            <div tw='px-8 text-6xl font-extrabold leading-tight tracking-tight dark:text-zinc-50'>
              {title}
            </div>
            {description ? (
              <div tw='mt-5 px-20 text-center text-3xl font-normal leading-tight tracking-tight text-zinc-400'>
                {description}
              </div>
            ) : null}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    error instanceof Error
      ? console.log(`${error.message}`)
      : console.log(error)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

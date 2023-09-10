'use client'

import { useCallback, useTransition, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Recipes } from '@/db/schema'
import { ArrowUpRight, XCircle } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import Combobox from './combobox'
import { Icons } from './icons'
import SortButton from './sort-button'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface RecipeSectionProps {
  sortOptions: {
    label: string
    value: string
  }[]
  recipes: Recipes[]
}

export const RecipesSection: FC<RecipeSectionProps> = ({
  sortOptions,
  recipes,
}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const category = searchParams.get('category')

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams],
  )

  return (
    <>
      <section className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold md:text-5xl'>Recipes</h2>
        <SortButton sortOptions={sortOptions} />
      </section>
      <section className='grid grid-cols-1 gap-6 md:grid-cols-[150px_minmax(0,1fr)]  '>
        <div>
          <div className='flex flex-row flex-wrap gap-3 md:flex-col'>
            {siteConfig.recipeNav.map((item) => {
              const LucideIcon = Icons[item.title]
              return (
                <Button
                  variant='secondary'
                  disabled={isPending}
                  className={cn(
                    'justify-start space-x-2 text-sm capitalize transition-colors hover:bg-[hsl(343,88%,66%)] md:text-base',
                    {
                      'bg-[hsl(343,88%,66%)]': category === item.title,
                    },
                  )}
                  key={item.title}
                  aria-label={item.title}
                  onClick={() => {
                    startTransition(async () => {
                      await router.push(
                        `${pathname}?${createQueryString({
                          category: item.title,
                        })}`,
                        {
                          scroll: false,
                        },
                      )
                    })
                  }}
                >
                  <LucideIcon className='h-5 w-5' aria-hidden='true' />
                  <span>{item.title}</span>
                </Button>
              )
            })}
          </div>
        </div>
        <div className='flex w-full flex-col items-center gap-10 md:flex-row '>
          <div className='group relative h-full w-full '>
            <Image
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 '
              width={500}
              height={500}
              priority
              alt='Picture of the author'
              className='h-[250px] w-full transform rounded-2xl object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-40 md:h-[350px]'
            />
            <div className='absolute inset-0 flex h-full items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100'>
              <Link
                href='/recipes/1'
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                  }),
                  'text-sm capitalize transition-colors hover:bg-[hsl(343,88%,66%)] md:text-base',
                )}
                aria-label='View recipe'
              >
                <span>View category</span>
                <ArrowUpRight className='ml-2 h-5 w-5' aria-hidden='true' />
              </Link>
            </div>
          </div>

          {recipes.length > 0 ? (
            <div className='grid w-full grid-cols-1 flex-row gap-4 xs:grid-cols-2 md:flex md:w-full md:flex-col'>
              {recipes.slice(0, 2).map((recipe) =>
                isPending ? (
                  <Skeleton className='h-[182px] w-full' key={recipe.id} />
                ) : (
                  <div
                    className='my-2 h-full rounded-lg bg-rose-300 p-3 shadow-lg '
                    key={recipe.id}
                  >
                    <h3 className=' truncate text-lg font-semibold lg:text-2xl'>
                      {recipe.name}
                    </h3>
                    <Badge size='md'>{recipe.category}</Badge>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                      <p className='border-muted-foreground text-sm  md:border-r-2 md:pr-3 lg:text-lg'>
                        Dificulty:
                        <span className='font-bold'>{recipe.difficulty}</span>
                      </p>
                      <p className='text-sm lg:text-lg '>
                        Cooking time:
                        <span className='font-bold'>{recipe.prepTime} min</span>
                      </p>
                    </div>
                    <Link
                      href='/recipes/1'
                      className={buttonVariants({
                        className: cn('mt-2 text-sm lg:text-lg'),
                        variant: 'secondary',
                        size: 'sm',
                      })}
                    >
                      View recipe
                    </Link>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className='items-center md:w-10/12'>
              <div className='flex flex-col items-center justify-center'>
                <XCircle className='h-20 w-20' aria-hidden='true' />
                <p className=' mt-3 font-medium text-muted-foreground'>
                  No recipes found
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

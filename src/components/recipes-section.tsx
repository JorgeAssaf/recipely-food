'use client'

import { useCallback, useTransition, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Recipes } from '@/db/schema'
import { Clock, Utensils, XCircle } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { cn, formatPrepTime, slugify } from '@/lib/utils'

import { Icons } from './icons'
import SortButton from './sort-button'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface RecipeSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  sortOptions: {
    label: string
    value: string
  }[]
  recipes: Recipes[]
}

export const RecipesSection: FC<RecipeSectionProps> = ({
  sortOptions,
  recipes,
  className,
}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const category = searchParams.get('category') ?? 'breakfast'

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
      <section className={cn('flex items-center justify-between', className)}>
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
                    'grow basis-1/6 justify-center space-x-2 text-sm capitalize transition-colors hover:bg-color-accent md:justify-start md:text-base',
                    {
                      'bg-color-accent': category === item.title,
                    },
                  )}
                  key={item.title}
                  aria-label={item.title}
                  onClick={() => {
                    startTransition(() => {
                      router.push(
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
        <div className='flex w-full flex-col items-center gap-5 md:flex-row '>
          <div className='group relative h-full w-full '>
            <Image
              src={`/images/${category}.webp`}
              width={500}
              height={500}
              priority
              alt={category}
              className='h-[250px] w-full rounded-2xl object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-40 md:h-[405px]'
            />

            <div className='absolute inset-0 flex h-full items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100'>
              <Link
                href={`/categories/category/${category}`}
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                  }),
                  'text-sm capitalize transition-colors hover:bg-color-accent md:text-base',
                )}
                aria-label='View recipe'
              >
                <p>View category</p>
              </Link>
            </div>
          </div>

          {recipes.length > 0 ? (
            <div className='grid w-full grid-cols-1 flex-row gap-4 text-foreground sx:grid-cols-2 md:flex md:flex-col'>
              {recipes.map((recipe) =>
                isPending ? (
                  <Skeleton className='h-[190px] w-full' key={recipe.id} />
                ) : (
                  <div
                    className='space-y-3 rounded-md border-2 border-muted-foreground p-4'
                    key={recipe.id}
                  >
                    <h3 className='truncate text-xl font-semibold lg:text-3xl'>
                      {recipe.name}
                    </h3>
                    <Badge size='md' className='text-sm capitalize'>
                      {recipe.category}
                    </Badge>
                    <div className='flex flex-col gap-2 md:flex-row'>
                      <p className='flex items-center gap-2 md:border-l-2 md:pl-2 md:pr-3'>
                        <Utensils className='h-5 w-5' aria-hidden='true' />

                        <span className='font-bold capitalize'>
                          {recipe.difficulty}
                        </span>
                      </p>
                      <p className='flex items-center gap-2 md:border-l-2  md:px-3'>
                        <Clock className='h-5 w-5' aria-hidden='true' />
                        <span className='font-bold'>
                          {formatPrepTime(recipe.prepTime)}
                        </span>
                      </p>
                    </div>
                    <Link
                      href={`/recipe/${slugify(recipe.name)}`}
                      className={cn(
                        buttonVariants({
                          variant: 'secondary',
                          size: 'sm',
                        }),
                        'text-sm capitalize transition-colors hover:bg-color-accent md:text-base',
                      )}
                    >
                      View recipe
                    </Link>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className='w-full items-center'>
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

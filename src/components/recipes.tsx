'use client'

import type { FC } from 'react'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type Recipes as RecipesSchema } from '@/db/schema'

import { type Option } from '@/types/recipes'
import { sortOptions } from '@/config/recipes'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'

import { RecipeCard } from './cards/recipe-card'
import { MultiSelect } from './multi-select'
import { PaginationButton } from './pagination-buttons'
import SortButton from './sort-button'

interface RecipesProps extends React.HTMLAttributes<HTMLDivElement> {
  recipes: RecipesSchema[]
  pageCount: number
  categories?: RecipesSchema['category'][]
}

export const Recipes: FC<RecipesProps> = ({
  recipes,
  pageCount,
  categories,
  ...props
}) => {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const pahname = usePathname()
  const router = useRouter()

  const page = searchParams?.get('page') ?? '1'
  const per_page = searchParams?.get('per_page') ?? '8'
  const sort = searchParams?.get('sort') ?? 'createdAt.desc'

  const prepTimeParams = searchParams?.get('prepTime') ?? '0-500'
  const minPrepTimeParams = +prepTimeParams.split('-')[0] ?? 0
  const maxPrepTimeParams = +prepTimeParams.split('-')[1] ?? 500

  const difficultyParams = searchParams?.get('difficulty') ?? null

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
  const [prepTime, setPrepTime] = useState<[number, number]>([
    minPrepTimeParams,
    maxPrepTimeParams,
  ])
  const debouncedPrepTime = useDebounce(prepTime, 500)

  useEffect(() => {
    const [min, max] = debouncedPrepTime
    startTransition(() => {
      router.push(
        `${pahname}?${createQueryString({
          prepTime: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrepTime])

  const [difficulty, setDifficulty] = useState<string[] | null>(
    difficultyParams?.split('.') ?? null,
  )
  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pahname}?${createQueryString({
          difficulty: difficulty?.length ? difficulty.join('.') : null,
        })}`,
        {
          scroll: false,
        },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty])

  // TODO - fix authors array for filter

  // const [authors, setAuthors] = useState<string[] | null>(null)
  // const currentAuthors = new Set(recipes.map((recipe) => recipe.author))

  // useEffect(() => {
  //   router.push(
  //     `${pahname}?${createQueryString({
  //       authors: authors?.length ? authors.join('.') : null,
  //     })}`,
  //     {
  //       scroll: false,
  //     },
  //   )
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authors])

  const [selectedCategories, setSelectedCategories] = useState<Option[]>([])
  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pahname}?${createQueryString({
          categories: selectedCategories?.length
            ? selectedCategories.map((c) => c.value).join('.')
            : null,
          page: selectedCategories?.length ? 1 : null,
        })}`,
        {
          scroll: false,
        },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])
  return (
    <section className='flex flex-col space-y-6' {...props}>
      <div className='flex items-center space-x-2'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label='Filter products'
              className='my-3'
              size='sm'
              disabled={isPending}
            >
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className='flex flex-col'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />

            {categories?.length ? (
              <div className='space-y-4'>
                <h3 className='text-sm font-medium tracking-wide text-foreground'>
                  Categories
                </h3>
                <MultiSelect
                  setSelected={setSelectedCategories}
                  selected={selectedCategories}
                  options={categories.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                />
              </div>
            ) : null}

            <div className='flex flex-1 flex-col gap-5 overflow-hidden px-1'>
              <div className='space-y-4'>
                <h3 className='text-sm font-medium tracking-wide text-foreground'>
                  Time {'(minutes)'}
                </h3>
                <Slider
                  variant='range'
                  thickness='thin'
                  min={0}
                  max={500}
                  defaultValue={[0, 500]}
                  step={5}
                  value={prepTime}
                  onValueChange={(value: typeof prepTime) => {
                    setPrepTime(value)
                  }}
                />
                <div className='flex items-center space-x-4'>
                  <Input
                    type='number'
                    inputMode='numeric'
                    min={0}
                    max={prepTime[1]}
                    className='h-9'
                    value={prepTime[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPrepTime([value, prepTime[1]])
                    }}
                  />
                  <span className='text-muted-foreground'>-</span>
                  <Input
                    type='number'
                    inputMode='numeric'
                    min={prepTime[0]}
                    max={500}
                    className='h-9'
                    value={prepTime[1] ?? maxPrepTimeParams}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPrepTime([prepTime[0], value])
                    }}
                  />
                </div>
                <h3 className='text-sm font-medium tracking-wide text-foreground'>
                  Dificulty
                </h3>
                {['easy', 'medium', 'hard'].map((dificulty) => (
                  <div className='flex items-center space-x-2' key={dificulty}>
                    <Checkbox
                      id={dificulty}
                      checked={difficulty?.includes(dificulty) ?? false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDifficulty([...(difficulty ?? []), dificulty])
                        } else {
                          setDifficulty(
                            difficulty?.filter((d) => d !== dificulty) ?? null,
                          )
                        }
                      }}
                    />

                    <label
                      htmlFor={dificulty}
                      className='text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {dificulty}
                    </label>
                  </div>
                ))}

                {/* <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <h3 className='flex-1 text-sm font-medium tracking-wide text-foreground'>
                      Authors
                    </h3>
                  </div>
                  <ScrollArea className='h-96'>
                    <div className='space-y-4'>
                      {Array.from(currentAuthors)?.length
                        ? Array.from(currentAuthors).map((author) => (
                          <div
                            key={author}
                            className='flex items-center space-x-2'
                          >
                            <Checkbox
                              id={author}
                              checked={authors?.includes(author)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setAuthors([...(authors ?? []), author])
                                } else {
                                  setAuthors(
                                    authors?.filter((a) => a !== author) ??
                                    [],
                                  )
                                }
                              }}
                            />
                            <Label
                              htmlFor={author}
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {author}
                            </Label>
                          </div>
                        ))
                        : null}
                    </div>
                  </ScrollArea>
                </div>*/}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <SortButton sortOptions={sortOptions} />
      </div>
      <div>
        {!isPending && !recipes.length ? (
          <div className='mx-auto flex max-w-xs flex-col space-y-1.5'>
            <h1 className='text-center text-2xl font-bold'>No recipes found</h1>
            <p className='text-center text-muted-foreground'>
              Try changing your filters, or check back later for new recipes
            </p>
          </div>
        ) : null}
        <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4'>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      {recipes.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          createQueryString={createQueryString}
          sort={sort}
        />
      ) : null}
    </section>
  )
}

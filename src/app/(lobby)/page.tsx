import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { ArrowUpRightIcon, ChevronDown, XCircle } from 'lucide-react'
import { Balancer } from 'react-wrap-balancer'

import { sortOptions } from '@/config/recipes'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Combobox from '@/components/combobox'
import { CounterUp } from '@/components/counter-up'
import { Shell } from '@/components/shell'

const getRecipes = async () => {
  const recipes = await db.query.recipes.findMany({
    with: {
      ingredients: true,
    },
  })
  return recipes
}

export default async function Home() {
  const recipes = await getRecipes()
  return (
    <Shell as='div' className='py-3'>
      <section
        id='hero'
        aria-labelledby='hero-heading'
        className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28'
      >
        <Badge
          className='flex gap-1 px-4 py-2 text-sm font-bold md:text-base'
          variant='outline'
        >
          More than <CounterUp count={1000} /> recipes
        </Badge>
        <h1 className='text-4xl font-bold  md:text-5xl lg:text-6xl lg:leading-[1.1]'>
          Discover simple, delicious and{' '}
          <span className='text-[hsl(343,88%,66%)]'>fast recipes!</span>
        </h1>
        <Balancer
          className='max-w-[46rem] text-base font-medium text-muted-foreground md:text-xl'
          as='q'
        >
          A recipe is soulless The essence of the recipe must corne from you,
          the cook.
        </Balancer>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Link
            href={`/recipes?sort=${sortOptions[1].value}`}
            className={cn(buttonVariants({ className: 'font-medium' }))}
          >
            View all recipes
          </Link>
          <Link
            href={`/recipes?sort=${sortOptions[2].value}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                className: 'font-medium',
              }),
            )}
          >
            Top recipes
          </Link>
        </div>
      </section>

      <section className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold md:text-5xl'>Recipes</h2>
        <div className='flex items-center space-x-2'>
          <Combobox />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label='Sort products' size='sm'>
                Sort
                <ChevronDown className='ml-2 h-4 w-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-auto'>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.label}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <section className='grid grid-cols-1 gap-6 md:grid-cols-[150px_minmax(0,1fr)]  '>
        <div>
          <div className='flex flex-row flex-wrap gap-3  md:flex-col'>
            {siteConfig.recipeNav.map((item) => (
              <Button
                variant='secondary'
                className='text-sm capitalize transition-colors hover:bg-[hsl(343,88%,66%)] md:text-base'
                key={item.title}
                aria-label={item.title}
              >
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-center md:ml-10 md:flex-row '>
          <div className='group relative'>
            <Image
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 '
              width={500}
              height={350}
              loading='lazy'
              alt='Picture of the author'
              className='h-[350px] transform rounded-2xl object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-40 sm:w-[500px] md:w-[200px] lg:w-[500px]'
            />
            <div className='absolute inset-0 flex h-full items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100'>
              <Button
                variant='secondary'
                className='text-sm capitalize transition-colors hover:bg-[hsl(343,88%,66%)] md:text-base'
                aria-label='View recipe'
              >
                <span>View category</span>
                <ArrowUpRightIcon className='ml-2 h-5 w-5' aria-hidden='true' />
              </Button>
            </div>
          </div>

          {recipes.length > 0 ? (
            recipes.slice(0, 2).map((recipe) => (
              <div
                className='grid grid-cols-1 gap-3 md:grid-cols-2'
                key={recipe.id}
              >
                <div className='rounded-lg bg-rose-300 p-4 shadow-lg'>
                  <h3 className='text-xl font-bold'>{recipe.name}</h3>
                  <p>
                    Cooking time:
                    <span className='font-bold'>{recipe.prepTime}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='w-2/4 items-center  '>
              <div className='flex flex-col items-center'>
                <XCircle className='h-20 w-20' aria-hidden='true' />
                <p className=' mt-3 font-medium text-muted-foreground'>
                  No recipes found
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Shell>
  )
}

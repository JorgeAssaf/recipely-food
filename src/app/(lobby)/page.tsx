import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { ChevronDown } from 'lucide-react'
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
          className='flex gap-1 px-4 py-2 text-sm font-bold md:text-lg'
          variant='outline'
        >
          More than <CounterUp count={1000} /> recipes
        </Badge>
        <h1 className='text-[2.325rem] font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]'>
          Discover simple, delicious and{' '}
          <span className='text-[hsl(343,88%,66%)]'>fast recipes!</span>
        </h1>
        <Balancer
          className='max-w-[46rem] text-lg text-muted-foreground sm:text-xl'
          as='q'
        >
          A recipe is soulless The essence of the recipe must corne from you,
          the cook.
        </Balancer>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Link
            href='/products'
            className={cn(
              buttonVariants({
                size: 'lg',
              }),
            )}
          >
            View all recipes
          </Link>
          <Link
            href='/dashboard/stores'
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'lg',
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
            <DropdownMenuContent align='start' className='w-auto'>
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
          <div className='flex flex-row flex-wrap gap-3 md:w-6 md:flex-col'>
            {siteConfig.recipeNav.map((item) => (
              <Badge
                variant='outline'
                className='text-sm capitalize transition-colors hover:bg-[hsl(343,88%,66%)]'
                key={item.name}
              >
                <Link href={item.url}>{item.name}</Link>
              </Badge>
            ))}
          </div>
        </div>
        <div className='flex flex-wrap gap-10 md:flex-row'>
          <Image
            src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 '
            alt='Picture of the author'
            className='h-[250px] w-[500px] rounded-lg object-cover'
            width={500}
            height={250}
          />

          <div className='flex gap-3'>
            <div className='flex h-32 gap-3'>
              <div className='rounded-lg  bg-rose-300 p-4 shadow-lg'>
                <h3 className='text-xl font-bold'>Green salad</h3>
                <p>
                  Cooking time: <span className='font-bold'>15 min</span>
                </p>
              </div>
              <div className='rounded-lg  bg-rose-300 p-4 shadow-lg'>
                <h3 className='text-xl font-bold'>Green salad</h3>
                <p>
                  Cooking time: <span className='font-bold'>15 min</span>
                </p>
              </div>
              <div className='rounded-lg  bg-rose-300 p-4 shadow-lg'>
                <h3 className='text-xl font-bold'>Green salad</h3>
                <p>
                  Cooking time: <span className='font-bold'>15 min</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}

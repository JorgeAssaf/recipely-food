import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { Balancer } from 'react-wrap-balancer'

import { siteConfig } from '@/config/site'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    <Shell as='section'>
      <div className='flex w-full flex-col items-center py-14 text-center md:py-24 '>
        <Badge
          className='flex gap-1 px-4 py-2 text-sm font-bold md:text-lg'
          variant='outline'
        >
          More than <CounterUp count={recipes.length} /> recipes
        </Badge>
        <h1 className='my-5 text-3xl font-bold leading-tight md:text-5xl md:text-[2.50rem] lg:text-6xl lg:leading-[1.1]'>
          <Balancer>
            Discover simple, delicious and{' '}
            <span className='text-[hsl(343,88%,66%)]'>fast recipes!</span>
          </Balancer>
        </h1>
        <h3 className='mb-5 max-w-[46rem] text-muted-foreground sm:text-lg md:text-xl'>
          <Balancer>
            <q>
              A recipe is soulless The essence of the recipe must corne from
              you, the cook.
            </q>
          </Balancer>
        </h3>
        <div className='flex gap-3'>
          <Button size='lg'>View all recipes</Button>
          <Button size='lg' variant='outline'>
            Top recipes
          </Button>
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <h2 className='text-3xl  font-bold md:text-5xl'>Recipes</h2>
        <div className='my-4 flex gap-3'>
          <Button size='sm'>View all recipes</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm'>Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-52'
              align='end'
              forceMount
              sideOffset={10}
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <section className='grid grid-cols-1 gap-6 md:grid-cols-[150px_minmax(0,1fr)]  '>
        <div>
          <div className='flex  flex-row flex-wrap gap-3 md:w-6  md:flex-col'>
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

import Link from 'next/link'
import { type Recipe } from '@/db/schema'
import { Balancer } from 'react-wrap-balancer'

import { sortOptions } from '@/config/recipes'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CounterUp } from '@/components/counter-up'
import { RecipesSection } from '@/components/recipes-section'
import { Shell } from '@/components/shell'

import { getRecipesAction } from '../_actions/recipes'

type HomeProps = {
  searchParams: Promise<{ sort: string; category: Recipe['category'] }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { sort, category } = await searchParams

  const recipesTransaction = await getRecipesAction({
    limit: 2,
    offset: 0,
    sort,
    category: category ?? 'breakfast',
  })
  const recipes = recipesTransaction.items

  return (
    <Shell as='div' className='py-3'>
      <section
        id='hero'
        aria-labelledby='hero-heading'
        className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28'
      >
        <Badge
          className='flex gap-1 px-4 py-2 text-sm font-bold tabular-nums md:text-base'
          variant='outline'
        >
          More than <CounterUp count={recipes.length} /> recipes
        </Badge>
        <Balancer
          as='h1'
          className='text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'
        >
          Discover simple, delicious and{' '}
          <span className='text-color-accent'>fast recipes!</span>
        </Balancer>
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

      <RecipesSection sortOptions={sortOptions} recipes={recipes} />

      {/* <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-center text-3xl font-bold'>
          Top Comments (Coming Soon)
        </h3>

        <div className='flex flex-col items-center justify-center gap-4'>
          <Construction className='h-36 w-36 text-muted-foreground' />
        </div>
      </section>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-center text-3xl font-bold'>
          Our Blog (Coming Soon)
        </h3>

        <div>
          <Construction className='h-36 w-36 text-muted-foreground' />
        </div>
      </section>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-center text-3xl font-bold'>
          Gallery (Coming Soon)
        </h3>



        <Construction className='h-36 w-36 text-muted-foreground' />
      </section> */}
    </Shell>
  )
}

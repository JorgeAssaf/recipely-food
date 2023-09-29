import Link from 'next/link'
import { db } from '@/db'
import { recipes as recipesDB, type Recipes } from '@/db/schema'
import { asc, desc, like } from 'drizzle-orm'
import { Balancer } from 'react-wrap-balancer'

import { sortOptions } from '@/config/recipes'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CounterUp } from '@/components/counter-up'
import { RecipesSection } from '@/components/recipes-section'
import { Shell } from '@/components/shell'
import { Construction } from 'lucide-react'

const getRecipes = async (sort: string, category: Recipes['category']) => {
  const [column, order] =
    (sort?.split('.') as [
      keyof Recipes | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []

  const recipes = await db
    .select()
    .from(recipesDB)
    .where(like(recipesDB.category, `%${category}%`))
    .orderBy(
      column && column in recipesDB
        ? order === 'asc'
          ? asc(recipesDB[column])
          : desc(recipesDB[column])
        : desc(recipesDB.createdAt),
    )
    .limit(2)
  return recipes
}

type HomeProps = {
  searchParams: { sort: string; category: Recipes['category'] }
}

export default async function Home({ searchParams }: HomeProps) {
  const { sort, category } = searchParams ?? {}

  const recipes = await getRecipes(sort, category ?? 'breakfast')

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

      <RecipesSection sortOptions={sortOptions} recipes={recipes} />

      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-3xl font-bold text-center'>
          Top Comments (Coming Soon)
        </h3>

        <div className='flex flex-col items-center justify-center gap-4'>
          <Construction className='h-36 w-36 text-muted-foreground' />
        </div>

      </section>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-3xl font-bold text-center'>
          Our Blog (Coming Soon)
        </h3>

        <div className='flex flex-col items-center justify-center gap-4'>
          <Construction className='h-36 w-36 text-muted-foreground' />
        </div>

      </section>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-16'>
        <h3 className='text-3xl font-bold text-center'>
          Gallery (Coming Soon)
        </h3>

        <div className='flex flex-col items-center justify-center gap-4'>
          <Construction className='h-36 w-36 text-muted-foreground' />
        </div>

      </section>
    </Shell >
  )
}

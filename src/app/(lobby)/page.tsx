import Link from 'next/link'
import { db } from '@/db'
import { ArrowUpRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CounterUp } from '@/components/counter-up'
import { Shell } from '@/components/shell'
import { siteConfig } from '@/config/site'

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
      <div className='mx-auto w-full rounded-2xl bg-foreground text-background '>
        <div className='mx-auto flex w-full justify-center py-10  text-center'>
          <div>
            <h1 className='flex flex-col gap-y-2 text-5xl font-bold '>
              Discover simple, delicious and{' '}
              <span className='text-[hsl(343,88%,66%)]'>fast recipes!</span>
            </h1>
            <div>
              <p className='mt-4 '>
                A recipe is a set of instructions that describes how to prepare
                or make something, especially a dish of prepared food.
              </p>
              <p className='mt-4 justify-center  '>
                Check <span className='text-[#f55e89] '>top recipes</span> from
                our community and start cooking!
                <Link href='/recipes'>
                  {' '}
                  <ArrowUpRightIcon className='mx-auto  inline-block h-6 w-6 transition-colors hover:text-[#f55e89] ' />
                </Link>
              </p>
              <Button
                size='lg'
                className='my-4 bg-background text-foreground hover:bg-foreground hover:text-background '
              >
                Read more
              </Button>
            </div>

            <div className=' space-y-4'>
              <p>
                <span className='text-2xl font-bold text-white'>
                  <CounterUp count={recipes.length} duration={5} />
                </span>{' '}
                recipes available
              </p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <h2>
          <span className=''>Recipes</span>
          {
            siteConfig.recipeNav.map((item) => (
              <div key={item.name}>
                <Link href={item.url}>{item.name}</Link>
              </div>
            ))

          }
        </h2>
      </section>
    </Shell>
  )
}

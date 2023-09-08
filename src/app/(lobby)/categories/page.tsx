import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { type Recipes } from '@/db/schema'

import { recipesCategories } from '@/config/recipes'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'View all categories',
}

interface RecipeSloganProps {
  category: {
    title: Recipes['category']
  }
}

function RecipeSlogan({ category }: RecipeSloganProps) {
  if (!category) return null
  switch (category.title) {
    case 'breakfast':
      return <p>The most important meal of the day!</p>
    case 'lunch':
      return <p>Time to refuel and get back to work!</p>
    case 'dinner':
      return <p>Sit down and enjoy!</p>
    case 'dessert':
      return <p>Treat yourself!</p>
    case 'snack':
      return <p>A little something to get you through!</p>
    case 'drinks':
      return <p>Stay hydrated!</p>
    case 'appetizer':
      return <p>A little something to get you started!</p>

    default:
      return null
  }
}

export default async function CategotyPage() {
  const countRecipesByCategory = await db.query.recipes.findMany({
    columns: { category: true },
  })

  return (
    <Shell as='div' className='py-3'>
      <PageHeader
        size='sm'
        title='Categories'
        description='View all categories'
      />

      <section className='grid grid-cols-1 gap-5 rounded-lg p-3 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:grid-cols-2 lg:grid-cols-3'>
        {recipesCategories.map((category) => {
          const LucideIcon = Icons[category.title]
          return (

            <div className='flex items-center gap-1' key={category.title}>
              <LucideIcon className='mr-2 h-12 w-12' />
              <div className='space-y-1'>
                <Link
                  href={`/categories/${category.title}`}
                  className={cn(
                    buttonVariants({
                      variant: 'link',
                    }),
                    'h-auto p-0 text-xl font-semibold capitalize',
                  )}
                >
                  {category.title}
                </Link>
                <RecipeSlogan category={category} />

                <p className='text-sm text-primary/70 '>
                  {
                    countRecipesByCategory.filter(
                      (recipe) => recipe.category === category.title,
                    ).length
                  }{' '}
                  Recipes in this category
                </p>
              </div>
            </div>

          )
        })}
      </section>
    </Shell>
  )
}

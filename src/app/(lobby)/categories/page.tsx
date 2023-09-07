import type { Metadata } from 'next'
import type { Recipes } from '@/db/schema'

import { recipesCategories } from '@/config/recipes'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'
import { Icons } from '@/components/icons'

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

  return (
    <Shell as='div' className='py-3'>
      <PageHeader
        size='sm'
        title='Categories'
        description='View all categories'
      />
      {recipesCategories.map((category) => {
        const LucideIcon = Icons[category.title] || Icons.book
        return (
          <div
            key={category.title}
            className='flex items-center justify-between py-2'
          >
            <div className='flex items-center'>
              <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white'>
                <LucideIcon className='h-[1.56rem] w-[1.56rem]' aria-hidden='true' aria-label={category.title} />
              </div>
              <div className='text-sm font-medium'>{category.title}</div>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='text-sm font-medium '>
                <RecipeSlogan category={category} />
              </div>
            </div>
          </div>
        )
      })}
    </Shell>
  )
}

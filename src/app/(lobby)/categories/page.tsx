import type { Metadata } from 'next'
import { Recipes } from '@/db/schema'

import { recipesCategories } from '@/config/recipes'
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

export function RecipeSlogan({ category }: RecipeSloganProps) {
  if (!category) return null
  switch (category.title) {
    case 'breakfast':
      return <span>Start your day right</span>

    case 'lunch':
      return <span>Power up your day</span>

    case 'dinner':
      return <span>End your day right</span>

    case 'dessert':
      return <span>Reward yourself</span>
    case 'snack':
      return <span>Fuel your day</span>

    case 'drinks':
      return <span>Happiness in a cup</span>

    case 'appetizer':
      return <span>Start your meal right</span>

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
      {recipesCategories.map((category) => (
        <div
          key={category.title}
          className='flex items-center justify-between py-2'
        >
          <div className='flex items-center'>
            <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white'>
              {/* <category.icon className='w-6 h-6' /> */}
            </div>
            <div className='text-sm font-medium'>{category.title}</div>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='text-sm font-medium '>
              <RecipeSlogan category={category} />
            </div>
          </div>
        </div>
      ))}
    </Shell>
  )
}

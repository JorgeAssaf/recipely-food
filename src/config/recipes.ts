import { type Recipes, recipes } from '@/db/schema'
import { CircleIcon, LucideIcon } from 'lucide-react'

import { Icons } from '@/components/icons'

export const sortOptions = [
  { label: 'Date: Old to new', value: 'createdAt.asc' },
  {
    label: 'Date: New to old',
    value: 'createdAt.desc',
  },
  { label: 'Top recipes: Best first', value: 'rating.desc' },
  {
    label: 'Alphabetical: A to Z',
    value: 'name.asc',
  },
  {
    label: 'Alphabetical: Z to A',
    value: 'name.desc',
  },
] satisfies { label: string; value: string }[]

const CategoryIcon = (category: Recipes['category']) => {
  switch (category) {
    case 'breakfast':
      return Icons['breakfast']
    case 'lunch':
      return Icons['lunch']
    case 'dinner':
      return Icons['dinner']
    case 'dessert':
      return Icons['dessert']
    case 'snack':
      return Icons['snack']
    case 'appetizer':
      return Icons['appetizer']
    case 'drinks':
      return Icons['drinks']

    default:
      return CircleIcon
  }
}

export const recipesCategories = [
  ...recipes.category.enumValues.map((category) => ({
    title: category,
    slug: category.toLocaleLowerCase(),
    icon: CategoryIcon(category),
    description: `All ${category} recipes`,
  })) satisfies {
    title: Recipes['category']
    slug: string
    icon: LucideIcon
    description: string
  }[]
]

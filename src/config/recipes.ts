import { recipes } from '@/db/schema'
import {
  Apple,
  CakeSlice,
  CircleIcon,
  Coffee,
  EggFried,
  Grape,
  Wine,
} from 'lucide-react'

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

const CategoryIcon = (category: string) => {
  switch (category) {
    case 'breakfast':
      return EggFried
    case 'lunch':
      return Apple
    case 'dinner':
      return Coffee
    case 'dessert':
      return CakeSlice
    case 'snack':
      return Grape
    case 'drink':
      return Wine
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
  })),
]

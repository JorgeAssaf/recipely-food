import { recipes, type Recipe } from '@/db/schema'

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

export const recipesCategories = [
  ...(recipes.category.enumValues.map((category) => ({
    title: category,
    slug: category.toLocaleLowerCase(),
    icon: Icons[category],
    description: `All ${category} recipes`,
  })) satisfies {
    title: Recipe['category']
    slug: string
    icon: React.FC
    description: string
  }[]),
]

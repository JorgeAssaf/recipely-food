import { recipes } from '@/db/schema'

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
]

export const recipesCategories = [
  ...recipes.category.enumValues.map((category) => ({
    title: category,
    slug: category.toLocaleLowerCase(),
    description: `All ${category} recipes`,
  })),
]

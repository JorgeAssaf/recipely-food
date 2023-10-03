import type { Metadata } from 'next'
import { type Recipes as RecipesSchema } from '@/db/schema'

import { toTitleCase } from '@/lib/utils'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Recipes } from '@/components/recipes'
import { Shell } from '@/components/shell'
import { getRecipesAction } from '@/app/_actions/recipes'

interface CategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }

  params: {
    category: RecipesSchema['category']
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${toTitleCase(params.category.toString())} Recipes`,
    description: `View all recipes in the ${toTitleCase(
      params.category.toString(),
    )} category`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params

  const { page, per_page, sort, prepTime, difficulty, authors } = searchParams

  const limit = typeof per_page === 'string' ? parseInt(per_page) : 8
  const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0
  const time = typeof prepTime === 'string' ? parseInt(prepTime) : 0

  const recipesTransaction = await getRecipesAction({
    limit,
    offset,
    category,
    prepTime: typeof prepTime === 'string' ? String(prepTime) : null,
    difficulty: typeof difficulty === 'string' ? difficulty : null,
    author: typeof authors === 'string' ? authors : null,
    sort: typeof sort === 'string' ? sort : null,
  })

  const pageCount = Math.ceil(recipesTransaction.count / limit)

  return (
    <Shell as='section'>
      <div>
        <PageHeader>
          <PageHeaderHeading>
            {toTitleCase(params.category.toString())}
          </PageHeaderHeading>
          <PageHeaderDescription>
            View all recipes in this category
          </PageHeaderDescription>
        </PageHeader>
        <Recipes
          category={category}
          pageCount={pageCount}
          recipes={recipesTransaction.items}
        />
      </div>
    </Shell>
  )
}

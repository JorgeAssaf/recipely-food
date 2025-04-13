import type { Metadata } from 'next'
import { recipes } from '@/db/schema'

import { recipesParamsSchema } from '@/lib/validations/params'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Recipes } from '@/components/recipes'
import { Shell } from '@/components/shell'
import { getRecipesAction } from '@/app/_actions/recipes'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  title: 'All Recipes',
  description: 'Find your favorite recipes here',
}

interface RecipePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const result = recipesParamsSchema.parse(await searchParams)

  const { page, per_page, sort, categories, prepTime, difficulty } = result
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const perPageAsNumber = Number(per_page)
  console.log(sort)
  const limit = isNaN(perPageAsNumber) ? 8 : perPageAsNumber
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  const recipesTransaction = await getRecipesAction({
    limit,
    offset,
    sort,
    categories,
    prepTime,
    difficulty,
  })

  const recipesCountPerPage = Math.ceil(recipesTransaction.count / limit)

  return (
    <Shell>
      <div>
        <PageHeader>
          <PageHeaderHeading>All Recipes</PageHeaderHeading>
          <PageHeaderDescription>
            Find your favorite recipes here
          </PageHeaderDescription>
        </PageHeader>
        <Recipes
          recipes={recipesTransaction.items}
          categories={Object.values(recipes.category.enumValues)}
          pageCount={recipesCountPerPage}
        />
      </div>
    </Shell>
  )
}

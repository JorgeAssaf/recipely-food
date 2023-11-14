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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: 'All Recipes',
  description: 'Find your favorite recipes here',
}

interface RecipePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const { page, per_page, sort, categories, prepTime, difficulty } =
    recipesParamsSchema.parse(searchParams)

  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const perPageAsNumber = Number(per_page)

  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber

  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  const recipesTransaction = await getRecipesAction({
    limit,
    offset,
    sort,
    categories,
    prepTime,
    difficulty,
  })

  const pageCount = Math.ceil(recipesTransaction.count / limit)

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
          pageCount={pageCount}
        />
      </div>
    </Shell>
  )
}

import type { Metadata } from 'next'
import { recipes } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'All Recipes',
  description: 'Find your favorite recipes here',
}

interface RecipePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const user = await currentUser()

  const { page, per_page, sort, categories, prepTime, difficulty } =
    recipesParamsSchema.parse(searchParams)

  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const perPageAsNumber = Number(per_page)
  // Number of items per page
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
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
      <PageHeader>
        <PageHeaderHeading>
          All Recipes
        </PageHeaderHeading>
        <PageHeaderDescription>
          Find your favorite recipes here
        </PageHeaderDescription>
      </PageHeader>
      <Recipes
        recipes={recipesTransaction.items}
        userId={user?.id}
        categories={Object.values(recipes.category.enumValues)}
        pageCount={pageCount}
      />
    </Shell>
  )
}

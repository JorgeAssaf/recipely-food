import type { Metadata } from 'next'
import { type Recipe } from '@/db/schema'

import { toTitleCase } from '@/lib/utils'
import { recipesParamsSchema } from '@/lib/validations/params'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Recipes } from '@/components/recipes'
import { Shell } from '@/components/shell'
import { getRecipesAction } from '@/app/_actions/recipes'

interface CategoryPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>

  params: Promise<{
    category: Recipe['category']
  }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  return {
    title: category === null ? 'No category found' : toTitleCase(category),
    description: `View all recipes in the ${toTitleCase(
      category ?? 'No category found',
    )} category`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params

  const { page, per_page, sort, prepTime, difficulty } =
    recipesParamsSchema.parse(await searchParams)

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
    category,
    prepTime,
    difficulty,
  })

  const pageCount = Math.ceil(recipesTransaction.count / limit)

  return (
    <Shell>
      <div>
        <PageHeader>
          <PageHeaderHeading>{toTitleCase(category)}</PageHeaderHeading>
          <PageHeaderDescription>
            {`View all recipes in the ${toTitleCase(category)} category`}
          </PageHeaderDescription>
        </PageHeader>
        <Recipes pageCount={pageCount} recipes={recipesTransaction.items} />
      </div>
    </Shell>
  )
}

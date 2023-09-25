import type { Metadata } from 'next'
import { recipes } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'

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

  const { page, per_page, sort, categories, prepTime, difficulty, authors } =
    searchParams ?? {}

  const limit = typeof per_page === 'string' ? parseInt(per_page) : 8
  const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0

  const recipesTransaction = await getRecipesAction({
    limit,
    offset,
    sort: typeof sort === 'string' ? sort : null,
    categories: typeof categories === 'string' ? categories : null,
    prepTime: typeof prepTime === 'string' ? parseInt(prepTime) : null ?? 0,
    difficulty: typeof difficulty === 'string' ? difficulty : null,
    author: typeof authors === 'string' ? authors : null,
  })

  const pageCount = Math.ceil(recipesTransaction.count / limit)

  return (
    <Shell as='main'>
      <div>
        <PageHeader>
          <PageHeaderHeading>Recipes</PageHeaderHeading>
          <PageHeaderDescription>
            Find your favorite recipes here
          </PageHeaderDescription>
        </PageHeader>
        <Recipes
          recipes={recipesTransaction.items}
          userId={user?.id ?? ''}
          categories={Object.values(recipes.category.enumValues)}
          pageCount={pageCount}
        />
      </div>
    </Shell>
  )
}

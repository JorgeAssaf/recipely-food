import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/db'

import { deslugify } from '@/lib/utils'
import { Shell } from '@/components/shell'
import SingleRecipe from '@/components/single-recipe'

type MetaProps = {
  params: { name: string }
}

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const name = deslugify(params.name)

  const recipe = await db.query.recipes.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: (recipes, { eq }) => eq(recipes.name, name),
  })

  return {
    title: recipe?.name,
    description: recipe?.description,
  }
}

interface RecipePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    name: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipeName = deslugify(params.name)

  const recipe = await db.query.recipes.findFirst({
    where: (recipes, { eq }) => eq(recipes.name, recipeName),
  })

  if (!recipe) {
    notFound()
  }

  return (
    <Shell>
      <div>
        <SingleRecipe recipe={recipe} />
      </div>
    </Shell>
  )
}

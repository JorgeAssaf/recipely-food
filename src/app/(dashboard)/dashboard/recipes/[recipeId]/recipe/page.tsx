import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { recipes } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import UpdateRecipeForm from '@/components/forms/update-recipe-form'

export const metadata: Metadata = {
  title: 'Update Recipe',
  description: 'Update a recipe in your collection.',
}

type UpdateRecipePageProps = {
  params: Promise<{
    recipeId: string
  }>
}

export default async function UpdateRecipePage({
  params,
}: UpdateRecipePageProps) {
  const paramsResolved = await params
  const recipeId = Number(paramsResolved.recipeId)
  const recipe = await db.query.recipes.findFirst({
    where: and(eq(recipes.id, recipeId)),
  })

  if (!recipe) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Update Recipe</CardTitle>
        <CardDescription>Update a recipe in your collection.</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateRecipeForm recipe={recipe} />
      </CardContent>
    </Card>
  )
}

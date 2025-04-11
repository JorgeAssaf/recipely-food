'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { recipes, savedRecipes } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq, inArray } from 'drizzle-orm'
import { type z } from 'zod'

import {
  type addSaveRecipeSchema,
  type getSavedRecipeSchema,
} from '@/lib/validations/save-recipes'

export async function getSavedRecipesAction() {
  const { userId } = await auth()

  const savedRecipe = await db.query.savedRecipes.findMany({
    where: eq(savedRecipes.userId, String(userId)),
  })
  const recipesIds = savedRecipe.map((recipe) => recipe.recipeId)

  if (recipesIds.length === 0) return []

  const uniqueRecipesIds = [...new Set(recipesIds)]

  const allRecipes = await db
    .select()
    .from(recipes)
    .where(and(inArray(recipes.id, uniqueRecipesIds)))
    .groupBy(recipes.id)
    .execute()

  return allRecipes
}

export async function addToSavedAction(
  input: z.infer<typeof addSaveRecipeSchema>,
) {
  const { userId } = await auth()

  const checkIfSaved = await db.query.savedRecipes.findFirst({
    where: and(
      eq(savedRecipes.recipeId, input.recipeId),
      eq(savedRecipes.userId, String(userId)),
    ),
  })

  if (checkIfSaved) {
    throw new Error('Recipe already saved.')
  }

  await db.insert(savedRecipes).values({
    recipeId: input.recipeId,
    userId: String(userId),
  })
  revalidatePath('/')
}

export async function DeleteSavedRecipeAction(
  input: z.infer<typeof getSavedRecipeSchema>,
) {
  const saveRecipe = await db.query.savedRecipes.findFirst({
    where: eq(savedRecipes.recipeId, input.recipeId),
  })

  if (!saveRecipe) {
    throw new Error('Recipe not found.')
  }

  await db.delete(savedRecipes).where(eq(savedRecipes.recipeId, input.recipeId))

  revalidatePath(`/dashboard/recipes/saved-recipes`)
}

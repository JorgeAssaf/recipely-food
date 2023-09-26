'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { recipes, savedRecipes } from '@/db/schema'
import { auth } from '@clerk/nextjs'
import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'

import {
  addSaveRecipeSchema,
  getSavedRecipeSchema,
} from '@/lib/validations/save-recipes'

export async function getSavedRecipesAction() {
  const { userId } = auth()

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
  const { userId } = auth()
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

// export async function UpdateRecipeAction(
//   values: z.infer<typeof recipesSchema> & {
//     id: number
//     images: FileUpload[] | null
//   },
// ) {
//   const recipe = await db.query.recipes.findFirst({
//     where: eq(recipes.id, values.id),
//   })
//   const recipeWithSameName = await db.query.recipes.findFirst({
//     where: values.id
//       ? and(eq(recipes.name, values.name), not(eq(recipes.id, values.id)))
//       : eq(recipes.name, values.name),
//   })

//   if (recipeWithSameName) {
//     throw new Error('Product name already taken.')
//   }
//   if (!recipe) {
//     throw new Error('Recipe not found.')
//   }

//   await db
//     .update(recipes)
//     .set({
//       ...values,
//       updatedAt: new Date(),
//     })
//     .where(eq(recipes.id, values.id))

//   revalidatePath(`/dashboard/recipes`)
// }

// export async function DeleteRecipeAction({ id: id }: { id: number }) {
//   const recipe = await db.query.recipes.findFirst({
//     where: eq(recipes.id, id),
//   })
//   if (!recipe) {
//     throw new Error('Recipe not found.')
//   }
//   await db.delete(recipes).where(eq(recipes.id, id))

//   revalidatePath(`/dashboard/recipes/your-recipes`)
// }

export async function DeleteSavedRecipeAction(
  input: z.infer<typeof getSavedRecipeSchema>,
) {
  const saveRecipe = await db.query.savedRecipes.findFirst()

  if (!saveRecipe) {
    throw new Error('Recipe not found.')
  }

  await db
    .delete(savedRecipes)
    .where(eq(savedRecipes.recipeId, input.recipeId ?? 0))

  revalidatePath(`/dashboard/recipes/saved-recipes`)
}

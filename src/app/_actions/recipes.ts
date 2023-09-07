'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { ingredients, recipes } from '@/db/schema'
import { like } from 'drizzle-orm'
import { z } from 'zod'

import { recipesSchema } from '@/lib/validations/recipes'

export async function filterProductsAction(query: string) {
  if (query.length === 0) return null
  const filteredRecipes = await db
    .select({
      category: recipes.category,
      name: recipes.name,
      id: recipes.id,
    })
    .from(recipes)
    .where(like(recipes.name, `%${query}%`))
    .orderBy(recipes.createdAt)
    .limit(10)
  const data = Object.values(recipes.category.enumValues).map((category) => ({
    category,
    recipes: filteredRecipes.filter((recipe) => recipe.category === category),
  }))
  return data
}

export async function AddRecipeAction(values: z.infer<typeof recipesSchema>) {
  // const productWithSameName = await db.query.recipes.findFirst({
  //   columns: {
  //     id: true,
  //   },
  //   where: eq(recipes.name, values.name),
  // })

  // if (productWithSameName) {
  //   throw new Error("Product name already taken.")
  // }

  await db.insert(recipes).values(values)

  revalidatePath(`/dashboard/recipes`)
}

export async function AddIngredientsAction(values: any) {
  const recipe = await db.select().from(recipes)

  await db.insert(ingredients).values(values)
}
export async function DeleteRecipesAction() {
  return await db.delete(recipes)
}

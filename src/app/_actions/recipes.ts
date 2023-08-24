'use server'

import { db } from '@/db'
import { ingredients, recipes } from '@/db/schema'
import { eq, like } from 'drizzle-orm'

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

export async function AddRecipeAction(values: any) {
  const existingRecipe = await db.select().from(recipes)

  await db.insert(recipes).values(values)
}
export async function AddIngredientsAction(values: any) {
  const recipe = await db.select().from(recipes)

  await db.insert(ingredients).values(values)
}
export async function DeleteRecipesAction() {
  return await db.delete(recipes)
}

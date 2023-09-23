'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { recipes, savedRecipes } from '@/db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'

import { FileUpload } from '@/types/recipes'
import { recipesSchema } from '@/lib/validations/recipes'
import {
  addSaveRecipeSchema,
  getSavedRecipeSchema,
} from '@/lib/validations/save-recipes'

export async function getSavedRecipesAction(
  input: z.infer<typeof getSavedRecipeSchema>,
) {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return null
  }

  const cart = await db.query.savedRecipes.findFirst({
    where: eq(savedRecipes.id, Number(cartId)),
  })
  console.log(cart);

  // const recipesSaved = await db.query.recipes.findMany({
  //   where: and(
  //     eq(recipes.id, cart?.recipeId),

  //   ),
  //   orderBy: desc(recipes.createdAt),
  // })


}

export async function AddCartAction(
  input: z.infer<typeof addSaveRecipeSchema>,
) {
  const cookieStore = cookies()
  const cartId = cookieStore.get('cartId')?.value

  if (!cartId) {
    const cart = await db.insert(savedRecipes).values({
      userId: input.userId,
      recipeId: input.recipeId,
      closed: input.closed,
    })

    // Note: .set() is only available in a Server Action or Route Handler
    cookieStore.set('cartId', String(cart.insertId))

    revalidatePath('/')
    return
  }

  const cart = await db.query.savedRecipes.findFirst({
    where: eq(savedRecipes.id, Number(cartId)),
  })
  if (!cart) {
    cookieStore.set({
      name: 'cartId',
      value: '',
      expires: new Date(0),
    })

    await db.delete(savedRecipes).where(eq(savedRecipes.id, Number(cartId)))

    throw new Error('Cart not found, please try again.')
  }

  // If cart is closed, delete it and create a new one
  if (cart.closed) {
    await db.delete(savedRecipes).where(eq(savedRecipes.id, Number(cartId)))

    const newCart = await db.insert(savedRecipes).values({
      userId: input.userId,
      recipeId: input.recipeId,
      closed: input.closed,
    })

    cookieStore.set('cartId', String(newCart.insertId))

    revalidatePath('/')
  }
}

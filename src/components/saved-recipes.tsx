'use client'

import { useTransition } from 'react'
import { Recipes } from '@/db/schema'

import { DeleteSavedRecipeAction } from '@/app/_actions/save'

import { Button } from './ui/button'

type SavedRecipesProps = {
  savedRecipes: Recipes[]
}

export const SavedRecipes = ({ savedRecipes }: SavedRecipesProps) => {
  const [isPending, startTransition] = useTransition()
  return (
    <div>
      {savedRecipes.map((recipe) => (
        <div key={recipe.id} className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{recipe.name}</h1>
          <p>{recipe.id}</p>
          <Button
            onClick={() => {
              startTransition(async () => {
                await DeleteSavedRecipeAction({
                  recipeId: recipe.id,
                })
              })
            }}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      ))}{' '}
    </div>
  )
}

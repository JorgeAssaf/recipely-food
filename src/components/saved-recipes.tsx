'use client'

import { useTransition } from 'react'
import { Recipes } from '@/db/schema'

import { DeleteSavedRecipeAction } from '@/app/_actions/save'

import { Button } from './ui/button'
import { ImageIcon } from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'
import { cn } from '@/lib/utils'

type SavedRecipesProps = {
  savedRecipes: Recipes[]
}

export const SavedRecipes = ({ savedRecipes }: SavedRecipesProps) => {
  const [isPending, startTransition] = useTransition()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
      {savedRecipes.map((recipe) => (
        <div key={recipe.id} className='flex flex-col space-y-2 py-4'>
          <AspectRatio
            ratio={16 / 9}
            className={cn('relative h-full w-full')}
          >
            {
              recipe.images ? (recipe.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.name}
                  className='w-full h-64 object-cover'
                  width={90}
                  height={90}
                />
              ))
              ) : (
                <div
                  aria-label='Placeholder'
                  role='img'
                  aria-roledescription='placeholder'
                  className='flex h-full w-full items-center justify-center bg-secondary'
                >
                  <ImageIcon
                    className='h-9 w-9 text-muted-foreground'
                    aria-hidden='true'
                  />
                </div>
              )

            }
          </AspectRatio>
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

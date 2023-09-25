'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Recipes as RecipesSchema } from '@/db/schema'
import { Bookmark, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

import { cn, slugify } from '@/lib/utils'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { addToSavedAction } from '@/app/_actions/save'

import { Icons } from '../icons'
import { AspectRatio } from '../ui/aspect-ratio'
import { Button, buttonVariants } from '../ui/button'

interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recipe: RecipesSchema
  userId?: string
}

export const RecipeCard = ({
  recipe,
  userId,
  className,
  ...props
}: RecipeCardProps) => {
  const [isPending, startTransition] = useTransition()

  const LucideIcon = Icons[recipe.category]
  return (
    <Card className={cn('relative h-full ', className)} {...props}>
      <Link href={`/recipe/${slugify(recipe.name)}`}>
        <CardHeader className='border-b p-0'>
          <AspectRatio
            ratio={16 / 9}
            className={cn('relative h-full w-full', className)}
          >
            {recipe?.images?.length ? (
              <Image
                src={
                  recipe.images[0]?.url ?? '/images/product-placeholder.webp'
                }
                alt={recipe.images[0]?.name ?? recipe.name}
                className='object-cover'
                sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
                fill
                loading='lazy'
              />
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
            )}
          </AspectRatio>
        </CardHeader>
        <span className='sr-only'>{recipe.name}</span>
      </Link>
      <div className='absolute inset-4 z-20 flex flex-col'>
        <div className='flex items-start justify-between space-x-4'>
          <div
            className={cn(
              buttonVariants({
                size: 'icon',
                className:
                  'pointer-events-none h-8 w-8 bg-zinc-100 text-zinc-950',
              }),
            )}
            aria-hidden='true'
          >
            <LucideIcon className='h-5 w-5' />
          </div>
          <Button
            aria-label='Add to cart'
            size='icon'
            className=' h-8 w-8 '
            variant='secondary'
            onClick={() => {
              if (!userId) {
                return toast.error('You must be logged in to save a recipe.')
              }
              startTransition(async () => {
                try {
                  await addToSavedAction({
                    recipeId: recipe.id,
                    userId: userId ?? '',
                  })
                  toast.success('Added to cart.')
                } catch (err) {
                  if (err instanceof Error) {
                    toast.error(err.message ?? 'Something went wrong.')
                  }
                }
              })
            }}
            disabled={isPending}
          >
            <Bookmark className='h-5 w-5' aria-hidden='true' />

            <span className='sr-only'>Save</span>
          </Button>
        </div>
      </div>
      <CardDescription>{recipe.description}</CardDescription>

      <CardFooter>
        <div>
          <span>Prep Time: {recipe.prepTime} minutes</span>
          <span>Difficulty: {recipe.difficulty}</span>
        </div>
        <div>
          <span>Author: {recipe.author}</span>
          <span>Category: {recipe.category}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

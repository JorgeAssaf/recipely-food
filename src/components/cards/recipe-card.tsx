'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Recipes as RecipesSchema } from '@/db/schema'
import { Bookmark, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

import { cn, slugify } from '@/lib/utils'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
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
      <Link href={`/recipe/${slugify(recipe.name)}`} className='cursor-pointer'>
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

        <div className='absolute inset-4 z-20 flex flex-col '>
          <div className='flex items-start justify-between space-x-4'>
            <div
              className={cn(
                buttonVariants({
                  size: 'icon',
                  className: ' h-8 w-8 bg-zinc-100 text-zinc-950',
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

        <div className='space-y-2 p-4'>
          <div className='border-b'>
            <p className='text-3xl font-semibold text-foreground'>
              {recipe.name}
            </p>
          </div>

          <CardDescription>{recipe.description}</CardDescription>
          <div className='flex flex-col justify-between'>
            <p className='text-foreground font-semibold'>
              Prep Time:{' '}
              <span className='text-primary/70'>
                {recipe.prepTime > 60
                  ? `${Math.floor(recipe.prepTime / 60)}h ${recipe.prepTime % 60 === 0
                    ? ''
                    : `${recipe.prepTime % 60} min`
                  }`
                  : `${recipe.prepTime} min`}
              </span>
            </p>
            <p className='text-foreground font-semibold'>
              Difficulty: <span className='text-primary/70 capitalize'>
                {recipe.difficulty}
              </span>
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-foreground font-semibold'>Author: <span className='text-primary/70'>{recipe.author}</span></p>
          </div>
        </div>
      </Link>
    </Card >
  )
}

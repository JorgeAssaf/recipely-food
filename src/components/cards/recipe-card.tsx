'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Recipe } from '@/db/schema'
import { Clock, ImageIcon } from 'lucide-react'

import { cn, formatPrepTime, slugify } from '@/lib/utils'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

import { AspectRatio } from '../ui/aspect-ratio'
import { Badge } from '../ui/badge'

interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recipe: Recipe
}

export const RecipeCard = ({
  recipe,
  className,
  ...props
}: RecipeCardProps) => {
  return (
    <Card className={cn('relative size-full', className)} {...props}>
      <CardHeader className='p-0'>
        <Link
          href={`/recipe/${recipe.slug}`}
          className='cursor-pointer'
        >
          <AspectRatio ratio={16 / 9} className={cn('size-full', className)}>
            {recipe?.images?.length ? (
              <Image
                src={recipe.images[0]?.url}
                alt={recipe.images[0]?.name ?? recipe.name}
                className='rounded-t-lg object-cover'
                sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
                priority
                fill
              />
            ) : (
              <div
                aria-label='Placeholder'
                role='img'
                aria-roledescription='placeholder'
                className='bg-secondary flex size-full items-center justify-center'
              >
                <ImageIcon
                  className='text-muted-foreground size-9'
                  aria-hidden='true'
                />
              </div>
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <div className='space-y-2 p-4'>
        <div className='border-b py-2'>
          <h2 className='truncate text-xl font-medium'>
            <Link
              href={`/recipe/${slugify(recipe.name)}`}
              className='cursor-pointer'
            >
              {recipe.name}
            </Link>
          </h2>
        </div>
        <div className='space-y-3'>
          <CardDescription className='text-foreground/70 line-clamp-3'>
            {recipe.description}
          </CardDescription>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-sm capitalize'>
              Difficulty: {recipe.difficulty}
            </p>
            <Badge size='sm' className='capitalize'>
              {recipe.category}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Clock className='text-muted-foreground size-5' />
              <p className='text-sm font-medium'>
                {formatPrepTime(recipe.prepTime)}
              </p>
            </div>
            <p className='text-muted-foreground text-sm font-medium'>
              By {recipe.author}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { type Recipe } from '@/db/schema'

import { recipesCategories } from '@/config/recipes'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '@/components/ui/button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Categories',
  description: 'View all categories',
}

interface RecipeSloganProps extends React.HTMLAttributes<HTMLParagraphElement> {
  category: {
    title: Recipe['category']
  }
}

function RecipeSlogan({ category, className, ...props }: RecipeSloganProps) {
  if (!category) return null

  switch (category.title) {
    case 'breakfast':
      return (
        <p {...props} className={cn(className)}>
          The most important meal of the day!
        </p>
      )
    case 'lunch':
      return (
        <p {...props} className={cn(className)}>
          Time to refuel and get back to work!
        </p>
      )
    case 'meal':
      return (
        <p {...props} className={cn(className)}>
          Imagination is the only limit!
        </p>
      )
    case 'dinner':
      return (
        <p {...props} className={cn(className)}>
          Sit down and enjoy!
        </p>
      )
    case 'dessert':
      return (
        <p {...props} className={cn(className)}>
          Treat yourself!
        </p>
      )
    case 'snack':
      return (
        <p {...props} className={cn(className)}>
          A little something to get you through!
        </p>
      )
    case 'drinks':
      return (
        <p {...props} className={cn(className)}>
          Stay hydrated!
        </p>
      )
    case 'appetizer':
      return (
        <p {...props} className={cn(className)}>
          A little something to get you started!
        </p>
      )
    default:
      return null
  }
}

export default async function CategoryPage() {
  const countRecipesByCategory = await db.query.recipes.findMany({
    columns: { category: true },
  })

  return (
    <Shell>
      <div className='space-y-8'>
        <PageHeader>
          <PageHeaderHeading>Categories</PageHeaderHeading>
          <PageHeaderDescription>View all categories</PageHeaderDescription>
        </PageHeader>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {recipesCategories.map((category) => {
            return (
              <Link
                href={`/category/${category.title}`}
                className='group relative overflow-hidden rounded-md border'
                key={category.title}
              >
                <AspectRatio ratio={16 / 9}>
                  <div className='absolute inset-0 z-10 bg-zinc-950/70 transition-colors duration-300 group-hover:bg-zinc-950/75' />
                  <Image
                    src={`/images/${category.title}.webp`}
                    alt={`${category.title} category`}
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
                    fill
                    priority
                  />
                </AspectRatio>
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
                      <category.icon className='h-5 w-5' />
                    </div>
                    <p className='text-sm text-zinc-200'>
                      {
                        countRecipesByCategory.filter(
                          (recipe) => recipe.category === category.title,
                        ).length
                      }{' '}
                      recipes
                    </p>
                  </div>
                  <h3 className='mt-auto text-xl font-medium capitalize text-zinc-200'>
                    {category.title}
                  </h3>
                  <RecipeSlogan
                    category={category}
                    className='text-muted-foreground'
                  />
                </div>
                <span className='sr-only'>{category.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </Shell>
  )
}

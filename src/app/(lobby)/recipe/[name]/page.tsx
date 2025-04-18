import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { Bookmark, CircleDashed, ClockIcon, Utensils } from 'lucide-react'

import { cn, deslugify, formatPrepTime, slugify } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icons } from '@/components/icons'
import { RecipeImageCarrousel } from '@/components/recipe-image-carousel'
import { Shell } from '@/components/shell'

type MetaProps = {
  params: Promise<{
    name: string
  }>
}

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { name } = await params
  const recipeName = deslugify(name)

  const recipe = await db.query.recipes.findFirst({
    columns: {
      name: true,
      description: true,
      category: true,
    },
    where: (recipes, { eq }) => eq(recipes.name, recipeName),
  })
  if (!recipe) {
    return {
      title: 'Recipe not found',
      description: 'Recipe not found',
      keywords: ['recipe', 'not found'],
    }
  }

  return {
    title: recipe.name,
    description: recipe.description,
    keywords: [`${recipe.name}`, `${recipe.category}`],
  }
}

interface RecipePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
  params: Promise<{
    name: string
  }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { name } = await params
  const recipeName = slugify(name)
  const recipe = await db.query.recipes.findFirst({
    where: (recipes, { eq }) => eq(recipes.name, recipeName),
  })

  if (!recipe) {
    notFound()
  }

  const isSaved = await db.query.savedRecipes.findFirst({
    where: (savedRecipes, { eq }) =>
      eq(savedRecipes.recipeId, recipe?.id ? recipe.id : 0),
  })

  const LucideIcon = Icons[recipe.category]

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: 'Recipes',
            href: '/recipes',
          },
          {
            title: recipe.category,
            href: `/category/${recipe.category}`,
          },
          {
            title: recipe.name,
            href: `/recipe/${slugify(recipe.name)}`,
          },
        ]}
      />
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <RecipeImageCarrousel
            images={recipe.images}
            options={{
              loop: true,
            }}
          />
        </div>

        <div className='h-fit rounded-2xl bg-foreground px-5 py-6 text-background'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-lg font-semibold'>
              <div
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    className:
                      'pointer-events-none h-8 w-8 bg-foreground text-background',
                  }),
                )}
                aria-hidden='true'
              >
                <LucideIcon className='size-5' />
              </div>
              <span className='capitalize'>{recipe.category}</span>
            </div>

            <h1 className='text-4xl font-bold'>{recipe.name}</h1>
            <p className='capitalize text-background/90'>
              Author: {recipe.author}
            </p>
            <Tabs defaultValue='ingredients'>
              <TabsList className='mb-5 flex items-center space-x-2 rounded-3xl bg-[#e4e5eb] px-5 py-7 sm:justify-between'>
                {['ingredients', 'steps', 'reviews', 'save'].map(
                  (item, index) => {
                    const LucideIcon =
                      Icons[item as keyof typeof Icons] ?? CircleDashed
                    return (
                      <div key={index}>
                        {item === 'save' ? (
                          <Button
                            variant='secondary'
                            className='flex items-center text-lg font-semibold'
                          >
                            {isSaved ? (
                              <Bookmark className='size-6 fill-color-accent text-color-accent' />
                            ) : (
                              <Bookmark className='size-6' />
                            )}

                            <span className='sr-only'>Save</span>
                          </Button>
                        ) : (
                          <TabsTrigger
                            asChild
                            className='data-[state=active]:bg-foreground data-[state=inactive]:bg-transparent data-[state=active]:text-background data-[state=active]:shadow-lg'
                            value={item}
                          >
                            <Button>
                              <LucideIcon className='size-5 md:size-[1.55rem]' />
                              <span className='sr-only'>{item}</span>
                            </Button>
                          </TabsTrigger>
                        )}
                      </div>
                    )
                  },
                )}
              </TabsList>
              <div>
                <TabsContent
                  value='steps'
                  className='min-h-96 w-full rounded-md'
                >
                  <h2 className='sticky top-0 bg-foreground py-4 text-3xl font-bold'>
                    Steps
                  </h2>
                  <div>
                    {recipe.steps?.length ? (
                      <div className='flex flex-col space-y-2 text-lg'>
                        <ol className='flex flex-col flex-wrap gap-2'>
                          <li className='list-inside list-decimal'>
                            {recipe.steps}
                          </li>
                        </ol>
                      </div>
                    ) : null}
                  </div>
                </TabsContent>
                <TabsContent
                  value='ingredients'
                  className='min-h-96 w-full rounded-md'
                >
                  <div className='flex flex-col space-y-5'>
                    <p className='flex items-center gap-2 text-lg font-semibold'>
                      <Utensils className='size-6' />
                      <span className='capitalize'>{recipe.difficulty}</span>
                    </p>
                    <p className='flex items-center gap-2 text-lg font-semibold'>
                      <ClockIcon className='size-6' />
                      <span className='capitalize'>
                        {formatPrepTime(recipe.prepTime)}
                      </span>
                    </p>
                  </div>
                  {recipe.ingredients?.length ? (
                    <div className='mt-5 flex flex-col space-y-3'>
                      <h2 className='sticky top-0 bg-foreground py-4 text-3xl font-bold'>
                        Ingredients
                      </h2>
                      <ul className='space-y-2'>
                        {recipe.ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className='list-inside list-disc text-lg'
                          >
                            {ingredient.quantity} {ingredient.units} of{' '}
                            <span className='font-semibold'>
                              {ingredient.ingredient}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent
                  value='reviews'
                  className='min-h-96 w-full rounded-md'
                >
                  <h2 className='sticky top-0 bg-foreground py-4 text-3xl font-bold'>
                    Reviews
                  </h2>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </Shell>
  )
}

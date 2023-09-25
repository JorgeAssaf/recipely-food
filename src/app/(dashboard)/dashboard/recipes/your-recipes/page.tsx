import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { recipes as recipesDB } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { FileWarning } from 'lucide-react'

import { cn, slugify } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Your Recipes',
  description: 'View your recipes.',
}
const getRecipes = async (userId: string) => {
  const recipes = await db
    .select()
    .from(recipesDB)
    .where(eq(recipesDB.userId, userId))
  return recipes
}

const YourRecipesPage = async () => {
  const user = await currentUser()
  if (!user) {
    return redirect('/signin')
  }
  const recipes = await getRecipes(user.id)
  return (
    <section>
      {recipes.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {recipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{recipe.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className='flex justify-end'>
                  <Link
                    href={`/recipe/${slugify(recipe.name)}`}
                    className='text-primary'
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/recipes/${recipe.id}/recipe`}
                    className={cn(buttonVariants())}
                  >
                    Edit
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          className={cn('m-auto grid w-full max-w-lg place-items-center')}
        >
          <CardHeader>
            <div className='grid h-20 w-20 place-items-center rounded-full bg-muted'>
              <FileWarning className='h-12 w-12 text-muted-foreground' />
            </div>
          </CardHeader>
          <CardContent className='flex  flex-col items-center justify-center space-y-2.5 text-center'>
            <CardTitle className='text-2xl'>
              {' '}
              You have no recipes yet.
            </CardTitle>
            <CardDescription className='line-clamp-4'>
              Create a recipe to get started.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <div className='flex justify-end'>
              <Link
                href={`/dashboard/recipes/new/recipe`}
                className={cn(buttonVariants())}
              >
                Create Recipe
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </section>
  )
}
export default YourRecipesPage

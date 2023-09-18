import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { recipes as recipesDB } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
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
    return redirect('/sign-in')
  }
  const recipes = await getRecipes(user.id)
  return (
    <section>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe) => (
          <Card>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{recipe.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <div className='flex justify-end'>
                <Link
                  href={`/dashboard/recipes/${recipe.id}`}
                  className={
                    'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
                  }
                >
                  View
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
export default YourRecipesPage

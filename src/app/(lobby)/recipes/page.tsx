import { db } from '@/db'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Shell } from '@/components/shell'

const getRecipeByTimeOfDay = async () => {
  const recipes = await db.query.recipes.findMany()
  // const timeOfDay = new Date().getHours()
  // const category =
  //   timeOfDay < 12 ? 'breakfast' : timeOfDay < 18 ? 'lunch' : 'dinner'
  // const recipe = recipes.filter((recipe) => recipe.category === category)

  return recipes
}

export default async function RecipePage() {
  const recipes = await getRecipeByTimeOfDay()

  return (
    <Shell as='section'>
      <div className='mx-auto w-full rounded-2xl bg-foreground text-background '>
        <div className='mx-auto flex w-full justify-center py-10  text-center'>
          <div>
            <h1 className='flex flex-col gap-y-2 text-5xl font-bold '>
              Recipe of the day
            </h1>
            <div></div>
          </div>
        </div>
      </div>
      <section className='mt-4 '>
        {recipes.map((recipe) =>
          recipe ? (
            <Card key={recipe.id}>
              <div className='mx-auto flex w-full justify-center py-10  text-center'>
                <div>
                  <h1 className='flex flex-col gap-y-2 text-5xl font-bold '>
                    {recipe.name}
                  </h1>
                  <div>
                    <Badge>{recipe.category}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className='mx-auto w-full rounded-2xl bg-foreground text-background '>
              <div className='mx-auto flex w-full justify-center py-10  text-center'>
                <div>
                  <h1 className='flex flex-col gap-y-2 text-5xl font-bold '>
                    No recipe of the day
                  </h1>
                </div>
              </div>
            </div>
          ),
        )}
      </section>
    </Shell>
  )
}

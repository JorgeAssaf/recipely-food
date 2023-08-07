import { Shell } from '@/components/shell'
import { db } from '@/db'

const getRecipeByTimeOfDay = async () => {
  const recipes = await db.query.recipes.findMany()
  const timeOfDay = new Date().getHours()
  const category =
    timeOfDay < 12 ? 'breakfast' : timeOfDay < 18 ? 'lunch' : 'dinner'
  const recipe = recipes.filter((recipe) => recipe.category === category)

  return recipe
}

export default async function RecipePage() {
  const recipe = await getRecipeByTimeOfDay()
  console.log(recipe)
  return (
    <Shell as='section'>
      <div className='mx-auto w-full rounded-2xl bg-foreground text-background '>
        <div className='mx-auto flex w-full justify-center py-10  text-center'>
          <div>
            <h1 className='flex flex-col gap-y-2 text-5xl font-bold '>
              Recipe of the day
            </h1>
            <div>
              <p className='mt-4 '></p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}

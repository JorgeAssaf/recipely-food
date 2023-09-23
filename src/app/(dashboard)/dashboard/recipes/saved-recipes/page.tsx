import type { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs'

import { getSavedRecipesAction } from '@/app/_actions/save'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Saved Recipes',
  description: 'Here are all your saved recipes',
}

const SaveRecipesPage = async () => {
  // const user = await currentUser()
  // const savedRecipes = await getSavedRecipesAction({
  //   userId: user?.id ?? '',
  // })
  // console.log(savedRecipes)
  return (
    <section>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Saved Recipes</h1>
      </div>
      {/* {savedRecipes.map((recipe) => (
        <div key={recipe.id} className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{recipe.name}</h1>
          <p>{recipe.id}</p>
        </div>
      ))} */}
    </section>
  )
}
export default SaveRecipesPage

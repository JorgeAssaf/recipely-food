import type { Metadata } from 'next'

import { SavedRecipes } from '@/components/saved-recipes'
import { getSavedRecipesAction } from '@/app/_actions/save'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Saved Recipes',
  description: 'Here are all your saved recipes',
}

const SaveRecipesPage = async () => {
  const savedRecipes = await getSavedRecipesAction()
  return (
    <section>
      <SavedRecipes savedRecipes={savedRecipes} />
    </section>
  )
}
export default SaveRecipesPage

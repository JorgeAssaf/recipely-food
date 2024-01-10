import Link from 'next/link'
import { Bookmark } from 'lucide-react'

import { getSavedRecipesAction } from '@/app/_actions/save'

import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

export async function SavedRecipesIcon() {
  const savedRecipes = await getSavedRecipesAction()
  const itemCount = savedRecipes?.length ?? 0
  return (
    <div>
      <Link
        href='/dashboard/recipes/saved-recipes'
        className={buttonVariants({
          variant: 'ghost',
          size: 'icon',
          className: 'relative',
        })}
      >
        {itemCount > 0 && (
          <Badge
            aria-label='count of saved recipes'
            variant='secondary'
            className='absolute -right-2 -top-2 h-4 w-4 justify-center rounded-full p-2.5 text-xs'
          >
            {itemCount}
          </Badge>
        )}
        <Bookmark aria-label='Saved Recipes' className='h-6 w-6' />
      </Link>
    </div>
  )
}

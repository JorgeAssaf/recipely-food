import Link from 'next/link'
import { Bookmark } from 'lucide-react'

import { getSavedRecipesAction } from '@/app/_actions/save'

import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

export const SavedRecipesIcon = async ({ userId }: { userId: string }) => {

  const savedRecipes = await getSavedRecipesAction({
    userId: userId,
  })
  const itemCount = savedRecipes.length

  return (
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
          variant='secondary'
          className='absolute -right-2 -top-2 h-4 w-4 justify-center rounded-full p-2.5 text-xs'
        >
          {itemCount}
        </Badge>
      )}
      <Bookmark className='h-6 w-6' />
    </Link>
  )
}

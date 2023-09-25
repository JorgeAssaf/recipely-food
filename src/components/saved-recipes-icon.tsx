import { forwardRef } from 'react'
import Link from 'next/link'
import { Bookmark } from 'lucide-react'

import { getSavedRecipesAction } from '@/app/_actions/save'

import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

export const SavedRecipesIcon = forwardRef<
  HTMLAnchorElement,
  { userId: string }
>(async ({ userId }, ref) => {
  const savedRecipes = await getSavedRecipesAction({
    userId: userId ?? '',
  })
  const itemCount = savedRecipes.length
  return (
    <Link
      ref={ref}
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
  )
})

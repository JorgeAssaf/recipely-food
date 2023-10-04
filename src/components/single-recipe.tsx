'use client'

import Image from 'next/image'
import { type Recipes } from '@/db/schema'

import { slugify } from '@/lib/utils'

import Breadcrumbs from './breadcrumbs'
import { AspectRatio } from './ui/aspect-ratio'

const SingleRecipe = ({ recipe }: { recipe: Recipes }) => {
  return (
    <>
      <Breadcrumbs
        segments={[
          {
            title: 'Recipes',
            href: '/recipes',
          },
          {
            title: recipe.category,
            href: `/categories/${recipe.category}`,
          },
          {
            title: recipe.name,
            href: `/recipe/${slugify(recipe.name)}`,
          },
        ]}
      />
      {recipe.images && recipe.images.length > 0 ? (
        <AspectRatio ratio={16 / 9}>
          <Image
            src={recipe.images[0].url}
            alt={recipe.name}
            fill
            priority
            className='object-cover'
            sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
          />
        </AspectRatio>
      ) : null}
      <h1 className='text-3xl'>{recipe.name ?? 'No recipe found'}</h1>

      {/* <Button
        onClick={() => {
          startTransition(async () => {

            await likeRecipeAction(
              recipe.id,
              likeRecipe ? recipe.likes! - 1 : recipe.likes! + 1,
            )
            setLikeRecipe(!likeRecipe)
          })
        }}
        disabled={isPending}
        className='mt-4'
      >
        {recipe.likes}
        {likeRecipe ? (
          <ThumbsUp className='inline-block h-6 w-6 text-yellow-400' />
        ) : (
          <ThumbsUp className='inline-block h-6 w-6 text-slate-500' />
        )}
        {likeRecipe ? 'Liked' : 'Like'}
      </Button>

      <Button className='mt-4' disabled={isPending} onClick={() => {
        startTransition(async () => {
          const user = await currentUser()
          if (!user) {
            toast('You must be logged in to like a recipe')
            return
          }

          await dislikeRecipeAction(
            recipe.id,
            dislikes ? recipe.dislikes! - 1 : recipe.dislikes! + 1,
            user?.id!,
          )
          setDislikes(!dislikes)
        })
      }
      }> 

        {recipe.dislikes}
        {dislikes ? (
          <ThumbsDown className='inline-block h-6 w-6 text-yellow-400' />
        ) : (
          <ThumbsDown className='inline-block h-6 w-6 text-slate-500' />
        )}
        {dislikes ? 'Disliked' : 'Dislike'}
      </Button>
*/}

      <ul className='mt-4 flex flex-col flex-wrap gap-2'>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className='list-inside list-disc'>
            {ingredient.quantity} {ingredient.units} of{' '}
            <span className='font-semibold'>{ingredient.ingredient}</span>
          </li>
        ))}
      </ul>
      <article className='prose  text-primary'>
        <p>{recipe.steps}</p>
        {/* {recipe.rating}
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < recipe.rating) {
            console.log(recipe.rating)
            return <Star className='inline-block h-6 w-6 text-yellow-400' />
          } else if (index === Math.ceil(recipe.rating)) {
            return <StarHalf className='inline-block h-6 w-6 text-yellow-400' />
          } else {
            return <Star className='inline-block h-6 w-6 text-slate-500' />
          }
        })} */}
      </article>
    </>
  )
}
export default SingleRecipe

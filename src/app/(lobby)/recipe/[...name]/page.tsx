import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { db } from '@/db'

import { deslugify } from '@/lib/utils'
import { Shell } from '@/components/shell'

type MetaProps = {
  params: { name: string }
}

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const name = deslugify(params.name)

  const recipe = await db.query.recipes.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: (recipes, { eq }) => eq(recipes.name, name),
  })

  return {
    title: recipe?.name,
    description: recipe?.description,
  }
}

interface RecipePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    name: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipeName = deslugify(params.name)

  const recipe = await db.query.recipes.findFirst({
    where: (recipes, { eq }) => eq(recipes.name, recipeName),
  })

  if (!recipe) {
    notFound()
  }

  return (
    <Shell as='div'>
      {recipe.images && recipe.images.length > 0 ? (
        <Image
          src={recipe.images[0].url}
          alt={recipe.name}
          width={900}
          height={600}
        />
      ) : null}
      <h1 className='text-3xl'>{recipe.name}</h1>
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
      </article>
    </Shell>
  )
}

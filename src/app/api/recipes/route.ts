import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as { name: string }

    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 })
    }
    const recipe = await db.query.recipes.findMany({
      where: (recipes, { eq }) => eq(recipes.name, name),
    })
    if (recipe.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    return NextResponse.json({ data: recipe }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 },
    )
  }
}

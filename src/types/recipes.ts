import { ingredients } from "@/db/schema"

export interface RecipesType {
  title: string
  description: string
  slug: string
  prepTime: number
  image: string
  tags: string[]
  ingredients: IngredientsType[]
  instructions: string[]
}
export interface IngredientsType {
  ingredient: string
  quantity: string
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pinch'
}

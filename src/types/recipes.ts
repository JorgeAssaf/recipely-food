import { ingredients } from "@/db/schema"

export interface RecipesType {
  title: string
  description: string
  slug: string
  image: string
  tags: string[]
  ingredients: string[]
  instructions: string[]
  notes: string[]
}
export interface IngredientsType {
  ingredient: string
  quantity: string
  description: string
  unit: keyof typeof ingredients.unit.enumValues
}

import { type FileWithPath } from 'react-dropzone'

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
  quantity: number
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pinch'
}

export interface FileUpload {
  name: string
  id: string
  url: string
}
export type FileWithPreview = FileWithPath & { preview: string }

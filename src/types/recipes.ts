import { type FileWithPath } from 'react-dropzone'

export type Option = {
  label: string
  value: string
}
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

export enum Units {
  gram = 'g',
  milligram = 'mg',
  kilogram = 'kg',
  package = 'package',
  piece = 'piece',
  pound = 'pond',
  pieces = 'pieces',
  millilitre = 'ml',
  litre = 'l',
  onz = 'oz',
  teaspoon = 'tsp',
  tablespoon = 'tbsp',
  cup = 'cup',
  pinch = 'pinch',
  unit = 'unit',
  drop = 'drop',
}

export interface IngredientsType {
  ingredient: string
  quantity: number
  units: Units
}

export interface FileUpload {
  name: string
  id: string
  url: string
}
export type FileWithPreview = FileWithPath & { preview: string }

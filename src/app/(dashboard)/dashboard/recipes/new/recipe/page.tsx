import type { Metadata } from 'next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AddNewRecipe } from '@/components/forms/new-recipe-form'

export const metadata: Metadata = {
  title: 'New Recipe',
  description: 'Add a new recipe to your collection.',
}

export default function NewRecipePage() {
  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Add New Recipe</CardTitle>
        <CardDescription>Add a new recipe to your collection.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddNewRecipe />
      </CardContent>
    </Card>
  )
}

import { AddNewRecipe } from '@/components/forms/new-recipe-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function NewRecipePage() {
  return (

    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Add New Recipe</CardTitle>
        <CardDescription> Add a new recipe to your collection.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddNewRecipe />
      </CardContent>
    </Card>


  )
}

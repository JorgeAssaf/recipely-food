import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

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

export default async function NewRecipePage() {
  const user = await currentUser()
  if (!user) {
    return redirect('/sign-in')
  }
  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Add New Recipe</CardTitle>
        <CardDescription> Add a new recipe to your collection.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddNewRecipe
          userId={user.id}
          userName={`${user.firstName} ${user.lastName}`}
        />
      </CardContent>
    </Card >
  )
}

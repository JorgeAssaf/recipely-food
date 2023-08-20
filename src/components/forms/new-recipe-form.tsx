'use client'

import { useState } from 'react'
import { ingredients, recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { recipesSchema } from '@/lib/validations/recipes'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

export function AddNewRecipe() {
  const [addIngredients, setAddIngredients] = useState([
    {
      title: 'salt',
      quantity: 1,
      unit: 'kg',
    },
  ])
  const [howManyIngredients, setHowManyIngredients] = useState(1)
  const form = useForm<z.infer<typeof recipesSchema>>({
    resolver: zodResolver(recipesSchema),
    defaultValues: {
      category: 'breakfast',
      ingredients: {
        unit: 'kg',
      },
    },
  })
  form.watch((data) => console.log(data))
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof recipesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  console.log(ingredients.quantity)
  return (
    <Form {...form}>
      <form
        className='grid w-full max-w-2xl gap-5'
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Recipe Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder='Type product name here.'
              {...form.register('name')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(recipes.category.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className='capitalize'
                          >
                            {option}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Ingredient</FormLabel>
          <FormField
            control={form.control}
            name='ingredients'
            render={({ field }) => (
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(ingredients.unit.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className='capitalize'
                          >
                            {option}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />

          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.ingredients?.title}
              placeholder='Type product name here.'
              {...form.register('ingredients.title')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button
          onClick={() =>
            setAddIngredients([
              ...addIngredients,
              {
                title: '',
                quantity: 1,
                unit: 'kg',
              },
            ])
          }
        >
          Add Ingredient
        </Button>

        <FormMessage />
        <FormLabel>Instructions</FormLabel>
        <FormDescription>
          Please add each instruction on a new line.
        </FormDescription>
        <FormControl>
          <Textarea rows={5} {...form.register('steps')} />
        </FormControl>
        <FormMessage />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

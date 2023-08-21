'use client'

import { useTransition } from 'react'
import { ingredients, recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof recipesSchema>>({
    resolver: zodResolver(recipesSchema),
    defaultValues: {
      category: 'breakfast',
      ingredients: [
        {
          unit: 'kg',
        },
      ],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
    rules: {
      maxLength: 10,
      minLength: 0,
      required: true,
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof recipesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values })
  }

  return (
    <Form {...form}>
      <form
        className='grid w-full max-w-2xl gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
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

          {fields.map((field, index) => (
            <div key={field.id}>
              <div className='flex gap-5'>
                <FormControl>
                  <Input
                    placeholder='Type product name here.'
                    {...form.register(`ingredients.${index}.title` as const)}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder='Type product name here.'
                    {...form.register(`ingredients.${index}.quantity` as const)}
                  />
                </FormControl>

                <FormControl>
                  <Select>
                    <SelectTrigger className='capitalize'>
                      <SelectValue placeholder={field.unit} />
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
                <Button
                  type='button'
                  onClick={() => {
                    remove(index)
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </FormItem>

        <Button
          type='button'
          onClick={() =>
            append({
              title: '',
              quantity: '',
              description: '',
              unit: 'kg',
            })
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

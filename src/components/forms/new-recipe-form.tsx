'use client'

import { useTransition } from 'react'
import { ingredients, recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { AddRecipeAction, DeleteRecipesAction } from '@/app/_actions/recipes'

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
  const form = useForm()
  //<z.infer<typeof recipesSchema>>({
  //   resolver: zodResolver(recipesSchema),
  //   defaultValues: {
  //     category: recipes.category.enumValues[0],
  //     difficulty: recipes.difficulty.enumValues[0],
  //     ingredients: [
  //       {
  //         unit: 'kg',
  //       },
  //     ],
  //   },
  // })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `ingredients`,
    rules: {
      maxLength: 10,
      minLength: 0,
      required: true,
    },
  })
  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof recipesSchema>) {
    startTransition(async () => {
      try {
        await AddRecipeAction({
          name: data.name,
          description: data.description ?? '',
          category: data.category,
          difficulty: data.difficulty,
          ingredients: data.ingredients,

          steps: data.steps,
        })
        toast.success(`The recipe ${data.name} added.`)
        form.reset()
      } catch (error) {
        toast.error('Something went wrong.')
        console.log(error)
      }
    })

    console.log(data)
  }

  return (
    <>
      <Form {...form}>
        <form
          className='grid w-full max-w-2xl gap-5'
          // @ts-ignore
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

            {fields.map((field, index) => (
              <div key={field.id}>
                <div className='flex gap-5'>
                  <FormControl>
                    <Input
                      inputMode='text'
                      type='text'
                      placeholder='Type product name here.'
                      {...form.register(
                        `ingredients.${index}.ingredient` as const,
                      )}
                    />
                  </FormControl>

                  <FormControl>
                    <Input
                      inputMode='numeric'
                      placeholder='Type quantity here.'
                      {...form.register(
                        `ingredients.${index}.quantity` as const,
                      )}
                    />
                  </FormControl>

                  <FormControl>
                    <Select>
                      <SelectTrigger className='capitalize'>
                        {/* @ts-ignore */}
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
                ingredient: '',
                quantity: '0',
                description: '',
                unit: 'kg',
              })
            }
          >
            Add Ingredient
          </Button>
          <FormField
            control={form.control}
            name='difficulty'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Difficulty</FormLabel>
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
                        {Object.values(recipes.difficulty.enumValues).map(
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
      <Button
        onClick={() => {
          startTransition(async () => {
            await DeleteRecipesAction()
          })
        }}
      >
        {isPending ? <Loader2 className='h-3 w-3 animate-spin' /> : null}
        {isPending ? 'Generating...' : 'Generate'}
      </Button>
    </>
  )
}

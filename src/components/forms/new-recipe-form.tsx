'use client'

import { useTransition } from 'react'
import { ingredients, recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { cn } from '@/lib/utils'
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
  UncontrolledFormMessage,
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
  const form = useForm<z.infer<typeof recipesSchema>>({
    resolver: zodResolver(recipesSchema),
    defaultValues: {
      category: recipes.category.enumValues[0],
      difficulty: recipes.difficulty.enumValues[0],
      ingredients: [
        {
          unit: 'kg',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `ingredients`,
    rules: {
      maxLength: 10,
      minLength: 0,
      required: true,
    },
  })

  function onSubmit(data: z.infer<typeof recipesSchema>) {
    startTransition(async () => {
      try {
        await AddRecipeAction({
          name: data.name,
          description: data.description,
          category: data.category,
          prepTime: data.prepTime,
          difficulty: data.difficulty,
          ingredients: data.ingredients,
          steps: data.steps,
        })
        toast.success(`The recipe ${data.name} added.`)
        form.reset()
      } catch (error) {
        toast.error('Something went wrong.')
      }
    })
    console.log(data)
  }

  return (
    <>
      <Form {...form}>
        <form
          className='grid w-full max-w-2xl gap-5'
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder='Type product name here.'
                {...form.register('name')}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.name?.message}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Type product description here.'
                {...form.register('description')}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.description?.message}
            />
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
                <UncontrolledFormMessage
                  message={form.formState.errors.category?.message}
                />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Ingredients</FormLabel>

            {fields.map((field, index) => (
              <div key={field.id}>
                <div className='flex gap-5'>
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Insert ingredient.'
                        {...form.register(
                          `ingredients.${index}.ingredient` as const,
                        )}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        form.formState.errors.ingredients?.[index]?.ingredient
                          ?.message
                      }
                    />
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Input
                        inputMode='numeric'
                        placeholder='Insert quantity.'
                        {...form.register(
                          `ingredients.${index}.quantity` as const,
                        )}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        form.formState.errors.ingredients?.[index]?.quantity
                          ?.message
                      }
                    />
                  </FormItem>

                  <FormItem>
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
                    <UncontrolledFormMessage
                      message={
                        form.formState.errors.ingredients?.[index]?.unit
                          ?.message
                      }
                    />
                  </FormItem>

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
            <UncontrolledFormMessage
              message={form.formState.errors.ingredients?.message}
            />
          </FormItem>

          <Button
            type='button'
            onClick={() =>
              append({
                ingredient: '',
                unit: 'kg',
                quantity: '0',
              })
            }
          >
            Add Ingredient
          </Button>

          <FormField
            control={form.control}
            name='prepTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className={cn('text-primary')}>
                  Prep Time <FormDescription>(in minutes)</FormDescription>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Type product prep time here.'
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormItem>
            <FormLabel>Steps</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Type product steps here.'
                {...form.register('steps')}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.steps?.message}
            />
          </FormItem>

          <Button
            onClick={() =>
              void form.trigger(['name', 'description', 'prepTime', 'steps'])
            }
            className='w-fit'
            disabled={isPending}
          >
            {isPending && (
              <Loader2
                className='mr-2 h-4 w-4 animate-spin'
                aria-hidden='true'
              />
            )}
            Add Product
            <span className='sr-only'>Add Product</span>
          </Button>
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

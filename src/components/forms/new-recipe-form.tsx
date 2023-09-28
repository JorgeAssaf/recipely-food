'use client'

import { useState, useTransition } from 'react'
import { recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import { Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { FileWithPreview, Units } from '@/types/recipes'
import { cn, isArrayOfFile } from '@/lib/utils'
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
import { AddRecipeAction, generateRecipes } from '@/app/_actions/recipes'
import { OurFileRouter } from '@/app/api/uploadthing/core'

import FileDialog from '../file-dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Zoom } from '../zoom-image'

type Inputs = z.infer<typeof recipesSchema>
const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddNewRecipe() {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing('recipeUpload')
  const [isPending, startTransition] = useTransition()
  const form = useForm<Inputs>({
    resolver: zodResolver(recipesSchema),
    defaultValues: {
      category: 'breakfast',
      difficulty: 'easy',
      ingredients: [
        {
          units: Units.kilogram,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `ingredients`,
    rules: {
      maxLength: 10,
      minLength: 1,
      required: true,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
            const formattedImages = res?.map((image) => ({
              id: image.key,
              name: image.name,
              url: image.url,
            }))

            return formattedImages ?? null
          })
          : null

        toast.promise(
          AddRecipeAction({
            ...data,
            images,
          }),
          {
            loading: 'Adding recipe...',
            success: () => {
              form.reset()
              setFiles(null)
              return 'Recipe added successfully.'
            },
            error: (err: unknown) => {
              if (err instanceof Error) {
                return err.message
              }
              return 'Something went wrong.'
            },
          },
        )
      } catch (error: any) {
        toast.error(error.message ?? 'Something went wrong.')
      }
    })
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
          <FormItem className='flex w-full flex-col gap-1.5'>
            <FormLabel>Image</FormLabel>
            {files ? (
              <div className='flex items-center gap-2'>
                {files.map((file, i) => (
                  <Zoom key={i}>
                    <img
                      src={file.preview}
                      alt={file.name}
                      className='h-24 w-24 shrink-0 rounded-md object-cover object-center'
                      loading='lazy'
                    />
                  </Zoom>
                ))}
              </div>
            ) : null}
            <FormControl>
              <FileDialog
                setValue={form.setValue}
                name='images'
                maxFiles={3}
                maxSize={1024 * 1024 * 4}
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
                disabled={isPending}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.images?.message}
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
                <div className='flex flex-col gap-5 md:flex-row'>
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
                          { valueAsNumber: true },
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

                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.units` as const}
                    render={({ field }) => (
                      <FormItem>
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
                                {Object.values(Units).map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className='capitalize'
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                units: Units.kilogram,
                quantity: 0,
              })
            }
          >
            Add Ingredient
          </Button>

          <FormItem className='w-full'>
            <FormLabel className={cn('text-primary')}>
              Prep Time <FormDescription>(in minutes)</FormDescription>
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                inputMode='numeric'
                placeholder='How long does it take to prepare the product?'
                {...form.register('prepTime', { valueAsNumber: true })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={
                form.formState.errors.prepTime?.message
                  ? 'Missing prep time or prep time is not a number'
                  : ''
              }
            />
          </FormItem>

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
    </>
  )
}

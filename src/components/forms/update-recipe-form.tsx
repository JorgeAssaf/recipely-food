'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Recipes, recipes } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import { Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { DeleteRecipeAction, UpdateRecipeAction } from '@/app/_actions/recipes'
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

type AddNewRecipeProps = {
  recipe: Recipes
}
const { useUploadThing } = generateReactHelpers<OurFileRouter>()

const UpdateRecipeForm = ({ recipe }: AddNewRecipeProps) => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const { isUploading, startUpload } = useUploadThing('recipeUpload')
  const router = useRouter()
  useEffect(() => {
    if (recipe.images && recipe.images.length > 0) {
      setFiles(
        recipe.images.map((image) => {
          const file = new File([], image.name, {
            type: 'image',
          })
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          })

          return fileWithPreview
        }),
      )
    }
  }, [recipe])
  const form = useForm<Inputs>({
    resolver: zodResolver(recipesSchema),
    defaultValues: {
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      prepTime: recipe.prepTime,
      difficulty: recipe.difficulty,
      steps: recipe.steps ?? '',
      ingredients: recipe.ingredients,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
            const formattedImages = res?.map((image) => ({
              id: image.key,
              name: image.key.split('_')[1] ?? image.key,
              url: image.url,
            }))
            return formattedImages ?? null
          })
          : null

        await UpdateRecipeAction({
          ...data,
          id: recipe.id,
          images: images ?? recipe.images,
        })

        toast.success('Recipe updated successfully.')
        router.push(`/dashboard/recipes/your-recipes`)
      } catch (error) { }
    })
  }
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

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
                        type='number'
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
            onClick={() => {
              append({
                ingredient: '',
                quantity: 0,
                units: Units.kilogram,
              })
            }}
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

          <div className='flex gap-5'>
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
            <Button
              variant='destructive'
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  void form.trigger([
                    'name',
                    'description',
                    'prepTime',
                    'steps',
                  ])
                  await DeleteRecipeAction({
                    id: recipe.id,
                  })
                })
                router.push(`/dashboard/recipes/your-recipes`)
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
export default UpdateRecipeForm
import type { Metadata } from 'next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { toTitleCase } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

const names = [
  'Basil',
  'Cilantro',
  'Mint',
  'Parsley',
  'Rosemary',
  'Sage',
  'Thyme',
  'Oregano',
  'Chives',
  'Dill',
  'Tarragon',
  'Marjoram',
  'Lemongrass',
  'Bay Leaf',
  'Lavender',
  'Chamomile',
  'Borage',
  'Fennel',
  'Sorrel',
]

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  return {
    title: `${toTitleCase(params.category.toString())} Recipes`,
    description: `View all recipes in the ${toTitleCase(
      params.category.toString(),
    )} category`,
  }
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  return (
    <Shell as='main'>
      <div>
        <PageHeader
          size='sm'
          title={toTitleCase(params.category.toString())}
          description='View all recipes in this category'
        />
        <div className='flex flex-col space-y-6'>
          <div className='flex items-center space-x-2'>
            <Sheet>
              <SheetTrigger asChild>
                <Button aria-label='Filter products' className='my-3' size='sm'>
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent className='flex flex-col'>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <Separator />

                {/* <h3 className='text-sm font-medium tracking-wide text-foreground'>
                  Categories
                </h3>
                <MultiSelect /> */}
                <div className='flex flex-1 flex-col gap-5 overflow-hidden px-1'>
                  <div className='space-y-4'>
                    <h3 className='text-sm font-medium tracking-wide text-foreground'>
                      Time {'(minutes)'}
                    </h3>
                    <Slider
                      variant='range'
                      thickness='thin'
                      defaultValue={[0, 500]}
                      max={500}
                      step={1}
                    // value={priceRange}
                    // onValueChange={(value: typeof priceRange) => {
                    //   setPriceRange(value)
                    // }}
                    />
                    <div className='flex items-center space-x-4'>
                      <Input
                        type='number'
                        inputMode='numeric'
                        min={0}
                        // max={priceRange[1]}
                        className='h-9'
                      // value={priceRange[0]}
                      // onChange={(e) => {
                      //   const value = Number(e.target.value)
                      //   setPriceRange([value, priceRange[1]])
                      // }}
                      />
                      <span className='text-muted-foreground'>-</span>
                      <Input
                        type='number'
                        inputMode='numeric'
                        // min={priceRange[0]}
                        max={500}
                        className='h-9'
                      // value={priceRange[1]}
                      // onChange={(e) => {
                      //   const value = Number(e.target.value)
                      //   setPriceRange([priceRange[0], value])
                      // }}
                      />
                    </div>
                    <h3 className='text-sm font-medium tracking-wide text-foreground'>
                      Dificulty
                    </h3>
                    {['Easy', 'Medium', 'Hard'].map((dificulty) => (
                      <div
                        className='flex items-center space-x-2'
                        key={dificulty}
                      >
                        <Checkbox id={dificulty} />
                        <label
                          htmlFor={dificulty}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {dificulty}
                        </label>
                      </div>
                    ))}

                    <div className='space-y-3'>
                      <div className='flex items-center gap-2'>
                        <h3 className='flex-1 text-sm font-medium tracking-wide text-foreground'>
                          Authors
                        </h3>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                          // onClick={() => {
                          //   startTransition(() => {
                          //     router.push(
                          //       `${pathname}?${createQueryString({
                          //         store_page: Number(store_page) - 1,
                          //       })}`
                          //     )
                          //   })
                          // }}
                          // disabled={Number(store_page) === 1 || isPending}
                          >
                            <ChevronLeft
                              className='h-4 w-4'
                              aria-hidden='true'
                            />
                            <span className='sr-only'>Previous store page</span>
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                          // onClick={() => {
                          //   startTransition(() => {
                          //     router.push(
                          //       `${pathname}?${createQueryString({
                          //         store_page: Number(store_page) + 1,
                          //       })}`
                          //     )
                          //   })
                          // }}
                          // disabled={
                          //   Number(store_page) === storePageCount || isPending
                          // }
                          >
                            <ChevronRight
                              className='h-4 w-4'
                              aria-hidden='true'
                            />
                            <span className='sr-only'>Next store page</span>
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className='h-96'>
                        <div className='space-y-4'>
                          {names.map((store) => (
                            <div
                              key={store}
                              className='flex items-center space-x-2'
                            >
                              <Checkbox id={`store-${store}`} />
                              <Label
                                htmlFor={`store-${store}`}
                                className='line-clamp-1 py-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                {store}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Shell>
  )
}

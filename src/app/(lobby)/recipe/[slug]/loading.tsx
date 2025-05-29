import { ImageIcon } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/shell'

export default function RecipeLoading() {
  return (
    <Shell>
      <div className='mb-5 flex items-center gap-5'>
        <div>
          <Skeleton className='h-8 w-20' />
        </div>
        <div>
          <Skeleton className='h-8 w-20' />
        </div>
        <div>
          <Skeleton className='h-8 w-20' />
        </div>
        <div>
          <Skeleton className='h-8 w-20' />
        </div>
      </div>

      <section className='grid grid-cols-1 gap-7 md:grid-cols-2'>
        <div
          aria-label='Product Placeholder'
          role='img'
          aria-roledescription='placeholder'
          className='bg-secondary flex aspect-square h-auto w-full flex-1 items-center justify-center'
        >
          <div className='flex flex-col items-center justify-center gap-4'>
            <ImageIcon
              className='text-muted-foreground size-9'
              aria-hidden='true'
            />
          </div>
        </div>
        <Skeleton className='h-auto rounded-2xl' />
      </section>
    </Shell>
  )
}

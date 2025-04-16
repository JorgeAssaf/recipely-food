import { ImageIcon } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/shell'

export default function CategoriesLoading() {
  return (
    <Shell>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-36' />
        <Skeleton className='h-4 w-48' />
      </div>
      <div className='flex flex-col space-y-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {new Array(7).fill(0).map((_, i) => (
            <Card key={i} className='rounded-sm'>
              <CardHeader className='border-b p-0'>
                <AspectRatio ratio={16 / 9}>
                  <div className='flex h-full items-center justify-center bg-secondary'>
                    <ImageIcon
                      className='h-9 w-9 text-muted-foreground'
                      aria-hidden='true'
                    />
                  </div>
                </AspectRatio>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}

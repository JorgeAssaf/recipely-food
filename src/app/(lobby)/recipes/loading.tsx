import { ImageIcon } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/shell'

export default function RecipesLoading() {
  return (
    <Shell>
      <div className='space-y-3'>
        <Skeleton className='h-10 w-28' />
        <Skeleton className='h-4 w-48' />
      </div>
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-9 w-14' />
          <Skeleton className='h-9 w-20' />
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, i) => (
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
              <CardContent className='grid gap-3 p-4'>
                <Skeleton className='h-4 w-10/12' />
                <Skeleton className='h-4 w-11/12' />
              </CardContent>
              <CardFooter className='flex items-center justify-between gap-4 p-4'>
                <Skeleton className='h-6 w-11/12 rounded-sm' />
                <Skeleton className='h-6 w-11/12 rounded-sm' />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function NewProductLoading() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-4 w-2/4' />
      </CardHeader>
      <CardContent className='h-auto'>
        <div className='grid w-full max-w-xl gap-10'>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-20' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />

            <div className='grid grid-cols-4 gap-4'>
              <Skeleton className='h-6' />
              <Skeleton className='h-6' />
              <Skeleton className='h-6' />
              <Skeleton className='h-6' />
            </div>
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-2 w-24' />
            <Skeleton className='h-6' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-20' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

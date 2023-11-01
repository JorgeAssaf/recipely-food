import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {new Array(6).fill(0).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/4' />
          </CardContent>
          <CardFooter>
            <Skeleton className='h-7 w-1/3' />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

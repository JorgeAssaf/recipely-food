import { toTitleCase } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Heading } from '@/components/heading'
import { MultiSelect } from '@/components/multi-select'
import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shell'

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  console.log(params.category)
  return (
    <Shell as='main'>
      <div>
        <PageHeader
          size='sm'
          title={toTitleCase(params.category.toString())}
          description='View all recipes in this category'
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label='Filter products' className='my-3' size='sm'>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter by category</SheetDescription>
            </SheetHeader>
            <MultiSelect />
          </SheetContent>
        </Sheet>
      </div>
    </Shell>
  )
}

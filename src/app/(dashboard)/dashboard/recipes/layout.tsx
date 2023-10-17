import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { RecipesTabs } from '@/components/recipes-tabs'
import { Shell } from '@/components/shell'

export default function RecipesLayout({ children }: React.PropsWithChildren) {
  return (
    <Shell variant='sidebar'>
      <div className='xxs:flex-row flex flex-col gap-4 pr-1'>
        <PageHeader id='blog-header' aria-labelledby='blog-header-heading'>
          <PageHeaderHeading>Dashboard</PageHeaderHeading>
          <PageHeaderDescription>
            Manage your recipes and create new ones{' '}
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <RecipesTabs />
      <div className='space-y-8 overflow-auto'>{children}</div>
    </Shell>
  )
}

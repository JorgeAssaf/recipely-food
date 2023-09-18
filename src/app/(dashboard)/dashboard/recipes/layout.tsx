import { PageHeader } from '@/components/page-header'
import { RecipesTabs } from '@/components/recipes-tabs'
import { Shell } from '@/components/shell'

interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function RecipesLayout({ children }: LobbyLayoutProps) {
  return (
    <Shell variant='sidebar'>
      <div className='xxs:flex-row flex flex-col gap-4 pr-1'>
        <PageHeader
          title='Dashboard'
          description='Manage your recipes and create new ones.
        '
        />
      </div>
      <RecipesTabs />
      <div className='space-y-8 overflow-auto'>{children}</div>
    </Shell>
  )
}

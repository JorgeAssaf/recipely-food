'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export function RecipesTabs() {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: 'Your Recipes',
      href: '/dashboard/recipes/my-recipes',
      isActive: segment === 'my-recipes',
    },
    {
      title: 'Add New Recipe',
      href: '/dashboard/recipes/new/recipe',
      isActive: segment === 'new',
    },
    {
      title: 'Saved Recipes',
      href: '/dashboard/recipes/saved-recipes',
      icon: 'bookMark',
      isActive: segment === 'saved-recipes',
    },
  ]

  return (
    <Tabs
      aria-label='Tabs for recipes'
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className='bg-background sticky top-0 z-30 w-full overflow-auto px-1'
      onValueChange={(value) => router.push(value)}
    >
      <TabsList
        className='text-muted-foreground inline-flex items-center justify-center space-x-1.5'
        aria-label='Recipes tabs'
      >
        {tabs.map((tab) => (
          <div
            role='none'
            key={tab.href}
            className={cn(
              'border-b-2 border-transparent py-1.5',
              tab.isActive && 'border-foreground',
            )}
          >
            <TabsTrigger
              aria-label='Recipes tab'
              value={tab.href}
              className={cn(
                'text-muted-foreground ring-offset-background hover:bg-muted hover:text-primary focus-visible:ring-ring inline-flex items-center justify-center rounded-sm px-2.5 py-1.5 text-[0.83rem] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none md:text-sm',
                tab.isActive && 'text-foreground',
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  )
}

'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { type Recipes } from '@/db/schema'
import { SearchIcon } from 'lucide-react'

import { recipesCategories } from '@/config/recipes'
import { cn, isMacOs, slugify } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { filterProductsAction } from '@/app/_actions/recipes'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

type RecipeGroup = {
  category: Recipes['category']
  recipes: Pick<Recipes, 'id' | 'name' | 'category'>[]
}

const Combobox = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const debouncedQuery = useDebounce<string>(query, 300)
  const [data, setData] = useState<RecipeGroup[] | null>(null)

  useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null)
      return
    }

    let mounted = true
    function fetchData() {
      startTransition(async () => {
        const data = await filterProductsAction(debouncedQuery)
        if (mounted) {
          setData(data)
        }
      })
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [debouncedQuery])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setOpen(true)}
      >
        <SearchIcon className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>Search recipes...</span>
        <span className='sr-only'>Search recipes</span>
        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
          <abbr title={isMacOs() ? 'Command' : 'Control'}>
            {isMacOs() ? '⌘' : 'Ctrl+'}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position='top' open={open} onOpenChange={setOpen}>
        <CommandInput
          role='search'
          value={query}
          onValueChange={setQuery}
          placeholder='Search recipes...'
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm')}
          >
            No recipes found.
          </CommandEmpty>

          {isPending ? (
            <div className='space-y-1 overflow-hidden px-1 py-2'>
              <Skeleton className='h-4 w-10 rounded' />
              <Skeleton className='h-8 rounded-sm' />
              <Skeleton className='h-8 rounded-sm' />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.category}
                className='capitalize'
                heading={group.category}
              >
                {group.recipes.map((item) => {
                  const CategoryIcon =
                    recipesCategories.find(
                      (category) => category.title === group.category,
                    )?.icon ?? recipesCategories[0].icon

                  return (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={() =>
                        handleSelect(() =>
                          router.push(`/recipe/${slugify(item.name)}`),
                        )
                      }
                    >
                      <CategoryIcon
                        className='mr-2 h-4 w-4 text-muted-foreground'
                        aria-hidden='true'
                      />
                      <span className='truncate capitalize'>{item.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default Combobox

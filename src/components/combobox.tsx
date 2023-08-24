'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/db'
import { recipes, type Recipes } from '@/db/schema'
import { like } from 'drizzle-orm'
import { SearchIcon } from 'lucide-react'

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

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { filterProductsAction } from '@/app/_actions/recipes'

const Combobox = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const debounceQuery = useDebounce<string>(query, 300)
  const [data, setData] = useState<
    | {
      category: Recipes['category']
      recipes: Pick<Recipes, 'id' | 'name' | 'category'>[]
    }[]
    | null
  >(null)

  useEffect(() => {
    if (debounceQuery === '') setData(null)
    if (debounceQuery.length > 0) {
      startTransition(async () => {
        const data = await filterProductsAction(debounceQuery)
        setData(data)
      })
    }
  }, [debounceQuery])

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

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        aria-label='Search Recipes'
        variant='outline'
        className='relative h-9 w-9 p-0 sm:h-10 sm:w-60 sm:justify-start sm:px-3 sm:py-2'
      >
        <SearchIcon className='h-4 w-4 sm:mr-2' aria-hidden='true' />
        <span className='hidden sm:inline-flex'>Search Recipes...</span>
        <span className='sr-only'>Search Recipes</span>
        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <abbr title={isMacOs() ? 'Command' : 'Control'}>
            {isMacOs() ? '⌘' : 'Ctrl+'}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position='top' open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Search products...'
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandList>
            <CommandEmpty
              className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm')}
            >
              No products found.
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
                  {group.recipes.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() =>
                        handleSelect(() =>
                          router.push(
                            `/recipe/${slugify(item.name!.toString())}`,
                          ),
                        )
                      }
                    >
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default Combobox

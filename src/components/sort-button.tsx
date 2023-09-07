'use client'

import { type FC, useCallback, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface SortProps {
  sortOptions: {
    label: string
    value: string
  }[]
}

const SortButton: FC<SortProps> = ({ sortOptions }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Sort products' size='sm'>
          Sort
          <ChevronDown className='ml-2 h-4 w-4' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-auto'>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isPending ? (
          <Skeleton className='h-8 w-full' />
        ) : (
          sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                startTransition(() => {
                  router.push(
                    `${pathname}?${createQueryString({
                      sort: option.value,
                    })}`,
                    {
                      scroll: false,
                    },
                  )
                })
              }}
            >
              {option.label}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default SortButton

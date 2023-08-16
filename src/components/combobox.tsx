'use client'

import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

import { isMacOs } from '@/lib/utils'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import { Button } from './ui/button'

const Combobox = () => {
  const [open, setOpen] = useState(false)

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
        <CommandInput placeholder='Search products...' />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default Combobox

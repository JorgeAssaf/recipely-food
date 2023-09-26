'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { X } from 'lucide-react'

import { Option } from '@/types/recipes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'

type MultiSelectProps = React.HTMLAttributes<HTMLDivElement> & {
  options: Option[]
  selected?: Option[]
  onChange?: (value: Option[] | null) => void
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>
}

export const MultiSelect = ({
  options,
  selected,
  onChange,
  setSelected,
  ...props
}: MultiSelectProps) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (onChange) onChange(selected?.length ? selected : null)
  }, [onChange, selected])
  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (selected?.find((item) => item.value === option.value)) return false

        if (query.length === 0) return true

        return option.label.toLowerCase().includes(query.toLowerCase())
      }),
    [options, selected, query],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (inputRef.current === null) return
      if (e.key === 'Backspace' || e.key === 'Delete') {
        setSelected((prev) => prev.slice(0, prev.length - 1))
      }
      if (e.key === 'Escape') {
        inputRef.current.blur()
      }
    },
    [setSelected],
  )
  const handleRemove = useCallback(
    (option: Option) => {
      setSelected((prev) => prev?.filter((item) => item !== option) ?? [])
    },
    [setSelected],
  )
  const handleSelect = useCallback(
    (option: Option) => {
      setSelected((prev) => [...prev, option])
    },
    [setSelected],
  )

  return (
    <Command
      {...props}
      onKeyDown={handleKeyDown}
      className='h-auto overflow-visible bg-transparent'
    >
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1 capitalize'>
          {selected?.map((option) => {
            return (
              <Badge
                key={option.value}
                variant='secondary'
                className='rounded hover:bg-secondary'
              >
                {option.label}
                <Button
                  aria-label='Remove option'
                  size='sm'
                  className='ml-2 h-auto bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemove(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleRemove(option)}
                >
                  <X className='h-3 w-3' aria-hidden='true' />
                </Button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            tabIndex={-1}
            placeholder='Search for an option'
            className='flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground'
            value={query}
            onValueChange={setQuery}
            onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className='relative z-50 mt-2'>
        {isOpen && filteredOptions.length > 0 ? (
          <div className='absolute top-0 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full overflow-auto'>
              {filteredOptions.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    className='px-2 py-1.5 text-sm capitalize'
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      handleSelect(option)
                      setQuery('')
                    }}
                  >
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

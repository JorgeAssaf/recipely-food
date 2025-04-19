'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'

export function CopyButton({ value, ...props }: ButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <Button
      variant='outline'
      size='sm'
      className='absolute top-4 right-5 z-20 size-6 px-0'
      onClick={() => {
        if (typeof window === 'undefined') return
        setIsCopied(true)
        void window.navigator.clipboard.writeText(value?.toString() ?? '')
        setTimeout(() => setIsCopied(false), 2000)
      }}
      {...props}
    >
      {isCopied ? (
        <CheckIcon className='size-3' aria-hidden='true' />
      ) : (
        <CopyIcon className='size-3' aria-hidden='true' />
      )}
      <span className='sr-only'>
        {isCopied ? 'Copied' : 'Copy to clipboard'}
      </span>
    </Button>
  )
}

'use client'

import { forwardRef, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Input, type InputProps } from './ui/input'

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          className={cn('pr-10', className)}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon className='h-5 w-5' />
          ) : (
            <EyeOffIcon className='h-5 w-5' />
          )}
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

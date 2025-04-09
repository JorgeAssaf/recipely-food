import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn, type As } from '@/lib/utils'

export type HeadingSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
export type HeadingColor = 'white' | 'gray'
export type HeadingWeight = 'medium' | 'bold'

interface HeadingOwnProps {
  size?: HeadingSize
  color?: HeadingColor
  weight?: HeadingWeight
}

type HeadingProps = As<'h1', 'h2', 'h3', 'h4', 'h5', 'h6'> & HeadingOwnProps

export const Heading = forwardRef<HTMLHeadingElement, Readonly<HeadingProps>>(
  (
    {
      as: Tag = 'h1',
      size = '3',
      className,
      color = 'white',
      children,
      weight = 'bold',
      ...props
    },
    forwardedRef,
  ) => (
    <Slot
      ref={forwardedRef}
      className={cn(
        className,
        getSizesClassNames(size),
        getColorClassNames(color),
        getWeightClassNames(weight),
      )}
      {...props}
    >
      <Tag>{children}</Tag>
    </Slot>
  ),
)

const getSizesClassNames = (size: HeadingSize | undefined) => {
  switch (size) {
    case '1':
      return 'text-xs'
    case '2':
      return 'text-sm'
    case '3':
      return 'text-base'
    case '4':
      return 'text-lg'
    case '5':
      return 'text-xl tracking-[-0.16px]'
    case '6':
      return 'text-2xl tracking-[-0.288px]'
    case '7':
      return 'text-[28px] leading-[34px] tracking-[-0.416px]'
    case '8':
      return 'text-[35px] leading-[42px] tracking-[-0.64px]'
    case '9':
      return 'text-6xl leading-[73px] tracking-[-0.896px]'
    case '10':
      return [
        'text-[38px] leading-[46px]',
        'md:text-[70px] md:leading-[85px] tracking-[-1.024px;]',
      ]
    case undefined:
    default:
      return null
  }
}

const getColorClassNames = (color: HeadingColor | undefined) => {
  switch (color) {
    case 'gray':
      return 'text-slate-700'
    case 'white':
    case undefined:
      return 'text-white'
    default:
      return 'text-white'
  }
}

const getWeightClassNames = (weight: HeadingWeight | undefined) => {
  switch (weight) {
    case 'medium':
      return 'font-medium'
    case 'bold':
    case undefined:
      return 'font-bold'
    default:
      return null
  }
}

Heading.displayName = 'Heading'

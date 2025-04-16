import { forwardRef, Fragment } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { cn, toTitleCase } from '@/lib/utils'

type BreadcrumbsProps = React.ComponentPropsWithoutRef<'nav'> & {
  segments: {
    title: string
    href: string
  }[]
  separator?: React.ComponentType<{ className?: string }>
  truncationLength?: number
}

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ className, segments, separator, ...props }, ref) => {
    const SeparatorIcon = separator ?? ChevronLeft
    return (
      <nav
        ref={ref}
        aria-label='breadcrumbs'
        className={cn(
          'flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground',
          className,
        )}
        {...props}
      >
        {segments.map((segment, index) => {
          const isLastSegment = index === segments.length - 1

          return (
            <Fragment key={segment.href}>
              <Link
                aria-current={isLastSegment ? 'page' : undefined}
                href={segment.href}
                className={cn(
                  'truncate transition-colors hover:text-foreground',
                  isLastSegment ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {toTitleCase(segment.title)}
              </Link>
              {!isLastSegment && (
                <SeparatorIcon className='mx-2 h-4 w-4' aria-hidden='true' />
              )}
            </Fragment>
          )
        })}
      </nav>
    )
  },
)
Breadcrumbs.displayName = 'Breadcrumbs'

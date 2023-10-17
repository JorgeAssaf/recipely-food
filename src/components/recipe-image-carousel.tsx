'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from 'lucide-react'

import type { FileUpload } from '@/types/recipes'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

interface RecipeImageCarrouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: FileUpload[] | null
  options: EmblaOptionsType
}

export const RecipeImageCarrousel = ({
  images,
  className,
  options,
  ...props
}: RecipeImageCarrouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  if (!images) {
    return (
      <div
        aria-label='Product Placeholder'
        role='img'
        aria-roledescription='placeholder'
        className='flex aspect-square h-auto w-full flex-1 items-center justify-center bg-secondary'
      >
        <div className='flex flex-col items-center justify-center gap-4'>
          <ImageIcon
            className='h-9 w-9 text-muted-foreground'
            aria-hidden='true'
          />
          <p className='text-muted-foreground'>No images found</p>
        </div>
      </div>
    )
  }

  return (
    <div
      aria-label='Product image carousel'
      className={cn('flex  flex-col gap-2  ', className)}
      {...props}
    >
      <div ref={emblaRef} className='overflow-hidden'>
        <div
          className='ml-[calc(1rem_*_-1)] flex touch-pan-y'
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {images.map((image, index) => (
            <div
              className='relative aspect-square h-max min-w-0 flex-full '
              key={index}
            >
              <Image
                aria-label={`Slide ${index + 1} of ${images.length}`}
                role='group'
                key={index}
                aria-roledescription='slide'
                src={image.url}
                alt={image.name}
                fill
                sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                className='block h-full w-full rounded-lg object-cover'
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 ? (
          <div className='mt-5 flex w-full items-center justify-center gap-2 py-2'>
            <Button
              variant='outline'
              size='icon'
              className='mr-0.5 aspect-square h-7 w-7 rounded-lg sm:mr-2 sm:h-8 sm:w-8'
              disabled={prevBtnDisabled}
              onClick={scrollPrev}
            >
              <ChevronLeftIcon
                className='h-3 w-3 sm:h-4 sm:w-4'
                aria-hidden='true'
              />
              <span className='sr-only'>Previous slide</span>
            </Button>
            {images.map((image, i) => (
              <Button
                key={i}
                variant='outline'
                size='icon'
                className={cn(
                  'group relative aspect-square h-full w-full max-w-[100px] rounded-lg shadow-sm hover:bg-transparent focus-visible:ring-foreground',
                  {
                    'ring-2 ring-foreground': i === selectedIndex,
                  },
                )}
                onClick={() => scrollTo(i)}
              >
                <div
                  className={cn(
                    'absolute inset-0 z-10 rounded-lg bg-zinc-950/20 transition-colors group-hover:bg-zinc-950/40',
                    {
                      'bg-zinc-950/40': i === selectedIndex,
                    },
                  )}
                />
                <Image
                  src={image.url}
                  alt={image.name}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='block h-full w-full rounded-lg object-cover'
                  priority
                  fill
                />
                <span className='sr-only'>
                  Slide {i + 1} of {images.length}
                </span>
              </Button>
            ))}
            <Button
              variant='outline'
              size='icon'
              className='ml-0.5 aspect-square h-7 w-7 rounded-lg sm:ml-2 sm:h-8 sm:w-8'
              disabled={nextBtnDisabled}
              onClick={scrollNext}
            >
              <ChevronRightIcon
                className='h-3 w-3 sm:h-4 sm:w-4'
                aria-hidden='true'
              />
              <span className='sr-only'>Next slide</span>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

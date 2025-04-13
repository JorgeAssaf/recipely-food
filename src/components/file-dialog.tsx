'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Cropper, { type ReactCropperElement } from 'react-cropper'

import 'cropperjs/dist/cropper.css'

import { Crop, CropIcon, RefreshCcw, Trash2, UploadIcon } from 'lucide-react'
import {
  useDropzone,
  type FileRejection,
  type FileWithPath,
} from 'react-dropzone'
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form'
import { toast } from 'sonner'

import { type FileWithPreview } from '@/types/recipes'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading: boolean
  disabled: boolean
}

const FileDialog = <TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    'image/*': [],
  },
  maxSize,
  maxFiles,
  files,
  setFiles,
  isUploading,
  disabled,
  className,
  ...props
}: FileDialogProps<TFieldValues>) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })

        setFiles((prevFiles) => [...(prevFiles || []), fileWithPreview])
      })
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === 'file-too-large') {
            toast.error(`File is too large. Max size is ${maxSize} bytes`)
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },
    [maxSize, setFiles],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
  }, [files, name, setValue])

  useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [files])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          Upload images{' '}
          <UploadIcon className='ml-2 h-4 w-4' aria-hidden='true' />
          <span className='sr-only' aria-hidden='true'>
            Upload images
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[480px]'>
        <p className='absolute left-5 top-4 text-base font-medium text-muted-foreground'>
          Upload your images
        </p>

        <div
          {...getRootProps()}
          className={cn(
            'group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isDragActive && 'border-muted-foreground/50',
            disabled && 'pointer-events-none opacity-60',
            className,
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className='group grid w-full place-items-center gap-1 sm:px-10'>
              <UploadIcon
                className='h-9 w-9 animate-pulse text-muted-foreground'
                aria-hidden='true'
              />
            </div>
          ) : isDragActive ? (
            <div className='grid place-items-center gap-2 text-muted-foreground sm:px-5'>
              <UploadIcon
                className={cn('h-8 w-8', isDragActive && 'animate-bounce')}
                aria-hidden='true'
              />
              <p className='text-base font-medium'>Drop the file here</p>
            </div>
          ) : (
            <div className='grid place-items-center gap-1 sm:px-5'>
              <UploadIcon
                className='h-8 w-8 text-muted-foreground'
                aria-hidden='true'
              />
              <p className='mt-2 text-base font-medium text-muted-foreground'>
                Drag {`'n'`} drop file here, or click to select file
              </p>
              <p className='text-sm text-slate-500'>
                Please upload file with size less than 4mb
              </p>
            </div>
          )}
        </div>
        <p className='text-center text-sm font-medium text-muted-foreground'>
          You can upload up to {maxFiles} {maxFiles === 1 ? 'file' : 'files'}
        </p>

        {files?.length ? (
          <div className='grid gap-5'>
            {files?.map((file, i) => (
              <FileCard
                key={i}
                file={file}
                files={files}
                setFiles={setFiles}
                i={i}
              />
            ))}
          </div>
        ) : null}

        {files?.length ? (
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2.5 w-full'
            onClick={() => setFiles(null)}
          >
            <Trash2 className='mr-2 h-4 w-4' aria-hidden='true' />
            Remove All
            <span className='sr-only'>Remove all</span>
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
export default FileDialog

interface FileCardProps {
  i: number
  file: FileWithPreview
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

const FileCard = ({ i, file, files, setFiles }: FileCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [cropData, setCropData] = useState<string | null>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const onCrop = useCallback(() => {
    if (!files || !cropperRef.current) return

    const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas()
    setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL())

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error('Blob creation failed')
        return
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      })
      const newFiles = files.map((file, indexCroppedImage) =>
        indexCroppedImage === i ? croppedFileWithPathAndPreview : file,
      )

      return setFiles(newFiles)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, cropperRef.current])
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        onCrop()
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [onCrop])
  return (
    <div className='relative flex items-center justify-between gap-2.5'>
      <div className='flex items-center gap-2'>
        <Image
          src={cropData ? cropData : file.preview}
          alt={file.name}
          className='h-10 w-10 shrink-0 rounded-md'
          width={40}
          height={40}
          loading='lazy'
        />
        <div className='flex flex-col'>
          <p className='line-clamp-1 text-sm font-medium text-muted-foreground'>
            {file.name}
          </p>
          <p className='text-xs text-slate-500'>
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {file.type.startsWith('image') && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='h-7 w-7'
                onClick={() => onCrop()}
              >
                <CropIcon className='h-4 w-4 text-white' aria-hidden='true' />
                <span className='sr-only'>Crop</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crop Image</DialogTitle>
                <DialogDescription>
                  Crop your image to the desired size
                </DialogDescription>
              </DialogHeader>

              <div className='mt-2 grid place-items-center space-y-5'>
                <Cropper
                  ref={cropperRef}
                  className='h-[450px] w-[450px] object-cover'
                  zoomTo={0.5}
                  initialAspectRatio={1 / 1}
                  preview='.img-preview'
                  src={file.preview}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              </div>
              <div className='mt-2 flex items-center justify-center gap-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    onCrop()
                    setIsOpen(false)
                  }}
                >
                  <Crop className='mr-2 h-4 w-4' aria-hidden='true' />
                  Crop image
                  <span className='sr-only'>Crop image</span>
                </Button>
                <Button
                  type='button'
                  onClick={() => {
                    cropperRef.current?.cropper.reset()
                    setCropData(null)
                  }}
                >
                  <RefreshCcw className='mr-2 h-4 w-4' aria-hidden='true' />
                  Reset
                  <span className='sr-only'>Reset</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <Button
          type='button'
          variant='outline'
          size='icon'
          className='h-7 w-7'
          onClick={() =>
            setFiles(
              (prevFiles) => prevFiles?.filter((_, j) => j !== i) || null,
            )
          }
        >
          <Trash2 className='h-4 w-4 text-white' aria-hidden='true' />
          <span className='sr-only'>Remove</span>
        </Button>
      </div>
    </div>
  )
}

/** Originally from `shadcn/ui-docs`
 * @link https://github.com/shadcn/ui/blob/main/apps/www/components/callout.tsx
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Separator } from '../ui/separator'

interface CalloutProps extends React.PropsWithChildren {
  icon?: string
  title?: string
}

export function Callout({ title, children, icon, ...props }: CalloutProps) {
  return (
    <Alert {...props}>
      <div className='flex items-center'>
        {icon ? <span className='mr-4 text-lg'>{icon}</span> : null}
        {title ? <AlertTitle className='text-xl'>{title}</AlertTitle> : null}
      </div>
      <Separator className='my-2' />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

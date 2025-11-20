import { useEffect, useState } from 'react'

export const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  return mounted
}

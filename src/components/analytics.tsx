import Loglib from '@loglib/tracker/react'

export function Analytics() {
  return (
    <Loglib
      config={{
        id: 'recipely-food_vercel',
      }}
    />
  )
}

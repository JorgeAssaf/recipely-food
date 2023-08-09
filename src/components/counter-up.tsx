'use client'

import { FC } from 'react'
import Up from 'react-countup'

type CounterUpProps = {
  count: number
  duration?: number
}

export const CounterUp: FC<CounterUpProps> = ({ count, duration = 200 }) => {
  return <Up end={count} duration={duration} />
}

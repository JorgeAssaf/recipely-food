'use client'

import type { FC } from 'react'
import { CountUp } from 'use-count-up'

type CounterUpProps = {
  count: number
  duration?: number
}

export const CounterUp: FC<CounterUpProps> = ({ count, duration = 3 }) => {
  return <CountUp isCounting end={count} duration={duration} />
}

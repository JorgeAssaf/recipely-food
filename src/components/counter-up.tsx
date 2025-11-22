'use client'

import type { FC } from 'react'
import CountUp, { CountUpProps } from 'react-countup'

export const CounterUp: FC<CountUpProps> = ({ end, duration = 20 }) => {
  return (
    <CountUp
      end={end}
      start={0}
      duration={duration}
      onEnd={() => {
        console.log('CountUp ended')
      }}
    />
  )
}

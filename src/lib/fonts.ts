import Satoshi from 'next/font/local'

export const satoshi = Satoshi({
  src: '../fonts/Satoshi-Variable.ttf',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
  variable: '--font-sans',
})

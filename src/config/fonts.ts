import Satoshi from 'next/font/local'

export const fontSans = Satoshi({
  src: '../fonts/satoshi.ttf',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
  variable: '--font-sans',
})

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractFirstRoutePart = (route: string) => {
  const match = route.match(/^\/([^/]+)\/?/)
  return match != null ? match[1] : null
}

export const numberToCurrency = (value: number) => {
  const formattedValue = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(Math.abs(value))

  return value < 0 ? `(${formattedValue})` : formattedValue
}

import { clsx, type ClassValue } from 'clsx'
import type { Locale} from 'date-fns';
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
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

export const addOneDay = (date: Date | string) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

export const formatDate = (dateString: string): string => {
  const parsedDate = parseISO(dateString)
  return format(parsedDate, 'yyyy-MM-dd')
}

export const formatDateDisplay = (
  dateString: string,
  locale: Locale = es
): string => {
  const parsedDate = parseISO(dateString)
  return format(parsedDate, 'PPP', { locale })
}

export const formatSerialNumber = (serie: string, number: number) => {
  return `${serie}-${number.toString().padStart(8, '0')}`;
};
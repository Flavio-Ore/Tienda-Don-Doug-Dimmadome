import { format, parseISO } from 'date-fns'

export const formatDate = (dateString: string): string => {
  const parsedDate = parseISO(dateString)
  return format(parsedDate, 'yyyy-MM-dd')
}
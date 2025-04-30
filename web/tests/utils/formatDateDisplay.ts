import { format, type Locale, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';


export const formatDateDisplay = (
  dateString: string,
  locale: Locale = es
): string => {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, 'PPP', { locale });
};

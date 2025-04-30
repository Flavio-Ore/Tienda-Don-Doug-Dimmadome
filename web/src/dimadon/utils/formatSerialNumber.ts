export const formatSerialNumber = (serie: string, number: number) => {
  return `${serie}-${number.toString().padStart(8, '0')}`;
}
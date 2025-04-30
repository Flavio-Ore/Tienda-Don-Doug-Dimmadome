
export const numberToCurrency = (value: number) => {
  const formattedValue = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(Math.abs(value));

  return value < 0 ? `(${formattedValue})` : formattedValue;
};

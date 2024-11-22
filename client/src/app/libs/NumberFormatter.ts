interface Props {
  value: number;
}

export const numberFormatter = (value: number) => {
  const units = ['', 'k', 'M', 'B'];
  let unit: string;

  if (value < 1000) {
    unit = units[0]; // Menor que 1k
  } else if (value < 1000000 && value >= 1000) {
    unit = units[1]; // Miles
  } else if (value < 1000000000 && value >= 1000000) {
    unit = units[2]; // Millones
  } else {
    unit = units[3]; // Billones
  }

  // Calcular la parte entera y decimal
  let formattedValue: string;

  if (unit === units[0]) {
    // Menos de 1k, no hay unidad
    formattedValue = value.toString();
  } else if (unit === units[1]) {
    // Miles (divide por 1000)
    formattedValue = (value / 1000).toString();
  } else if (unit === units[2]) {
    // Millones (divide por 1,000,000)
    formattedValue = (value / 1000000).toString();
  } else {
    // Billones (divide por 1,000,000,000)
    formattedValue = (value / 1000000000).toString();
  }

  const [integerPart, decimalPart] = formattedValue.split('.');

  let finalValue: string;

  if (decimalPart) {
    finalValue = `${integerPart}.${decimalPart[0]}`; // Solo 1 decimal
  } else {
    finalValue = integerPart;
  }

  return `${finalValue}${unit}`;
};

export const numberFormatter = (value: number) => {
  const units = ['', 'k', 'M', 'B'];
  let unit: string;

  if (value < 1000) {
    unit = units[0];
  } else if (value < 1000000 && value >= 1000) {
    unit = units[1];
  } else if (value < 1000000000 && value >= 1000000) {
    unit = units[2];
  } else {
    unit = units[3];
  }

  let formattedValue: string;

  if (unit === units[0]) {
    formattedValue = value.toString();
  } else if (unit === units[1]) {
    formattedValue = (value / 1000).toString();
  } else if (unit === units[2]) {
    formattedValue = (value / 1000000).toString();
  } else {
    formattedValue = (value / 1000000000).toString();
  }

  const [integerPart, decimalPart] = formattedValue.split('.');

  let finalValue: string;

  if (decimalPart) {
    finalValue = `${integerPart}.${decimalPart[0]}`;
  } else {
    finalValue = integerPart;
  }

  return `${finalValue}${unit}`;
};

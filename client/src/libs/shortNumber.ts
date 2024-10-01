const numberHandler = (num: number, val: number, letter: string): string => {
  let result = '';
  let intPart = Math.floor(num / val);
  let numWithDecimals = num / val;
  let decimalPart = new String(numWithDecimals).split('.')[1];

  if (!decimalPart || decimalPart[0] == '0') {
    result = `${intPart}${letter}`;
  } else {
    result = `${intPart},${decimalPart[0]}${letter}`;
  }

  return result;
};

export const shortNumber = (num: number): string => {
  let shortNum;

  if (num >= 1000000000) {
    shortNum = numberHandler(num, 1000000000, 'B');
  } else if (num >= 1000000) {
    shortNum = numberHandler(num, 1000000, 'M');
  } else if (num >= 1000) {
    shortNum = numberHandler(num, 1000, 'k');
  } else {
    shortNum = `${num}`;
  }

  return shortNum;
};

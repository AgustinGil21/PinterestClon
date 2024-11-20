export const dateNow = new Date();

export const dateToMilliseconds = (date) => {
  const newDate = new Date(date).getTime();
  return newDate;
};

export const millisecondsToDate = (milliseconds) => {
  const newDate = new Date(milliseconds);
  return newDate;
};

export const compareDates = (date1, date2) => {
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);

  // Normaliza ambas fechas (YYYY-MM-DD)
  const dateStr1 = dateObj1.toISOString().split('T')[0];
  const dateStr2 = dateObj2.toISOString().split('T')[0];

  return dateStr1 === dateStr2;
};

export const normalizeDate = (date) => {
  const dateObj = new Date(date);
  const dateStr = dateObj.toISOString().split('T')[0];

  return dateStr;
};

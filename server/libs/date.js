export const dateNow = new Date();

export const dateToMilliseconds = (date) => {
  const newDate = new Date(date).getTime();
  return newDate;
};

export const millisecondsToDate = (milliseconds) => {
  const newDate = new Date(milliseconds);
  return newDate;
};

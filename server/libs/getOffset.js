const isNumeric = (value) => /^[+-]?\d+(\.\d+)?$/.test(value);

export const getOffset = ({ limit, page }) => {
  if (!isNumeric(page) || !isNumeric(limit)) {
    throw new Error("Both 'page' and 'limit' must be valid numbers.");
  }

  return (Number(page) - 1) * Number(limit);
};

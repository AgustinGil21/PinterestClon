export const filterFalsyValues = (obj) => {
  for (let key in obj) {
    if (!obj[key] && typeof obj[key] !== 'boolean') {
      delete obj[key];
    }
  }

  return obj;
};

export const filterArrFalsyValues = (arr) => {
  return arr.map((obj) => filterFalsyValues(obj));
};

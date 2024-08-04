export const filterFalsyValues = (obj) => {
  const filteredObject = {};

  for (let key in obj) {
    if (obj[key]) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
};

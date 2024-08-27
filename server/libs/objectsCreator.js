export const objectsCreator = (dataObject, objectSkeleton) => {
  let newObject = {};

  for (let key in objectSkeleton) {
    if (dataObject[key]) {
      newObject[key] = dataObject[key];
    } else {
      newObject[key] = objectSkeleton[key];
    }
  }

  return newObject;
};

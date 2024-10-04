/*
This function receives 3 objects, the first will have the user's previous data, the second the new values ​​and the third will be an object with empty values ​​but containing all the keys that need to be stored.
*/

/*
The purpose is to detect changes with respect to previous data. The third parameter is required to avoid null or undefined data.
*/

export const objectsCompare = (prevObject, currentObject, objectSkeleton) => {
  const newObject = {
    ...objectSkeleton,
  };

  for (let key in prevObject) {
    if (prevObject[key] && !currentObject[key]) {
      if (typeof currentObject[key] === 'string') {
        newObject[key] = currentObject[key];
      } else {
        newObject[key] = prevObject[key];
      }
    }

    if (prevObject[key] && currentObject[key]) {
      newObject[key] = currentObject[key];
    }
  }

  for (let key in currentObject) {
    if (currentObject[key] && !prevObject[key]) {
      newObject[key] = currentObject[key];
    }
  }

  return newObject;
};

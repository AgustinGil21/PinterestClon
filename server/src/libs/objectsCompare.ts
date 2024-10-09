/*
This function receives 3 objects, the first will have the user's previous data, the second the new values ​​and the third will be an object with empty values ​​but containing all the keys that need to be stored.
*/

/*
The purpose is to detect changes with respect to previous data. The third parameter is required to avoid null or undefined data.
*/

import { GenericObject } from '../interfaces/basic/basics-interface.d.js';

type PrevObject<T> = GenericObject<T>;
type CurrentObject<T> = GenericObject<T>;
type ObjectSkeleton<T> = GenericObject<T>;

export const objectsCompare = <T>(
  prevObject: PrevObject<T>,
  currentObject: CurrentObject<T>,
  objectSkeleton: ObjectSkeleton<T>
): ObjectSkeleton<T> => {
  const newObject: ObjectSkeleton<T> = {
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

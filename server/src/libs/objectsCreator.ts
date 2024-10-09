// La función se encarga de que el objeto no
// tenga valores undefined o null.

import { GenericObject } from '../interfaces/basic/basics-interface.js';

type DataObject<T> = GenericObject<T>;
type ObjectSkeleton<T> = GenericObject<T>;

export const objectsCreator = <T>(
  dataObject: DataObject<T>,
  objectSkeleton: ObjectSkeleton<T>
): ObjectSkeleton<T> => {
  const newObject: ObjectSkeleton<T> = {};

  for (const key in objectSkeleton) {
    if (dataObject.hasOwnProperty(key)) {
      // Verifica si la clave existe en dataObject
      newObject[key] = dataObject[key] as T; // Usa el valor de dataObject
    } else {
      newObject[key] = objectSkeleton[key]; // Usa el valor del objeto base
    }
  }

  return newObject; // Devuelve el nuevo objeto combinado
};

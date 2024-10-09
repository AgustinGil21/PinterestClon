// Recibe 2 objetos, el objeto con la data
// anterior y el que tiene los nuevos cambios,
// si no fue efectuado ninguno, entonces devuelve
// false, de lo contrario devuelve true.
/*
export const detectObjectChanges = (prevObject, newObject) => {
  // Crea un conjunto de todas las claves en ambos objetos.
  const allKeys = new Set([
    ...Object.keys(prevObject),
    ...Object.keys(newObject),
  ]);

  console.log({ prevObject });
  console.log({ newObject });

  for (let key of allKeys) {
    const prevValue = prevObject[key];
    const newValue = newObject[key];

    if (prevValue !== newValue) {
      // Detecta cambios si los valores son diferentes.
      // No considera como cambio si uno de los valores
      // es null o undefined, esto es así ya que no queremos
      // que detecte como cambio si un valor no se encuentra
      // en uno de los objectos comparados.
      if (
        prevValue !== null &&
        prevValue !== undefined &&
        newValue !== null &&
        newValue !== undefined
      ) {
        return true;
      }
    }

    if (!prevValue && newValue) return true;
  }

  return false;
};
*/
// Convierte una cadena de snake_case a camelCase
// Convierte una cadena de snake_case a camelCase
// export const detectObjectChanges = (prevObject, newObject) => {
//   // Crea un conjunto de todas las claves en ambos objetos.
//   const allKeys = new Set([
//     ...Object.keys(prevObject),
//     ...Object.keys(newObject),
//   ]);
//   console.log({ prevObject });
//   console.log({ newObject });
//   for (let key of allKeys) {
//     const prevValue = prevObject[key];
//     const newValue = newObject[key];
//     if (
//       prevValue !== newValue &&
//       typeof prevValue === 'object' &&
//       typeof newValue === 'object' &&
//       !Array.isArray(prevValue) &&
//       !Array.isArray(newValue)
//     ) {
//       // Detecta cambios si los valores son diferentes.
//       // No considera como cambio si uno de los valores
//       // es null o undefined.
//       if (
//         prevValue !== null &&
//         prevValue !== undefined &&
//         newValue !== null &&
//         newValue !== undefined
//       ) {
//         return true;
//       }
//     }
//     if (Array.isArray(prevValue) && Array.isArray(newValue)) {
//       // Si ambos son arrays, compara sus longitudes
//       if (prevValue.length !== newValue.length) return true;
//       // Compara los elementos del array
//       for (let i = 0; i < prevValue.length; i++) {
//         if (prevValue[i] !== newValue[i]) return true;
//       }
//     } else if (typeof prevValue === 'object' && typeof newValue === 'object') {
//       // Comparar objetos anidados
//       if (detectObjectChanges(prevValue, newValue)) return true;
//     }
//     // Si no existía el valor anterior y existe el nuevo, hay un cambio
//     if (!prevValue && newValue) return true;
//   }
//   return false;
// };
// Convierte una cadena de snake_case a camelCase
const snakeToCamel = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};
// Convierte un objeto de snake_case a camelCase
const objectToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map((item) => objectToCamelCase(item)); // Recursión para arrays
    }
    else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = snakeToCamel(key); // Convierte la clave a camelCase
            acc[camelCaseKey] = objectToCamelCase(obj[key]); // Recursión para objetos anidados
            return acc;
        }, {});
    }
    else {
        return obj; // Retorna el valor si no es un objeto o array
    }
};
// Compara si dos valores son diferentes
const areValuesDifferent = (val1, val2) => {
    if (val1 === val2)
        return false; // Misma referencia o valor primitivo
    if ((val1 === undefined || val1 === null) &&
        (typeof val2 === 'string' ||
            Array.isArray(val2) ||
            (typeof val2 === 'object' && val2 !== null))) {
        return true; // val1 es undefined o null y val2 es un string, array u objeto
    }
    if (typeof val1 !== typeof val2)
        return true; // Diferentes tipos de datos
    if (Array.isArray(val1) && Array.isArray(val2)) {
        // Comparar arrays
        if (val1.length !== val2.length)
            return true; // Diferentes longitudes
        for (let i = 0; i < val1.length; i++) {
            if (areValuesDifferent(val1[i], val2[i]))
                return true; // Comparar elementos
        }
        return false;
    }
    if (typeof val1 === 'object' && typeof val2 === 'object') {
        // Comparar objetos
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length)
            return true; // Diferente número de claves
        for (let key of keys1) {
            if (areValuesDifferent(val1[key], val2[key]))
                return true; // Comparar valores de las claves
        }
        return false;
    }
    return true; // Valores primitivos diferentes
};
// Detecta cambios entre dos objetos
export const detectObjectChanges = (prevObject, newObject) => {
    console.log({ prevObject });
    console.log({ newObject });
    // Convertir ambos objetos a camelCase
    const prevObjectCamelCase = objectToCamelCase(prevObject);
    const newObjectCamelCase = objectToCamelCase(newObject);
    // Crea un conjunto de todas las claves en ambos objetos.
    const allKeys = new Set([
        ...Object.keys(prevObjectCamelCase),
        ...Object.keys(newObjectCamelCase),
    ]);
    for (let key of allKeys) {
        const prevValue = prevObjectCamelCase[key];
        const newValue = newObjectCamelCase[key];
        if (areValuesDifferent(prevValue, newValue))
            return true; // Si hay diferencias, devuelve true
    }
    return false; // No hay cambios significativos
};

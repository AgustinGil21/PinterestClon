// Recibe 2 objetos, el objeto con la data
// anterior y el que tiene los nuevos cambios,
// si no fue efectuado ninguno, entonces devuelve
// false, de lo contrario devuelve true.

export const detectObjectChanges = (prevObject, newObject) => {
  // Crea un conjunto de todas las claves en ambos objetos.
  const allKeys = new Set([
    ...Object.keys(prevObject),
    ...Object.keys(newObject),
  ]);

  for (let key of allKeys) {
    const prevValue = prevObject[key];
    const newValue = newObject[key];

    // Detecta cambios si los valores son diferentes.
    // No considera como cambio si uno de los valores
    // es null o undefined, esto es así ya que no queremos
    // que detecte como cambio si un valor no se encuentra
    // en uno de los objectos comparados.
    if (prevValue !== newValue) {
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

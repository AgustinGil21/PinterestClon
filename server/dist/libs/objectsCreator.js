// La función se encarga de que el objeto no
// tenga valores undefined o null.
export const objectsCreator = (dataObject, objectSkeleton) => {
    const newObject = {};
    for (const key in objectSkeleton) {
        if (dataObject.hasOwnProperty(key)) {
            // Verifica si la clave existe en dataObject
            newObject[key] = dataObject[key]; // Usa el valor de dataObject
        }
        else {
            newObject[key] = objectSkeleton[key]; // Usa el valor del objeto base
        }
    }
    return newObject; // Devuelve el nuevo objeto combinado
};

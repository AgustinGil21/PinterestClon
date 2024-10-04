export const filterFalsyValues = (obj) => {
    const filteredObject = {};
    for (let key in obj) {
        if (obj[key] || typeof obj[key] === 'boolean') {
            filteredObject[key] = obj[key];
        }
    }
    return filteredObject;
};

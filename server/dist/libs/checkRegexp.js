export const checkRegexp = ({ regexp, value, emptyStr = false, optional = false, }) => {
    let result;
    // Puede que el usuario haya cargado un valor válido
    // o que lo resetee a un valor vacío.
    if (emptyStr) {
        result = regexp.test(value) || value === '';
    }
    else {
        result = regexp.test(value);
    }
    // Si es opcional puede que el valor venga o no,
    // lo valores que no están presentes vienen en la
    // request como undefined.
    if (optional && (value === null || value === undefined)) {
        result = true;
    }
    return result;
};

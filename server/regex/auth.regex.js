export const emailRegex =
  /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

/*

El correo debe comenzar con uno o más caracteres alfanuméricos.
Después de los caracteres iniciales, puede tener puntos, guiones bajos o guiones, pero no consecutivos ni al inicio.
Debe haber una @ después del nombre del usuario.
El dominio debe contener uno o más caracteres alfanuméricos o guiones.
El dominio debe terminar con un punto seguido de al menos dos caracteres alfabéticos, permitiendo TLDs de más de dos caracteres y múltiples niveles de dominio.

*/

export const usernameRegex =
  /^(?=.{8,24}$)(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/;

/*

Longitud: El nombre de usuario debe tener entre 8 y 24 caracteres.
Primer carácter: Debe ser alfanumérico (letra o dígito).
Último carácter: Debe ser alfanumérico (letra o dígito).
Caracteres permitidos: Puede contener letras, dígitos, puntos y guiones bajos.
Restricción de secuencia: No se permiten dos puntos o guiones bajos consecutivos.
Inicio y fin: No puede comenzar ni terminar con un punto o guion bajo.

*/

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,128}$/;

/*

Letra minúscula: Debe contener al menos una letra minúscula.
Letra mayúscula: Debe contener al menos una letra mayúscula.
Dígito: Debe contener al menos un dígito.
Carácter especial: Debe contener al menos uno de los siguientes caracteres especiales: #$@!%&*?.
Longitud: Debe tener entre 8 y 128 caracteres.
Caracteres permitidos: Solo puede contener letras, dígitos y los caracteres especiales especificados.

*/

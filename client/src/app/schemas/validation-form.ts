import { z } from 'zod';

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

export const registerSchema = z.object({
  email: z
    .string({
      required_error: 'Se requiere dirección de correo electrónico.',
      message: 'La dirección de correo electrónico debe ser una cadena.',
    })
    .email({
      message:
        'Por favor, introduce una dirección de correo electrónico válida.',
    })
    .min(12, {
      message:
        'La dirección de correo electrónico debe contener al menos 12 caracteres.',
    })
    .max(320, {
      message:
        'La dirección de correo electrónico puede contener hasta 320 caracteres.',
    })
    .regex(emailRegex, {
      message:
        'Por favor, introduce una dirección de correo electrónico válida.',
    })
    .trim(),
  password: z
    .string({
      required_error: 'Se requiere una contraseña.',
      message: 'La contraseña debe ser una cadena.',
    })
    .min(8, {
      message: 'La contraseña debe contener al menos 8 caracteres.',
    })
    .max(128, {
      message: 'La contraseña puede contener hasta 128 caracteres.',
    })
    .regex(passwordRegex, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un dígito y un carácter especial.',
    })
    .trim(),
  date: z
    .string()
    .transform((dateStr) => new Date(dateStr))
    .refine((date) => !isNaN(date.getTime()), {
      message: '¡Te faltó algo! No olvides agregar tu fecha de nacimiento.',
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Se requiere dirección de correo electrónico.',
      message: 'La dirección de correo electrónico debe ser una cadena.',
    })
    .email({
      message:
        'Por favor, introduce una dirección de correo electrónico válida.',
    })
    .min(12, {
      message:
        'La dirección de correo electrónico debe contener al menos 12 caracteres.',
    })
    .max(320, {
      message:
        'La dirección de correo electrónico puede contener hasta 320 caracteres.',
    })
    .regex(emailRegex, {
      message:
        'Por favor, introduce una dirección de correo electrónico válida.',
    })
    .trim(),
  password: z
    .string({
      required_error: 'Se requiere una contraseña.',
      message: 'La contraseña debe ser una cadena.',
    })
    .min(8, {
      message: 'La contraseña debe contener al menos 8 caracteres.',
    })
    .max(128, {
      message: 'La contraseña puede contener hasta 128 caracteres.',
    })
    .regex(passwordRegex, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un dígito y un carácter especial.',
    })
    .trim(),
});

export const UsernameSchema = z.object({
  username: z
    .string({
      required_error: 'Se requiere nombre de usuario.',
      message: 'El nombre de usuario debe ser una cadena.',
    })
    .min(8, {
      message: 'El nombre de usuario debe contener al menos 8 caracteres',
    })
    .max(24, {
      message: 'El nombre de usuario puede contener hasta 24 caracteres.',
    })
    .regex(usernameRegex, {
      message:
        'El nombre de usuario debe contener caracteres alfanuméricos y también puede incluir caracteres especiales como . (punto) o _ (guion bajo).',
    })
    .trim(),
});

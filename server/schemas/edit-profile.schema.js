import { z } from 'zod';
import { nameOrSurnameRegex, URLRegex } from '../regex/settings.regex.js';
import { usernameRegex } from '../regex/auth.regex.js';
import { dateRegex } from '../regex/globals.regex.js';
import { checkRegexp } from '../libs/checkRegexp.js';

// export const editProfileSchema = z.object({
//   username: z
//     .string({
//       message: 'Username must be a string.',
//     })
//     .min(8, {
//       message: 'Username must contain at least 8 characters long',
//     })
//     .max(24, {
//       message: 'Username can contain up to 24 characters long.',
//     })
//     .regex(usernameRegex, {
//       message:
//         'The username must contain alphanumeric characters and can also include special characters such as . (dot) or _ (underscore).',
//     })
//     .trim()
//     .optional(),
//   about: z
//     .string({
//       message: 'About must be a string.',
//     })
//     .max(500, {
//       message: 'Max length: 500',
//     })
//     .optional(),
//   website: z
//     .string({
//       message: 'Website must be a string.',
//     })
//     .regex(URLRegex || '', {
//       message: 'Invalid URL',
//     })
//     .trim()
//     .optional(),
//   name: z
//     .string({
//       message: 'Name must be a string',
//     })
//     .regex(nameOrSurnameRegex || '', {
//       message: 'Invalid name',
//     })
//     .max(30, {
//       message: 'Max length: 30',
//     })
//     .optional(),
//   surname: z
//     .string({
//       message: 'Surname must be a string',
//     })
//     .regex(nameOrSurnameRegex || '', {
//       message: 'Invalid surname',
//     })
//     .max(30, {
//       message: 'Max length: 30',
//     })
//     .trim()
//     .optional(),
//   birthdate: z
//     .string({
//       required_error: 'Birthdate is required.',
//       message: 'Password must be a string.',
//     })
//     .regex(dateRegex, {
//       message: 'Birthdate must be a valid date.',
//     })
//     .trim()
//     .optional(),
// });

export const editProfileSchema = z
  .object({
    username: z
      .string({
        message: 'Username must be a string.',
      })
      .min(8, {
        message: 'Username must contain at least 8 characters long',
      })
      .max(24, {
        message: 'Username can contain up to 24 characters long.',
      })
      .trim()
      .optional(),
    about: z
      .string({
        message: 'About must be a string.',
      })
      .max(500, {
        message: 'Max length: 500',
      })
      .optional(),
    website: z
      .string({
        message: 'Website must be a string.',
      })
      .trim()
      .optional(),
    name: z
      .string({
        message: 'Name must be a string',
      })
      .max(30, {
        message: 'Max length: 30',
      })
      .optional(),
    surname: z
      .string({
        message: 'Surname must be a string',
      })
      .max(30, {
        message: 'Max length: 30',
      })
      .trim()
      .optional(),
    birthdate: z
      .string({
        message: 'Password must be a string.',
      })
      .trim()
      .optional(),
  })
  .refine(
    ({ name }) =>
      checkRegexp({ regexp: nameOrSurnameRegex, value: name, emptyStr: true }),
    () => ({ message: 'Invalid name' })
  )
  .refine(
    ({ surname }) =>
      checkRegexp({
        regexp: nameOrSurnameRegex,
        value: surname,
        emptyStr: true,
      }),
    () => ({ message: 'Invalid surname' })
  )
  .refine(
    ({ website }) =>
      checkRegexp({ regexp: URLRegex, value: website, emptyStr: true }),
    () => ({ message: 'Invalid website' })
  )
  .refine(
    ({ username }) => checkRegexp({ regexp: usernameRegex, value: username }),
    () => ({ message: 'Invalid username' })
  )
  .refine(
    ({ birthdate }) =>
      checkRegexp({
        regexp: dateRegex,
        value: birthdate,
        emptyStr: true,
      }),
    () => ({ message: 'Invalid birthname' })
  );

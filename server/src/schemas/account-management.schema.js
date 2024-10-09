import { z } from 'zod';
import { emailRegexp, passwordRegexp } from '../regexp/auth.regexp.js';
import { dateRegexp } from '../regexp/globals.regexp.js';
import { checkRegexp } from '../libs/checkRegexp.js';

export const editPersonalInfoSchema = z.object({
  emailAddress: z
    .string({
      message: 'Email address must be a string.',
    })
    .trim()
    .min(12, {
      message: 'Email address must contain at least 12 characters long',
    })
    .max(320, {
      message: 'Email address can contain up to 320 characters long.',
    })
    .refine(
      (emailAddress) =>
        checkRegexp({
          value: emailAddress,
          regexp: emailRegexp,
          optional: true,
        }),
      {
        message: 'Please enter a valid email address.',
      }
    )
    .optional(),
  gender: z
    .string({
      required_error: 'Gender id is required.',
      message: 'Gender id must be a string.',
    })
    .uuid({
      message: 'Gender id must be a valid UUID.',
    })
    .trim()
    .optional(),
  lang: z
    .string({
      required_error: 'Language id is required.',
      message: 'Language id must be a string.',
    })
    .uuid({
      message: 'Language id must be a valid UUID.',
    })
    .trim()
    .optional(),
  country: z
    .string({
      required_error: 'Country id is required.',
      message: 'Country id must be a string.',
    })
    .uuid({
      message: 'Country id must be a valid UUID.',
    })
    .trim()
    .optional(),
  birthdate: z
    .string({
      message: 'Birthdate must be a string',
    })
    .trim()
    .refine(
      (birthdate) =>
        checkRegexp({
          value: birthdate,
          regexp: dateRegexp,
          optional: true,
        }),
      {
        message: 'Invalid date',
      }
    )
    .optional(),
});

export const changePasswordSchema = z.object({
  prevPassword: z
    .string({
      required_error: 'Password is required.',
      message: 'Password must be a string.',
    })
    .trim()
    .min(8, {
      message: 'Password must contain at least 8 characters long',
    })
    .max(128, {
      message: 'Password can contain up to 320 characters long.',
    })
    .refine(
      (prevPassword) =>
        checkRegexp({
          value: prevPassword,
          regexp: passwordRegexp,
        }),
      {
        message:
          'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      }
    ),
  newPassword: z
    .string({
      required_error: 'Password is required.',
      message: 'Password must be a string.',
    })
    .min(8, {
      message: 'Password must contain at least 8 characters long',
    })
    .max(128, {
      message: 'Password can contain up to 320 characters long.',
    })
    .refine(
      (newPassword) =>
        checkRegexp({
          value: newPassword,
          regexp: passwordRegexp,
        }),
      {
        message:
          'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      }
    ),
});

export const newPasswordSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required.',
      message: 'Password must be a string.',
    })
    .trim()
    .min(8, {
      message: 'Password must contain at least 8 characters long',
    })
    .max(128, {
      message: 'Password can contain up to 320 characters long.',
    })
    .refine(
      (password) =>
        checkRegexp({
          value: password,
          regexp: passwordRegexp,
        }),
      {
        message:
          'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      }
    ),
});

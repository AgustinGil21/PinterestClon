import { z } from 'zod';
import {
  usernameRegex,
  passwordRegex,
  emailRegex,
} from '../regex/auth.regex.js';

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
      message: 'Username must be a string.',
    })
    .min(8, {
      message: 'Username must contain at least 8 characters long',
    })
    .max(24, {
      message: 'Username can contain up to 24 characters long.',
    })
    .regex(usernameRegex, {
      message:
        'The username must contain alphanumeric characters and can also include special characters such as . (dot) or _ (underscore).',
    })
    .trim(),
  emailAddress: z
    .string({
      required_error: 'Email address is required.',
      message: 'Email address must be a string.',
    })
    .email({
      message: 'Please enter a valid email address',
    })
    .min(12, {
      message: 'Email address must contain at least 12 characters long',
    })
    .max(320, {
      message: 'Email address can contain up to 320 characters long.',
    })
    .regex(emailRegex, {
      message: 'Please enter a valid email address.',
    })
    .trim(),
  password: z
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
    .regex(passwordRegex, {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .trim(),
  birthdate: z
    .string({
      required_error: 'Birthdate is required.',
      message: 'Password must be a string.',
    })
    .date({
      message: 'Birthdate must be a valid date.',
    }),
  genderId: z
    .string({
      required_error: 'Gender id is required.',
      message: 'Gender id must be a string.',
    })
    .uuid({
      message: 'Gender id must be a valid UUID.',
    }),
  langId: z
    .string({
      required_error: 'Language id is required.',
      message: 'Language id must be a string.',
    })
    .uuid({
      message: 'Language id must be a valid UUID.',
    }),
  countryId: z
    .string({
      required_error: 'Country id is required.',
      message: 'Country id must be a string.',
    })
    .uuid({
      message: 'Country id must be a valid UUID.',
    }),
});

export const loginSchema = z.object({
  emailAddress: z
    .string({
      required_error: 'Email address is required.',
      message: 'Email address must be a string.',
    })
    .email({
      message: 'Please enter a valid email address',
    })
    .min(12, {
      message: 'Email address must contain at least 12 characters long',
    })
    .max(320, {
      message: 'Email address can contain up to 320 characters long.',
    })
    .regex(emailRegex, {
      message: 'Please enter a valid email address.',
    })
    .trim(),
  password: z
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
    .regex(passwordRegex, {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .trim(),
  authCode: z
    .string({
      message: 'Auth code must be a string.',
    })
    .length(6, {
      message: 'Auth code length must be 6.',
    })
    .optional(),
});

export const recoverAccountSchema = z.object({
  emailAddress: z
    .string({
      required_error: 'Email address is required.',
      message: 'Email address must be a string.',
    })
    .email({
      message: 'Please enter a valid email address',
    })
    .min(12, {
      message: 'Email address must contain at least 12 characters long',
    })
    .max(320, {
      message: 'Email address can contain up to 320 characters long.',
    })
    .regex(emailRegex, {
      message: 'Please enter a valid email address.',
    })
    .trim(),
});

export const resetPasswordSchema = z.object({
  emailAddress: z
    .string({
      required_error: 'Email address is required.',
      message: 'Email address must be a string.',
    })
    .email({
      message: 'Please enter a valid email address',
    })
    .min(12, {
      message: 'Email address must contain at least 12 characters long',
    })
    .max(320, {
      message: 'Email address can contain up to 320 characters long.',
    })
    .regex(emailRegex, {
      message: 'Please enter a valid email address.',
    })
    .trim(),
  password: z
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
    .regex(passwordRegex, {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .trim(),
});

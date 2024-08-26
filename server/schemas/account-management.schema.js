import { z } from 'zod';
import { emailRegex, passwordRegex } from '../regex/auth.regex.js';
import { dateRegex } from '../regex/globals.regex.js';

export const editPersonalInfoSchema = z.object({
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
    .trim()
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
    .regex(dateRegex, {
      message: 'Invalid date',
    })
    .trim()
    .optional(),
});

export const changePasswordSchema = z.object({
  prevPassword: z
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
    .regex(passwordRegex, {
      message:
        'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
    .trim(),
});

export const newPasswordSchema = z.object({
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

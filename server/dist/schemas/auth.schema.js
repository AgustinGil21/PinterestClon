import { z } from 'zod';
import { usernameRegexp, passwordRegexp, emailRegexp, } from '../regexp/auth.regexp.js';
import { dateRegexp } from '../regexp/globals.regexp.js';
export const checkEmailAddressSchema = z.object({
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
        .regex(emailRegexp, {
        message: 'Please enter a valid email address.',
    })
        .trim(),
});
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
        .regex(usernameRegexp, {
        message: 'The username must contain alphanumeric characters and can also include special characters such as . (dot) or _ (underscore).',
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
        message: "Email address can't be more than 320 characters",
    })
        .regex(emailRegexp, {
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
        message: "Password can't be more than 128 characters.",
    })
        .regex(passwordRegexp, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
        .trim(),
    birthdate: z
        .string({
        required_error: 'Birthdate is required.',
        message: 'Password must be a string.',
    })
        .regex(dateRegexp, {
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
    avatarBackground: z
        .string({
        required_error: 'Avatar background is required.',
        message: 'Avatar background must be a string.',
    })
        .length(7, {
        message: '',
    })
        .trim(),
    avatarLetterColor: z
        .string({
        required_error: 'Avatar letter color is required.',
        message: 'Avatar letter color must be a string.',
    })
        .length(7, {
        message: '',
    })
        .trim(),
    avatarLetter: z
        .string({
        required_error: 'Avatar letter is required.',
        message: 'Avatar letter must be a string.',
    })
        .length(1, {
        message: '',
    })
        .trim(),
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
        .regex(emailRegexp, {
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
        .regex(passwordRegexp, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
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
        .regex(emailRegexp, {
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
        .regex(emailRegexp, {
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
        .regex(passwordRegexp, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    })
        .trim(),
});

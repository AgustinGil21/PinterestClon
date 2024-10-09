import { z } from 'zod';
import { nameOrSurnameRegexp, URLRegexp } from '../regexp/settings.regexp.js';
import { usernameRegexp } from '../regexp/auth.regexp.js';
import { dateRegexp } from '../regexp/globals.regexp.js';
import { checkRegexp } from '../libs/checkRegexp.js';
export const editProfileSchema = z.object({
    username: z
        .string({
        message: 'Username must be a string.',
    })
        .trim()
        .min(8, {
        message: 'Username must contain at least 8 characters long',
    })
        .max(24, {
        message: "Username can't be more than 24 characters.",
    })
        .refine((username) => checkRegexp({
        regexp: usernameRegexp,
        value: username,
        optional: true,
    }), () => ({ message: 'Invalid username' }))
        .optional(),
    about_you: z
        .string({
        message: 'About must be a string.',
    })
        .max(500, {
        message: "About can't be more than 500 characters",
    })
        .optional(),
    website: z
        .string({
        message: 'Website must be a string.',
    })
        .trim()
        .refine((website) => checkRegexp({
        regexp: URLRegexp,
        value: website,
        emptyStr: true,
        optional: true,
    }), () => ({ message: 'Invalid website URL.' }))
        .optional(),
    name: z
        .string({
        message: 'Name must be a string',
    })
        .trim()
        .max(30, {
        message: "Name can't be more than 30 characters",
    })
        .refine((name) => checkRegexp({
        regexp: nameOrSurnameRegexp,
        value: name,
        emptyStr: true,
        optional: true,
    }), () => ({ message: 'Invalid name' }))
        .optional(),
    surname: z
        .string({
        message: 'Surname must be a string',
    })
        .trim()
        .max(30, {
        message: "Surname can't be more than 30 characters",
    })
        .refine((surname) => checkRegexp({
        regexp: nameOrSurnameRegexp,
        value: surname,
        optional: true,
        emptyStr: true,
    }), () => ({ message: 'Invalid surname' }))
        .optional(),
    birthdate: z
        .string({
        message: 'Password must be a string.',
    })
        .trim()
        .refine((birthdate) => checkRegexp({
        regexp: dateRegexp,
        value: birthdate,
        optional: true,
    }), () => ({ message: 'Invalid birthdate' }))
        .optional(),
});

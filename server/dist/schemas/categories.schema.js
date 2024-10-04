import { z } from 'zod';
import { validStringRegex } from '../regexp/globals.regexp.js';
export const searchByIDSchema = z.object({
    id: z
        .string({
        required_error: 'ID is required.',
        message: 'ID must be a string.',
    })
        .uuid({
        message: 'ID must be a valid UUID.',
    }),
});
export const searchByNameSchema = z.object({
    value: z
        .string({
        required_error: 'Value is required.',
        message: 'Value must be a string.',
    })
        .regex(validStringRegex, {
        message: 'Invalid value',
    }),
});

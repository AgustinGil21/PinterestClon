import { z } from 'zod';

export const genderSchema = z.object({
  id: z
    .string({
      required_error: 'ID is required.',
      message: 'ID must be a string.',
    })
    .uuid({
      message: 'ID must be a valid UUID.',
    }),
});

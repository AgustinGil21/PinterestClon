import { z } from 'zod';

export const getSinglePinSchema = z.object({
  id: z
    .string({
      required_error: 'ID is required.',
      message: 'ID must be a string.',
    })
    .uuid({
      message: 'ID must be a valid UUID.',
    }),
});

export const deletePinSchema = z.object({
  pinID: z
    .string({
      required_error: 'ID is required.',
      message: 'ID must be a string.',
    })
    .uuid({
      message: 'ID must be a valid UUID.',
    }),
});

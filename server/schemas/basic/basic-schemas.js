import { z } from 'zod';

export const PagingSchema = z.object({
  page: z.string(z.number()),
  limit: z.string(z.number()),
});

export const SearchSchema = z.object({
  PagingSchema,
  id: z.string().uuid().optional().nullable(),
  value: z.string().optional().nullable(),
});

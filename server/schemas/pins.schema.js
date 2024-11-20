import { z } from 'zod';
import { checkRegexp } from '../libs/checkRegexp.js';
import { usernameRegexp } from '../regexp/auth.regexp.js';
import { validStringRegex } from '../regexp/globals.regexp.js';
import { URLRegexp } from '../regexp/settings.regexp.js';

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

export const getCreatedPinsSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
      message: 'Username must be a string.',
    })
    .refine(
      (username) =>
        checkRegexp({
          regexp: usernameRegexp,
          value: username,
        }),
      {
        message: 'Invalid username',
      }
    ),
});

export const createPinSchema = z.object({
  title: z
    .string({
      message: 'Title must be a string.',
    })
    .max(255, {
      message: 'Title can contain up to 255 characters long.',
    })
    .optional(),
  adultContent: z
    .boolean({ message: 'Adult content must be a boolean.' })
    .optional(),
  altText: z
    .string({
      required_error: 'Alternative text is required.',
      message: 'Alternative text must be a string.',
    })
    .max(255, {
      message: 'Alternative text can contain up to 255 characters long.',
    })
    .refine(
      (altText) =>
        checkRegexp({
          value: altText,
          regexp: validStringRegex,
        }),
      {
        message: 'Invalid alternative text.',
      }
    )
    .optional(),
  description: z
    .string({
      message: 'Description must be a string.',
    })
    .max(500, {
      message: 'Description text can contain up to 500 characters long.',
    })
    .optional(),
  topics: z
    .array(
      z
        .string({
          message: 'Topic must be a string.',
        })
        .uuid({
          message: 'Topics must be a valid UUID',
        })
    )
    .optional(),
  url: z
    .string({
      message: 'URL must be a string.',
    })
    .refine(
      (url) =>
        checkRegexp({
          regexp: URLRegexp,
          value: url,
          optional: true,
        }),
      {
        message: 'Invalid URL.',
      }
    )
    .optional(),
});

export const editPinSchema = z.object({
  id: z
    .string({
      required_error: 'ID is required.',
      message: 'ID must be a string.',
    })
    .uuid({
      message: 'ID must be a valid UUID.',
    }),
  title: z
    .string({
      message: 'Title must be a string.',
    })
    .max(255, {
      message: 'Title can contain up to 255 characters long.',
    })
    .optional(),
  adultContent: z
    .boolean({ message: 'Adult content must be a boolean.' })
    .optional(),
  altText: z
    .string({
      required_error: 'Alternative text is required.',
      message: 'Alternative text must be a string.',
    })
    .max(255, {
      message: 'Alternative text can contain up to 255 characters long.',
    })
    .refine(
      (altText) =>
        checkRegexp({
          value: altText,
          regexp: validStringRegex,
        }),
      {
        message: 'Invalid alternative text.',
      }
    )
    .optional(),
  description: z
    .string({
      message: 'Description must be a string.',
    })
    .max(500, {
      message: 'Description text can contain up to 500 characters long.',
    })
    .optional(),
  url: z
    .string({
      message: 'URL must be a string.',
    })
    .refine(
      (url) =>
        checkRegexp({
          regexp: URLRegexp,
          value: url,
          optional: true,
          emptyStr: true,
        }),
      {
        message: 'Invalid URL.',
      }
    )
    .optional(),
  topics: z
    .array(
      z
        .string({
          message: 'Topic must be a string.',
        })
        .uuid({
          message: 'Topics must be a valid UUID',
        })
    )
    .optional(),
});

export const searchPinsSchema = z.object({
  page: z
    .number({
      required_error: 'Page is required.',
      message: 'Page must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
  limit: z
    .number({
      required_error: 'Limit is required.',
      message: 'Limit must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
  value: z
    .string({
      required_error: 'Value is required.',
      message: 'Value must be a string.',
    })
    .refine(
      (value) =>
        checkRegexp({
          value,
          regexp: validStringRegex,
        }),
      {
        message: 'Invalid value.',
      }
    ),
});

export const searchByCategorySchema = z.object({
  page: z
    .number({
      required_error: 'Page is required.',
      message: 'Page must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
  limit: z
    .number({
      required_error: 'Limit is required.',
      message: 'Limit must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
  category: z
    .string({
      required_error: 'Category is required.',
      message: 'Category must be a string.',
    })
    .uuid({
      message: 'Category must be a valid UUID.',
    }),
});

export const getHomePinsSchema = z.object({
  page: z
    .number({
      required_error: 'Page is required.',
      message: 'Page must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
  limit: z
    .number({
      required_error: 'Limit is required.',
      message: 'Limit must be a number.',
    })
    .min(1, {
      message: 'The minimum accepted value is 1.',
    }),
});

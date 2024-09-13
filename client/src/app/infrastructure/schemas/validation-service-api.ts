import { z } from 'zod';

//Genders Schema
export const genderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const ArrayGenderSchema = z.object({
  genders: z.array(genderSchema),
});

//Country Schema
export const CountrySchema = z.object({
  id: z.string(),
  prefix: z.string(),
  name: z.string(),
});

export const ArrayCountriesSchema = z.object({
  countries: z.array(CountrySchema),
});

//Languages Schema
export const LanguageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  abbreviation: z.string().length(2),
});

export const ArrayLanguagesSchema = z.object({
  languages: z.array(LanguageSchema),
});

//Data user Schema
export const UserDataSchema = z.object({
  account_type: z.enum(['Personal', 'Business']).optional(),
  avatar_background: z.string().optional(),
  avatar_letter: z.string().length(1).optional(),
  avatar_letter_color: z.string().optional(),
  email_address: z.string().email().optional(),
  username: z.string().min(1).optional(),
  name: z.string().min(1).max(50).optional(),
  surname: z.string().min(1).max(50).optional(),
  avatar: z.string().optional(),
});

export const UserSettingsEditProfileSchema = z.object({
  avatar_background: z.string().optional(),
  avatar_letter: z.string().length(1).optional(),
  avatar_letter_color: z.string().optional(),
  name: z.string().min(1).max(50).optional(),
  surname: z.string().min(1).max(50).optional(),
  about_you: z.string().min(1).max(500).optional(),
  website: z.string().url().optional(),
  username: z.string().min(1).optional(),
});

//Data Avatar Schema
export const FileSchema = z.object({
  name: z.string().nonempty('El nombre del archivo no puede estar vacío'),
  lastModified: z.number().positive(),
  size: z.number().max(5 * 1024 * 1024, 'El archivo no debe ser mayor de 5MB'),
  type: z
    .string()
    .regex(/^image\/(png|jpg|jpeg|gif)$/, 'Tipo de archivo no soportado'),
  webkitRelativePath: z.string().optional(),
});

//User Account Managnment schema

export const UserAccountManagmentSchema = z.object({
  email_address: z
    .string()
    .email({ message: 'Debe ser una dirección de correo electrónico válida' }),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Debe ser una fecha válida',
  }),
  gender: z.enum(['Male', 'Female', 'Nonbinary'], {
    errorMap: () => ({ message: "Debe ser 'Male', 'Female' o 'Nonbinary'" }),
  }),
  country: z.string().min(1, { message: 'El país es obligatorio' }),
  language: z.string().min(1, { message: 'El idioma es obligatorio' }),
  account_type: z.enum(['Personal', 'Business'], {
    errorMap: () => ({ message: "Debe ser 'Personal' o 'Business'" }),
  }),
});

export const UserVisibilityAccountSchema = z.object({
  account_type: z.enum(['Personal', 'Business']),
  private_account: z.boolean(),
});

//Category pins schema

export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  id: z.string().uuid('ID inválido'),
  poster: z.string(),
});

export const categoriesSchema = z.object({
  categories: z.array(categorySchema),
});

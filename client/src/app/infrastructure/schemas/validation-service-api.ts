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
  avatar_background: z.string(),
  avatar_letter: z.string().length(1),
  avatar_letter_color: z.string(),
  birthdate: z.string(),
  country: z.string(),
  created_at: z.string(),
  email_address: z.string().email(),
  gender: z.enum(['Male', 'Female', 'Nonbinary']).optional(),
  id: z.string(),
  lang: z.string(),
  username: z.string().min(1),
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

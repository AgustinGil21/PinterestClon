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

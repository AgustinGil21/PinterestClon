import {
  genderSchema,
  CountrySchema,
  LanguageSchema,
  UserDataSchema,
  FileSchema,
} from '../schemas/validation-service-api';
import { z } from 'zod';

export type Gender = z.infer<typeof genderSchema>;

export type Countries = z.infer<typeof CountrySchema>;

export type Languages = z.infer<typeof LanguageSchema>;

export type UserData = z.infer<typeof UserDataSchema>;

export type AvatarData = z.infer<typeof FileSchema>;

export type UserRegister = {
  emailAddress: string;
  password: string;
  username: string;
  birthdate: string;
  genderId: string;
  countryId: string;
  langId: string;
  avatarBackground: string;
  avatarLetterColor: string;
  avatarLetter: string;
};

export type UserLogin = {
  emailAddress: string;
  password: string;
};

export type UserEmail = {
  emailAddress: string;
};

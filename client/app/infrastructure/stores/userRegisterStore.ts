import { StateCreator } from 'zustand';
import { getGendersCase } from '../../application/use-cases/register/getGenders';
import { getCountriesCase } from '../../application/use-cases/register/getCountries';
import { getLanguagesCase } from '../../application/use-cases/register/getLanguages';
import { registerUserCase } from '../../application/use-cases/register/registerUser';
import { loginUserCase } from '../../application/use-cases/login/loginUser';
import { updateUserEmailCase } from '../../application/use-cases/register/updateUserEmail';
import { logoutUserCase } from '../../application/use-cases/user-edit/logoutUser';

import {
  Country,
  Gender,
  Language,
  UserEmail,
  UserLogin,
} from '../../domain/types';

export interface UserRegisterStoreInterface {
  genders: Gender[];
  countries: Country[];
  languages: Language[];
  email: string;
  password: string;
  birthdate: string;
  country: string;
  lang: string;
  gender: string;
  username: string;
  avatarLetter: string;
  avatarBackgroundColor: string;
  avatarTextColor: string;
  account_type: string;

  getDataGender: () => Promise<void>;
  getDataCountries: () => Promise<void>;
  getDataLanguages: () => Promise<void>;
  updateStateRegisterUser: (
    key: keyof UserRegisterStoreInterface,
    value: string
  ) => void;

  postDataEmailUser: (data: UserEmail) => Promise<void>;
  postDataRegisterUser: (data: FormData) => Promise<void>;
  postDataLoginUser: (data: UserLogin) => Promise<void>;
  postDataLogOut: () => Promise<void>;
}

export const createUserRegisterStore: StateCreator<
  UserRegisterStoreInterface
> = (set) => ({
  email: '',
  password: '',
  birthdate: '',
  country: '',
  lang: '',
  gender: '',
  username: '',
  avatarLetter: '',
  avatarBackgroundColor: '',
  avatarTextColor: '',
  account_type: '',
  genders: [],
  countries: [],
  languages: [],

  getDataGender: async () => {
    const response = await getGendersCase();
    set({ genders: response });
  },
  getDataCountries: async () => {
    const response = await getCountriesCase();
    set({ countries: response });
  },
  getDataLanguages: async () => {
    const response = await getLanguagesCase();
    set({ languages: response });
  },
  updateStateRegisterUser: (key: string, value: string) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
  postDataEmailUser: async (data: UserEmail) => {
    await updateUserEmailCase(data);
  },
  postDataRegisterUser: async (data: FormData) => {
    await registerUserCase(data);
  },

  postDataLoginUser: async (data: UserLogin) => {
    await loginUserCase(data);
  },

  postDataLogOut: async () => {
    await logoutUserCase();
  },
});

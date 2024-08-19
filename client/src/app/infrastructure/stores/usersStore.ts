// src/store/userStore.ts
import { StateCreator } from 'zustand';
import { getGenders } from '@/app/application/use-cases/register/getGenders';
import { getCountries } from '@/app/application/use-cases/register/getCountries';
import { getLanguages } from '@/app/application/use-cases/register/getLanguages';
import { registerUser } from '@/app/application/use-cases/register/registerUser';
import { loginUser } from '@/app/application/use-cases/login/loginUser';
import { getUserLogged } from '@/app/application/use-cases/user/getUserLogged';
import { updateUserAvatar } from '@/app/application/use-cases/register/updateUserAvatar';
import { updateUserEmail } from '@/app/application/use-cases/register/updateUserEmail';
import { logoutUser } from '@/app/application/use-cases/user/logoutUser';

import {
  AvatarData,
  Country,
  Gender,
  Language,
  UserEmail,
  UserLogin,
  UserRegister,
  UserData,
} from '../../domain/types';

export interface UserStoreInterface {
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
  getDataGender: () => Promise<void>;
  getDataCountries: () => Promise<void>;
  getDataLanguages: () => Promise<void>;
  updateStateRegisterUser: (
    key: keyof UserStoreInterface,
    value: string
  ) => void;

  postDataEmailUser: (data: UserEmail) => Promise<void>;
  postDataRegisterUser: (data: UserRegister) => Promise<void>;
  postDataLoginUser: (data: UserLogin) => Promise<void>;
  getDataUserLogged: () => Promise<void>;
  postDataAvatarUser: (data: AvatarData) => Promise<void>;
  isAuth: boolean;
  user: UserData | null;
  postDataLogOut: () => Promise<void>;
}

export const createUserStore: StateCreator<UserStoreInterface> = (set) => ({
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
  genders: [],
  countries: [],
  languages: [],
  user: {
    account_type: 'Personal',
    avatar_background: '',
    avatar_letter: '',
    avatar_letter_color: '',
    birthdate: '',
    country: '',
    created_at: '',
    email_address: '',
    gender: 'Nonbinary',
    id: '',
    lang: '',
    username: '',
  },
  isAuth: false,
  getDataGender: async () => {
    const response = await getGenders();
    set({ genders: response });
  },
  getDataCountries: async () => {
    const response = await getCountries();
    set({ countries: response });
  },
  getDataLanguages: async () => {
    const response = await getLanguages();
    set({ languages: response });
  },
  updateStateRegisterUser: (key: string, value: string) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
  postDataEmailUser: async (data: UserEmail) => {
    await updateUserEmail(data);
  },
  postDataRegisterUser: async (data: UserRegister) => {
    await registerUser(data);
  },
  postDataAvatarUser: async (data: AvatarData) => {
    await updateUserAvatar(data);
  },
  postDataLoginUser: async (data: UserLogin) => {
    await loginUser(data);
  },
  getDataUserLogged: async () => {
    const response = await getUserLogged();
    if (response) {
      set({
        isAuth: true,
        user: response,
      });
    } else {
      set({
        isAuth: false,
        user: null,
      });
    }
  },
  postDataLogOut: async () => {
    await logoutUser();
  },
});

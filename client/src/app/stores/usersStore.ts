import { StateCreator } from 'zustand';
import {
  serviceGetCountry,
  serviceGetDataUserLogged,
  serviceGetGender,
  serviceGetLanguages,
  servicePostAvatarUser,
  servicePostEmailUser,
  servicePostLoginUser,
} from '../services/service-register';
import { servicePostRegisterUser } from '../services/service-register';
import { Countries, Gender, Languages, UserEmail, UserLogin } from '../types';
import { UserRegister } from '../types';
import { string } from 'zod';

export interface UserStoreInterface {
  genders: Gender[];
  countries: Countries[];
  languages: Languages[];
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
  postDataAvatarUser: (data: any) => Promise<void>;
  user: any;
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
  user: [],
  getDataGender: async () => {
    const response = await serviceGetGender();
    set({
      genders: response,
    });
  },
  getDataCountries: async () => {
    const response = await serviceGetCountry();
    set({
      countries: response,
    });
  },

  getDataLanguages: async () => {
    const response = await serviceGetLanguages();
    set({
      languages: response,
    });
  },

  updateStateRegisterUser: (key: string, value: string) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
  postDataEmailUser: async (data: UserEmail) => {
    await servicePostEmailUser(data);
  },
  postDataRegisterUser: async (data: UserRegister) => {
    await servicePostRegisterUser(data);
  },
  postDataAvatarUser: async (data: any) => {
    await servicePostAvatarUser(data);
  },
  postDataLoginUser: async (data: UserLogin) => {
    await servicePostLoginUser(data);
  },
  getDataUserLogged: async () => {
    const response = await serviceGetDataUserLogged();
    set({
      user: response,
    });
    console.log(response);
  },
});

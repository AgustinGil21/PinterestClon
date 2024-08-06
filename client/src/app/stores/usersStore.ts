import { StateCreator } from 'zustand';
import {
  serviceGetCountry,
  serviceGetGender,
  serviceGetLanguages,
  servicePostLoginUser,
} from '../services/service-register';
import { servicePostRegisterUser } from '../services/service-register';
import { Countries, Gender, Languages, UserLogin } from '../types';
import { UserRegister } from '../types';

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
  postDataRegisterUser: (data: UserRegister) => Promise<void>;
  postDataLoginUser: (data: UserLogin) => Promise<void>;
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
  postDataRegisterUser: async (data: UserRegister) => {
    await servicePostRegisterUser(data);
  },
  postDataLoginUser: async (data: UserLogin) => {
    await servicePostLoginUser(data);
  },
});

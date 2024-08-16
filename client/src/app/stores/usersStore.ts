import { StateCreator } from 'zustand';
import {
  serviceGetCountry,
  serviceGetDataUserLogged,
  serviceGetGender,
  serviceGetLanguages,
  servicePostAvatarUser,
  servicePostEmailUser,
  servicePostLoginUser,
  servicePostLogOut,
} from '../services/service-register';
import { servicePostRegisterUser } from '../services/service-register';
import {
  AvatarData,
  Countries,
  Gender,
  Languages,
  UserEmail,
  UserLogin,
} from '../types';
import { UserRegister, UserData } from '../types';

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
  isAuth: boolean;
  user: UserData;
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
  postDataAvatarUser: async (data: AvatarData) => {
    await servicePostAvatarUser(data);
  },
  postDataLoginUser: async (data: UserLogin) => {
    await servicePostLoginUser(data);
  },
  getDataUserLogged: async () => {
    const response = await serviceGetDataUserLogged();
    console.log(response);
    if (!response?.id) return;
    set({
      isAuth: true,
      user: response,
    });
  },

  postDataLogOut: async () => {
    await servicePostLogOut();
  },
});

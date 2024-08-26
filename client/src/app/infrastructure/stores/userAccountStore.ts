import { getUserPrivateDataAccountCase } from '@/app/application/use-cases/user/getUserPrivateDataAccount';
import {
  UserDataAccountEdit,
  UserPublicData,
  UserPublicDataExtraInfo,
} from '@/app/domain/types';
import { StateCreator } from 'zustand';
import { getUserLoggedCase } from '@/app/application/use-cases/user/getUserLogged';
import { putUserPublicDataCase } from '@/app/application/use-cases/user/putUserPublicData';
import { deleteUserAccountCase } from '@/app/application/use-cases/user/deleteUserAccount';

export interface UserAccountInterface {
  getDataUserAccountEdit: () => Promise<void>;
  userDatEditAccount: UserDataAccountEdit | null;
  getDataUserLogged: () => Promise<void>;
  isAuth: boolean;
  userPublicData: UserPublicData | null;
  updateValues: (value: string, key: keyof UserDataAccountEdit) => void;
  updateValuesExtraInfoUser: (value: string, key: keyof UserPublicData) => void;
  putPublicUserData: (data: UserPublicDataExtraInfo) => Promise<void>;
  deleteUserAccount: () => void;
}

export const createUserAccountStore: StateCreator<UserAccountInterface> = (
  set,
  get
) => ({
  isAuth: false,

  userPublicData: {
    account_type: 'Personal',
    avatar_background: '',
    avatar_letter: '',
    avatar_letter_color: '',
    email_address: '',
    username: '',
    avatar: '',
    name: '',
    surname: '',
    about: '',
    website: '',
  },

  userDatEditAccount: {
    email_address: '',
    birthdate: '',
    country: '',
    account_type: 'Personal',
    language: '',
    gender: 'Nonbinary',
  },

  getDataUserLogged: async () => {
    const response = await getUserLoggedCase();
    console.log(response);

    if (response) {
      set({
        isAuth: true,
        userPublicData: response,
      });
    } else {
      set({
        isAuth: false,
        userPublicData: null,
      });
    }
  },
  getDataUserAccountEdit: async () => {
    const response = await getUserPrivateDataAccountCase();
    console.log(response);

    set({
      userDatEditAccount: response,
    });
  },
  updateValues: (value: string, key: keyof UserDataAccountEdit) => {
    set((state) => ({
      userDatEditAccount: {
        ...state.userDatEditAccount!,
        [key]: value,
      },
    }));
    // console.log(get().userDatEditAccount);
  },
  updateValuesExtraInfoUser: (value: string, key: keyof UserPublicData) => {
    set((state) => ({
      userPublicData: {
        ...state.userPublicData!,
        [key]: value,
      },
    }));
    // console.log(get().userPublicData);
  },

  putPublicUserData: async (data: UserPublicDataExtraInfo) => {
    await putUserPublicDataCase(data);
  },

  deleteUserAccount: async () => {
    await deleteUserAccountCase();
    window.location.reload();
  },
});

import { getUserAccountManagementCase } from '@/app/application/use-cases/user/getUserAccountManagement';
import {
  UserDataAccountEdit,
  UserPublicData,
  UserSettingsEditProfile,
  UserPutAccountManagement,
  UserProfileVisibility,
  UserPatchPasswordAccountManagement,
  UserPatchAvatar,
} from '@/app/domain/types';
import { StateCreator } from 'zustand';
import { getUserLoggedCase } from '@/app/application/use-cases/user/getUserLogged';
import { putUserSettingsEditProfileCase } from '@/app/application/use-cases/user/putUserPublicData';
import { deleteUserAccountCase } from '@/app/application/use-cases/user/deleteUserAccount';
import { getUserSettingsEditProfileCase } from '@/app/application/use-cases/user/getUserSettingsEditProfile';
import { putUserAccountManagementCase } from '@/app/application/use-cases/user/putUserAccountManagement.';
import { getProfileVisibilityCase } from '@/app/application/use-cases/user/getProfileVisibility';
import { patchProfileVisibilityPrivateCase } from '@/app/application/use-cases/user/patchProfileVisibilityPrivate';
import { patchProfileVisibilityTypeCase } from '@/app/application/use-cases/user/patchProfileVisibilityType';
import { patchAccountManagementCase } from '@/app/application/use-cases/user/patchAccountManagementPassword';
import { patchAvatarCase } from '@/app/application/use-cases/user/patchAvatar';
import { deleteAvatarCase } from '@/app/application/use-cases/user/deleteAvatar';

export interface UserAccountInterface {
  getUserAccountManagement: () => Promise<void>;
  userAccountManagment: UserDataAccountEdit | null;
  getDataUserLogged: () => Promise<void>;
  isAuth: boolean;
  userPublicData: UserPublicData | null;
  updateValuesUserAccountManagment: (
    value: string,
    key: keyof UserDataAccountEdit
  ) => void;
  updateValuesUserSettingsEditProfile: (
    value: string,
    key: keyof UserSettingsEditProfile
  ) => void;
  putUserSettingsEditProfile: (data: UserSettingsEditProfile) => Promise<void>;
  deleteUserAccount: () => void;
  getUserSettingsEditProfile: () => Promise<void>;
  userSettingsEditProfile: UserSettingsEditProfile | null;
  putUserAccountManagement: (data: UserPutAccountManagement) => Promise<void>;
  userProfileVisibility: UserProfileVisibility | null;
  getProfileVisibility: () => Promise<void>;
  patchProfileTypeVisibility: (data: UserProfileVisibility) => Promise<void>;
  patchProfilePrivateVisibility: (data: UserProfileVisibility) => Promise<void>;
  updateCheckedPrivacyOrPublic: (value: boolean) => void;
  patchPasswordAccountManagement: (
    data: UserPatchPasswordAccountManagement
  ) => Promise<void>;
  patchAvatar: (data: UserPatchAvatar) => Promise<void>;
  deleteAvatar: () => void;
}

export const createUserAccountStore: StateCreator<UserAccountInterface> = (
  set,
  get
) => ({
  isAuth: false,

  userPublicData: {
    avatar_background: '',
    avatar_letter: '',
    avatar_letter_color: '',
    email_address: '',
    username: '',
    name: '',
    surname: '',
    avatar: null,
  },

  userSettingsEditProfile: {
    avatar_background: '',
    avatar_letter_color: '',
    avatar_letter: '',
    name: '',
    surname: '',
    website: '',
    about: '',
    username: '',
  },

  userAccountManagment: {
    email_address: '',
    birthdate: '',
    country: '',
    account_type: 'Personal',
    language: '',
    gender: 'Nonbinary',
  },

  userProfileVisibility: {
    account_type: '',
    private_account: false,
  },

  getDataUserLogged: async () => {
    const response = await getUserLoggedCase();

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
  getUserAccountManagement: async () => {
    const response = await getUserAccountManagementCase();

    set({
      userAccountManagment: response,
    });
  },
  putUserAccountManagement: async (data: UserPutAccountManagement) => {
    await putUserAccountManagementCase(data);
  },

  updateValuesUserAccountManagment: (
    value: string,
    key: keyof UserDataAccountEdit
  ) => {
    set((state) => ({
      userAccountManagment: {
        ...state.userAccountManagment!,
        [key]: value,
      },
    }));
  },
  updateValuesUserSettingsEditProfile: (
    value: string,
    key: keyof UserSettingsEditProfile
  ) => {
    set((state) => ({
      userSettingsEditProfile: {
        ...state.userSettingsEditProfile!,
        [key]: value,
      },
    }));
    console.log(get().userSettingsEditProfile);
  },

  putUserSettingsEditProfile: async (data: UserSettingsEditProfile) => {
    console.log(data);
    await putUserSettingsEditProfileCase(data);
  },

  getUserSettingsEditProfile: async () => {
    const response = await getUserSettingsEditProfileCase();
    console.log(response);
    if (response) {
      set({
        userSettingsEditProfile: response,
      });
    }
  },

  getProfileVisibility: async () => {
    const response = await getProfileVisibilityCase();
    if (response) {
      set({
        userProfileVisibility: response,
      });
    }
  },

  patchAvatar: async (data: UserPatchAvatar) => {
    await patchAvatarCase(data);
  },

  patchProfileTypeVisibility: async (data: UserProfileVisibility) => {
    console.log(data);
    await patchProfileVisibilityTypeCase(data);
  },

  patchProfilePrivateVisibility: async (data: UserProfileVisibility) => {
    console.log(data);
    await patchProfileVisibilityPrivateCase(data);
  },

  patchPasswordAccountManagement: async (
    data: UserPatchPasswordAccountManagement
  ) => {
    await patchAccountManagementCase(data);
  },

  updateCheckedPrivacyOrPublic: (value: boolean) => {
    set((state) => ({
      userProfileVisibility: {
        ...state.userProfileVisibility,
        private_account: value,
      },
    }));
    console.log(get().userProfileVisibility);
  },

  deleteAvatar: async () => {
    await deleteAvatarCase();
  },

  deleteUserAccount: async () => {
    await deleteUserAccountCase();
  },
});

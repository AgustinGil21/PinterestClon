import {
  serviceGetCountry,
  serviceGetDataUserLogged,
  serviceGetGender,
  serviceGetLanguages,
  servicePostEmailUser,
  servicePostLoginUser,
  servicePostLogOut,
  servicePostRegisterUser,
} from '../services/service-register';
import {
  Country,
  Gender,
  Language,
  UserEmail,
  UserLogin,
  UserPublicData,
  UserDataAccountEdit,
  UserPutAccountManagement,
  UserSettingsEditProfile,
  UserProfileVisibility,
  UserPatchPasswordAccountManagement,
  UserPatchAvatar,
} from '../../domain/types';
import {
  serviceDeleteAccountUser,
  serviceDeleteAvatar,
  ServiceGetProfileVisibility,
  serviceGetUserAccountManagment,
  serviceGetUserSettingsEditProfile,
  servicePatchAccountManagementPassword,
  servicePatchAvatar,
  servicePatchProfileVisibilityPrivateAccount,
  servicePatchProfileVisibilityTypeAccount,
  servicePutAccountManagementPersonalInfo,
  servicePutUserSettingsEditProfile,
} from '../services/service-user-edit';
import { getUserSettingsEditProfileCase } from '@/app/application/use-cases/user-edit/getUserSettingsEditProfile';

export const fetchGendersAdapter = async (): Promise<Gender[]> => {
  return await serviceGetGender();
};

export const fetchCountriesAdapter = async (): Promise<Country[]> => {
  return await serviceGetCountry();
};

export const fetchLanguagesAdapter = async (): Promise<Language[]> => {
  return await serviceGetLanguages();
};

export const postEmailUserAdapter = async (data: UserEmail): Promise<void> => {
  await servicePostEmailUser(data);
};

export const postLoginUserAdapter = async (data: UserLogin): Promise<void> => {
  await servicePostLoginUser(data);
};

export const postRegisterUserAdapter = async (
  data: FormData
): Promise<void> => {
  await servicePostRegisterUser(data);
};

export const postLogOutUserAdapter = async (): Promise<void> => {
  await servicePostLogOut();
};

export const fetchUserLoggedAdapter =
  async (): Promise<UserPublicData | null> => {
    try {
      const response = await serviceGetDataUserLogged();

      if (response) {
        return {
          avatar_background: response.avatar_background,
          avatar_letter: response.avatar_letter,
          avatar_letter_color: response.avatar_letter_color,
          email_address: response.email_address,
          username: response.username,
          name: response.name,
          surname: response.surname,
          avatar: response.avatar ?? null,
          lang: response.lang,
        };
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchUserAccountManagementAdapter =
  async (): Promise<UserDataAccountEdit | null> => {
    try {
      const response = await serviceGetUserAccountManagment();

      if (response) {
        return {
          email_address: response.email_address,
          birthdate: new Date(response.birthdate).toISOString().split('T')[0],
          country: response.country,
          account_type: response.account_type,
          language: response.language,
          gender: response.gender,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const fetchUserSettingsEditProfileAdapter =
  async (): Promise<UserSettingsEditProfile | null> => {
    try {
      const response = await serviceGetUserSettingsEditProfile();
      console.log(response);
      if (response) {
        return {
          avatar_background: response.avatar_background,
          avatar_letter: response.avatar_letter,
          avatar_letter_color: response.avatar_letter_color,
          name: response.name,
          surname: response.surname,
          username: response.username,
          about_you: response.about_you,
          website: response.website,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const putUserSettingsEditProfileAdapter = async (
  data: UserSettingsEditProfile
) => {
  const response = await getUserSettingsEditProfileCase();
  console.log(response);

  if (!response) {
    return null;
  }

  const newData: Partial<UserSettingsEditProfile> = {};

  if (data.name && data.name !== response.name) {
    newData.name = data.name;
  }

  if (data.username && data.username !== response.username) {
    newData.username = data.username;
  }

  if (data.surname && data.surname !== response.surname) {
    newData.surname = data.surname;
  }

  if (data.about_you && data.about_you !== response.about_you) {
    newData.about_you = data.about_you;
  }

  if (data.website && data.website !== response.website) {
    newData.website = data.website;
  }

  if (Object.keys(newData).length === 0) {
    return;
  }

  try {
    await servicePutUserSettingsEditProfile(newData);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const putUserAccountManagementAdapter = async (
  data: UserPutAccountManagement
) => {
  const newData = {
    gender: data?.gender,
    country: data?.country,
    language: data?.language,
    emailAddress: data?.emailAddress,
    birthdate: data.birthdate,
  };
  try {
    await servicePutAccountManagementPersonalInfo(newData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchProfileVisibilityAdapter =
  async (): Promise<UserProfileVisibility | null> => {
    try {
      const response = await ServiceGetProfileVisibility();
      if (response) {
        return {
          account_type: response.account_type,
          private_account: response.private_account,
        };
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const patchProfileVisibilityTypeAdapter = async (
  data: UserProfileVisibility
) => {
  const newData = {
    account_type: data.account_type,
    private_account: data.private_account,
  };

  try {
    await servicePatchProfileVisibilityTypeAccount(newData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const patchProfileVisibilityPrivateAdapter = async (
  data: UserProfileVisibility
) => {
  const newData = {
    account_type: data.account_type,
    private_account: data.private_account,
  };

  try {
    await servicePatchProfileVisibilityPrivateAccount(newData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const patchAccountManagementPasswordAdapter = async (
  data: UserPatchPasswordAccountManagement
) => {
  const newData = {
    prevPassword: data.prevPassword,
    newPassword: data.newPassword,
  };

  try {
    await servicePatchAccountManagementPassword(newData);
  } catch (error) {
    throw error;
  }
};

export const patchAvatarAdapter = async (data: UserPatchAvatar) => {
  const newData = {
    avatar: data.avatar,
  };
  try {
    await servicePatchAvatar(newData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAvatarAdapter = async () => {
  try {
    await serviceDeleteAvatar();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserAccountAdapter = async () => {
  try {
    await serviceDeleteAccountUser();
  } catch (error) {
    console.log(error);
    return null;
  }
};

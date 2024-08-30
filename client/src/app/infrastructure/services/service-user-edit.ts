import axios from 'axios';
import {
  UserAccountManagmentSchema,
  UserSettingsEditProfileSchema,
  UserVisibilityAccountSchema,
} from '../schemas/validation-service-api';
import {
  UserDataAccountEdit,
  UserPatchAvatar,
  UserPatchPasswordAccountManagement,
  UserProfileVisibility,
  UserPutAccountManagement,
  UserSettingsEditProfile,
} from '@/app/domain/types';

export const serviceGetUserAccountManagment =
  async (): Promise<UserDataAccountEdit | null> => {
    try {
      const response = await axios.get(
        'http://localhost:1234/pinterest-clon-api/settings/account-management/',
        { withCredentials: true }
      );
      console.log(response);

      const result = UserAccountManagmentSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const servicePutAccountManagementPersonalInfo = async (
  data: UserPutAccountManagement
) => {
  try {
    const response = await axios.put(
      'http://localhost:1234/pinterest-clon-api/settings/account-management/personal-info',
      {
        ...data,
      },
      { withCredentials: true }
    );
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetUserSettingsEditProfile =
  async (): Promise<UserSettingsEditProfile | null> => {
    try {
      const response = await axios.get(
        'http://localhost:1234/pinterest-clon-api/settings/edit-profile/',
        { withCredentials: true }
      );
      console.log(response);
      console.log(response.status);

      const result = UserSettingsEditProfileSchema.safeParse(
        response.data.userData
      );
      console.log(result);
      return result.success ? result.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const servicePutUserSettingsEditProfile = async (
  data: UserSettingsEditProfile
) => {
  console.log(data);

  try {
    const response = await axios.put(
      'http://localhost:1234/pinterest-clon-api/settings/edit-profile',
      {
        ...data,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.status);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const ServiceGetProfileVisibility =
  async (): Promise<UserProfileVisibility | null> => {
    try {
      const response = await axios.get(
        'http://localhost:1234/pinterest-clon-api/settings/profile-visibility',

        { withCredentials: true }
      );

      const result = UserVisibilityAccountSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const servicePatchProfileVisibilityTypeAccount = async (
  data: UserProfileVisibility
) => {
  try {
    const response = await axios.patch(
      'http://localhost:1234/pinterest-clon-api/settings/profile-visibility/convert-account',
      {
        ...data,
      },
      { withCredentials: true }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePatchProfileVisibilityPrivateAccount = async (
  data: UserProfileVisibility
) => {
  try {
    const response = await axios.patch(
      'http://localhost:1234/pinterest-clon-api/settings/profile-visibility/private-account',
      {
        ...data,
      },
      { withCredentials: true }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePatchAccountManagementPassword = async (
  data: UserPatchPasswordAccountManagement
) => {
  try {
    const response = await axios.patch(
      'http://localhost:1234/pinterest-clon-api/settings/account-management/change-password',
      {
        ...data,
      },
      { withCredentials: true }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePatchAvatar = async (data: UserPatchAvatar) => {
  try {
    const response = await axios.post(
      'http://localhost:1234/pinterest-clon-api/avatar',
      {
        ...data,
      },

      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serviceDeleteAvatar = async () => {
  try {
    const response = await axios.delete(
      'http://localhost:1234/pinterest-clon-api/avatar',

      {
        withCredentials: true,
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serviceDeleteAccountUser = async () => {
  try {
    await axios.delete(
      'http://localhost:1234/pinterest-clon-api/settings/account-management/delete-account',
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

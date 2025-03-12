import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain'; // Asegúrate de importar URLDOMAIN
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
        `${URLDOMAIN}/settings/account-management/`,
        { withCredentials: true }
      );

      const result = UserAccountManagmentSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error: unknown) {
      throw new Error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          'Error al obtener la gestión de la cuenta del usuario'
      );
    }
  };

export const servicePutAccountManagementPersonalInfo = async (
  data: UserPutAccountManagement
) => {
  try {
    const response = await axios.put(
      `${URLDOMAIN}/settings/account-management/personal-info`,
      {
        ...data,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al actualizar la información personal'
    );
  }
};

export const serviceGetUserSettingsEditProfile =
  async (): Promise<UserSettingsEditProfile | null> => {
    try {
      const response = await axios.get(`${URLDOMAIN}/settings/edit-profile/`, {
        withCredentials: true,
      });

      const result = UserSettingsEditProfileSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error: unknown) {
      throw new Error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          'Error al obtener la configuración de edición del perfil'
      );
    }
  };

export const servicePutUserSettingsEditProfile = async (
  data: UserSettingsEditProfile
) => {
  try {
    const response = await axios.put(
      `${URLDOMAIN}/settings/edit-profile`,
      {
        ...data,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al actualizar la configuración del perfil'
    );
  }
};

export const ServiceGetProfileVisibility =
  async (): Promise<UserProfileVisibility | null> => {
    try {
      const response = await axios.get(
        `${URLDOMAIN}/settings/profile-visibility`,
        { withCredentials: true }
      );

      const result = UserVisibilityAccountSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error: unknown) {
      throw new Error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          'Error al obtener la visibilidad del perfil'
      );
    }
  };

export const servicePatchProfileVisibilityTypeAccount = async (
  data: UserProfileVisibility
) => {
  try {
    const response = await axios.patch(
      `${URLDOMAIN}/settings/profile-visibility/convert-account`,
      {
        ...data,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al cambiar el tipo de cuenta'
    );
  }
};

export const servicePatchProfileVisibilityPrivateAccount = async (
  data: UserProfileVisibility
) => {
  try {
    const response = await axios.patch(
      `${URLDOMAIN}/settings/profile-visibility/private-account`,
      {
        ...data,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al cambiar la visibilidad de la cuenta a privada'
    );
  }
};

export const servicePatchAccountManagementPassword = async (
  data: UserPatchPasswordAccountManagement
) => {
  try {
    const response = await axios.patch(
      `${URLDOMAIN}/settings/account-management/change-password`,
      {
        ...data,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al cambiar la contraseña'
    );
  }
};

export const servicePatchAvatar = async (data: UserPatchAvatar) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/avatar`,
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

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al actualizar el avatar'
    );
  }
};

export const serviceDeleteAvatar = async () => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/avatar`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al eliminar el avatar'
    );
  }
};

export const serviceDeleteAccountUser = async () => {
  try {
    const response = await axios.delete(
      `${URLDOMAIN}/settings/account-management/delete-account`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al eliminar la cuenta de usuario'
    );
  }
};

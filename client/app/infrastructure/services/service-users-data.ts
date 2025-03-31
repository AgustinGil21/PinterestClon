import {
  CreatedPinsInterface,
  FollowingsListInterface,
  OwnerProfileInterface,
} from '../../domain/types/data-users';
import { SearchUserProfileInterface } from '../../domain/types/data-users';
import { URLDOMAIN } from '../../interfaces/helpers/urldomain';
import { FollowersListInterface } from '../../domain/types/data-users';
import axios from 'axios';
import {
  FollowersListSchema,
  FollowingsListSchema,
  OwnerProfileSchema,
  PinCreatedDataSchema,
  PinSchema,
  SearchUserProfileSchema,
  SearchUsersSchema,
} from '../schemas/validation-service-api';
import { PinInterface } from '../../domain/types/pins-structure';
import { ISearchByValue } from '../../domain/types/boards-interface';

export const serviceGetUserOwnerProfile =
  async (): Promise<OwnerProfileInterface | null> => {
    try {
      const response = await axios.get(`${URLDOMAIN}/users/profile`, {
        withCredentials: true,
      });

      const result = OwnerProfileSchema.safeParse(response.data.profile);

      return result.success ? result.data : null;
    } catch (error: unknown) {
      throw new Error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          'Error al obtener el perfil del propietario'
      );
    }
  };

export const serviceGetSearchUserProfile = async (
  username: string
): Promise<SearchUserProfileInterface | null> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/users/profile/${username}`, {
      withCredentials: true,
    });

    const result = SearchUserProfileSchema.safeParse(response.data.profile);

    if (result.success) {
      // Asegurar que `id` no sea undefined
      return {
        ...result.data,
        id: result.data.id || '',
      } as SearchUserProfileInterface;
    }

    return null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al buscar el perfil del usuario'
    );
  }
};

export const servicePostFollowUser = async (
  id: string
): Promise<boolean | null> => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/users/follow/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.status ? response.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al seguir al usuario'
    );
  }
};

export const serviceGetFollowersList = async (
  username: string
): Promise<FollowersListInterface> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/followers-list/${username}`,
      {
        withCredentials: true,
      }
    );

    const result = FollowersListSchema.safeParse(response.data);

    return result.success ? result.data : { followers: [], followersCount: 0 };
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener la lista de seguidores'
    );
  }
};

export const serviceGetFollowingList = async (
  username: string
): Promise<FollowingsListInterface> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/following-list/${username}`,
      {
        withCredentials: true,
      }
    );

    const result = FollowingsListSchema.safeParse(response.data);

    return result.success ? result.data : { following: [], followingCount: 0 };
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener la lista de seguidos'
    );
  }
};

export const serviceGetCreatedPins = async (
  username: string,
  page: number,
  limit: number
): Promise<CreatedPinsInterface[] | []> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/created/${username}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = PinCreatedDataSchema.safeParse(response.data.pins);

    return result.success ? result.data : [];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los pines creados'
    );
  }
};

export const serviceSavePinToProfile = async (id: string) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/users/save-pin`,
      { id },
      {
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al guardar el pin en el perfil'
    );
  }
};

export const serviceGetSavesPins = async (
  username: string,
  page: number,
  limit: number
): Promise<PinInterface[]> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/saved/${username}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = PinSchema.array().safeParse(response.data.pins);

    return result.success ? result.data : [];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los pines guardados'
    );
  }
};

export const serviceRemovePinFromProfile = async (id: string) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/users/remove-pin`,
      { id },
      {
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al eliminar el pin del perfil'
    );
  }
};

export const serviceSearchUsers = async ({
  page,
  limit,
  value,
}: ISearchByValue) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/search/${value}?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );

    const result = SearchUsersSchema.safeParse(response.data);

    return result.success ? result.data.users : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al buscar usuarios'
    );
  }
};

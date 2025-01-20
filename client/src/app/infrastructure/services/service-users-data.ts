import {
  CreatedPinsInterface,
  FollowingsListInterface,
  OwnerProfileInterface,
} from '@/app/domain/types/data-users';
import { SearchUserProfileInterface } from '@/app/domain/types/data-users';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import { FollowersListInterface } from '@/app/domain/types/data-users';
import axios from 'axios';
import {
  FollowersListSchema,
  FollowingsListSchema,
  OwnerProfileSchema,
  PinCreatedDataSchema,
  PinSchema,
  SearchUserProfileSchema,
} from '../schemas/validation-service-api';
import { PinInterface } from '@/app/domain/types/pins-structure';

export const serviceGetUserOwnerProfile =
  async (): Promise<OwnerProfileInterface | null> => {
    try {
      const response = await axios.get(`${URLDOMAIN}/users/profile`, {
        withCredentials: true,
      });

      console.log(response);

      const result = OwnerProfileSchema.safeParse(response.data.profile);

      console.log(result);

      return result.success ? result.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const serviceGetSearchUserProfile = async (
  username: string
): Promise<SearchUserProfileInterface | null> => {
  try {
    console.log(username);
    const response = await axios.get(`${URLDOMAIN}/users/profile/${username}`, {
      withCredentials: true,
    });

    console.log(response);

    const result = SearchUserProfileSchema.safeParse(response.data.profile);

    if (result.success) {
      // Asegurar que `id` no sea undefined
      return {
        ...result.data,
        id: result.data.id || '',
      } as SearchUserProfileInterface;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
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

    console.log(response);

    return response.status ? response.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serviceGetFollowersList = async (
  username: string
): Promise<FollowersListInterface> => {
  console.log(username);
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/followers-list/${username}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);

    const result = FollowersListSchema.safeParse(response.data);

    console.log(result);

    return result.success ? result.data : { followers: [], followersCount: 0 };
  } catch (error) {
    console.log(error);
    return { followers: [], followersCount: 0 };
  }
};

export const serviceGetFollowingList = async (
  username: string
): Promise<FollowingsListInterface> => {
  console.log(username);
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/following-list/${username}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);

    const result = FollowingsListSchema.safeParse(response.data);

    console.log(result);

    return result.success ? result.data : { following: [], followingCount: 0 };
  } catch (error) {
    console.log(error);
    return { following: [], followingCount: 0 };
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
    console.log(response);

    const result = PinCreatedDataSchema.safeParse(response.data.pins);

    console.log(result);

    return result.success ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
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
  } catch (err) {
    return null;
  }
};

export const serviceGetSavesPins = async (
  username: string,
  page: number,
  limit: number
): Promise<PinInterface[]> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/users/saved-pins/${username}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    console.log(response);

    const result = PinSchema.array().safeParse(response.data);

    return result.success ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
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
  } catch (err) {
    console.log(err);
    return null;
  }
};

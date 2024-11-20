import { OwnerProfileInterface } from '@/app/domain/types/data-users';
import { SearchUserProfileInterface } from '@/app/domain/types/data-users';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import axios from 'axios';
import {
  OwnerProfileSchema,
  SearchUserProfileSchema,
} from '../schemas/validation-service-api';

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

    console.log(result);

    return result.success ? result.data : null;
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

import {
  OwnerProfileInterface,
  SearchUserProfileInterface,
} from '@/app/domain/types/data-users';
import {
  serviceGetSearchUserProfile,
  serviceGetUserOwnerProfile,
  servicePostFollowUser,
} from '../services/service-users-data';

export const getUserOwnerProfileAdapter =
  async (): Promise<OwnerProfileInterface | null> => {
    try {
      const response = await serviceGetUserOwnerProfile();

      if (response) {
        return {
          username: response.username,
          name: response.name || '',
          surname: response.surname || '',
          verified: response.verified,
          avatar: response.avatar || '',
          avatar_background: response.avatar_background,
          avatar_letter_color: response.avatar_letter_color,
          avatar_letter: response.avatar_letter,
          about: response.about || '',
          website: response.website || '',
          private_account: response.private_account || false,
          followers_count: response.followers_count || '',
          following_count: response.following_count || '',
        };
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getSearchUserProfileAdapter = async (
  username: string
): Promise<SearchUserProfileInterface | null> => {
  try {
    const response = await serviceGetSearchUserProfile(username);

    if (response) {
      return {
        id: response.id,
        username: response.username,
        name: response.name || '',
        surname: response.surname || '',
        verified: response.verified,
        avatar: response.avatar || '',
        avatar_background: response.avatar_background,
        avatar_letter_color: response.avatar_letter_color,
        avatar_letter: response.avatar_letter,
        about: response.about || '',
        website: response.website || '',
        private_account: response.private_account,
        followers_count: response.followers_count,
        following_count: response.following_count,
        follows_you: response.follows_you,
        following: response.following,
        its_you: response.its_you,
      };
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postFollowUserAdapter = async (
  id: string
): Promise<boolean | null> => {
  return await servicePostFollowUser(id);
};

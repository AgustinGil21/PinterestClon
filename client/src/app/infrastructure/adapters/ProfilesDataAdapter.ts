import {
  FollowersListInterface,
  FollowingsListInterface,
  OwnerProfileInterface,
  SearchUserProfileInterface,
} from '@/app/domain/types/data-users';
import {
  serviceGetFollowersList,
  serviceGetFollowingList,
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

export const getFollowersListAdapter = async (
  username: string
): Promise<FollowersListInterface> => {
  try {
    const response = await serviceGetFollowersList(username);

    console.log(response);

    const adaptedResponse = {
      followers: response.followers.map((follower) => ({
        id: follower.id,
        username: follower.username,
        name: follower.name || '',
        surname: follower.surname || '',
        verified: follower.verified,
        avatar: follower.avatar || '',
        avatar_background: follower.avatar_background,
        avatar_letter_color: follower.avatar_letter_color,
        avatar_letter: follower.avatar_letter,
        its_you: follower.its_you,
        follows_you: follower.follows_you,
        following: follower.following,
      })),
      followersCount: response.followersCount || 0,
    };

    console.log(adaptedResponse);

    return adaptedResponse;
  } catch (error) {
    console.error('Error in getFollowersListAdapter:', error);
    return { followers: [], followersCount: 0 };
  }
};

export const getFollowingsListAdapter = async (
  username: string
): Promise<FollowingsListInterface> => {
  try {
    const response = await serviceGetFollowingList(username);

    console.log(response);

    const adaptedResponse = {
      following: response.following.map((following) => ({
        id: following.id,
        username: following.username,
        name: following.name || '',
        surname: following.surname || '',
        verified: following.verified,
        avatar: following.avatar || '',
        avatar_background: following.avatar_background,
        avatar_letter_color: following.avatar_letter_color,
        avatar_letter: following.avatar_letter,
        its_you: following.its_you,
        follows_you: following.follows_you,
        following: following.following,
      })),
      followingCount: response.followingCount || 0,
    };

    console.log(adaptedResponse);

    return adaptedResponse;
  } catch (error) {
    console.error('Error in getFollowe  rsListAdapter:', error);
    return { following: [], followingCount: 0 };
  }
};

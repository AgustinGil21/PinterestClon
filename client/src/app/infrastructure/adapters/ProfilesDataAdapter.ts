import {
  CreatedPinsInterface,
  FollowersListInterface,
  FollowingsListInterface,
  IUsersProfileCard,
  OwnerProfileInterface,
  SearchUserProfileInterface,
} from '@/app/domain/types/data-users';
import {
  serviceGetCreatedPins,
  serviceGetFollowersList,
  serviceGetFollowingList,
  serviceGetSearchUserProfile,
  serviceGetUserOwnerProfile,
  servicePostFollowUser,
  serviceRemovePinFromProfile,
  serviceSavePinToProfile,
  serviceSearchUsers,
} from '../services/service-users-data';
import { ISearchByValue } from '@/app/domain/types/boards-interface';

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

      throw new Error('No se encontró el perfil del propietario.');
    } catch (error: unknown) {
      throw new Error(
        (error instanceof Error && error.message) ||
          'Error al obtener el perfil del propietario'
      );
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

    throw new Error('No se encontró el perfil del usuario buscado.');
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al buscar el perfil del usuario'
    );
  }
};

export const postFollowUserAdapter = async (
  id: string
): Promise<boolean | null> => {
  try {
    return await servicePostFollowUser(id);
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) || 'Error al seguir al usuario'
    );
  }
};

export const getFollowersListAdapter = async (
  username: string
): Promise<FollowersListInterface> => {
  try {
    const response = await serviceGetFollowersList(username);

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

    return adaptedResponse;
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al obtener la lista de seguidores'
    );
  }
};

export const getFollowingsListAdapter = async (
  username: string
): Promise<FollowingsListInterface> => {
  try {
    const response = await serviceGetFollowingList(username);

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

    return adaptedResponse;
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al obtener la lista de seguidos'
    );
  }
};

export const getCreatedPinsAdapter = async (
  username: string,
  page: number,
  limit: number
): Promise<CreatedPinsInterface[]> => {
  try {
    const response = await serviceGetCreatedPins(username, page, limit);

    const adaptedPins = response.map((pin) => ({
      pin_id: pin.id,
      alt_text: pin.alt_text,
      body: pin.body,
      title: pin.title || '',
      url: pin.url || '',
      created_at: pin.created_at,
      adult_content: pin.adult_content,
      its_yours: pin.its_yours || false,
      saved_in_profile: pin.saved_in_profile,
      board: pin.board,
    }));

    return adaptedPins;
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al obtener los pines creados'
    );
  }
};

export const savePinToProfileAdapter = async (id: string) => {
  try {
    return await serviceSavePinToProfile(id);
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al guardar el pin en el perfil'
    );
  }
};

export const removePinFromProfileAdapter = async (id: string) => {
  try {
    return await serviceRemovePinFromProfile(id);
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) ||
        'Error al eliminar el pin del perfil'
    );
  }
};

export const searchUsersAdapter = async ({
  page,
  limit,
  value,
}: ISearchByValue): Promise<IUsersProfileCard | null> => {
  try {
    return await serviceSearchUsers({ page, limit, value });
  } catch (error: unknown) {
    throw new Error(
      (error instanceof Error && error.message) || 'Error al buscar usuarios'
    );
  }
};

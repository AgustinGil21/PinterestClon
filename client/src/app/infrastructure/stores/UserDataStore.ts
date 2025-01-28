import { getUserOwnerProfileCase } from '@/app/application/use-cases/profile-data/getUserOwnerProfile';
import {
  CreatedPinsInterface,
  FollowersListInterface,
  FollowingsListInterface,
  IUsersProfileCard,
  OwnerProfileInterface,
  SearchUserProfileInterface,
} from '@/app/domain/types/data-users';
import { StateCreator } from 'zustand';
import { getSearchUserProfileCase } from '@/app/application/use-cases/profile-data/getSearchUserProfile';
import { postFollowUserCase } from '@/app/application/use-cases/profile-data/postFollowUser';
import { getFollowersListCase } from '@/app/application/use-cases/profile-data/getFollowersList';
import { getFollowingsListCase } from '@/app/application/use-cases/profile-data/getFollowingsList';
import { getCreatedPinsCase } from '@/app/application/use-cases/profile-data/getCreatedPins';
import { getUniqueItems } from '@/app/libs/getUniqueItems';
import { getSavePinsCase } from '@/app/application/use-cases/profile-data/getSavePinsUser';
import { PinInterface } from '@/app/domain/types/pins-structure';
import { removePinFromProfileUseCase } from '@/app/application/use-cases/profile-data/removePinFromProfile';
import { savePinToProfileUseCase } from '@/app/application/use-cases/profile-data/savePinToProfile';
import { ISearchByValue } from '@/app/domain/types/boards-interface';
import { searchUsersCase } from '@/app/application/use-cases/profile-data/searchUsers';

export interface UserDataStoreInterface {
  dataOwnerProfile: OwnerProfileInterface;
  dataSearchUserProfile: SearchUserProfileInterface;
  followersList: FollowersListInterface;
  followingList: FollowingsListInterface;
  createdPins: CreatedPinsInterface[];
  savedPins: PinInterface[];
  usersProfile: IUsersProfileCard[];
  isFollowing: boolean;
  noMoreUsers: boolean;
  noMoreCreatedPins: boolean;
  noMoreSavedPins: boolean;

  searchUsers: (params: ISearchByValue) => Promise<void>;
  getUserOwnerProfile: () => Promise<void>;
  getSearchUserProfile: (username: string) => Promise<void>;
  postFollowUser: (id: string) => Promise<void>;
  getFollowersList: (username: string) => Promise<void>;
  getFollowingsList: (username: string) => Promise<void>;
  getCreatedPins: (
    username: string,
    page: number,
    limit: number,
    reset?: boolean
  ) => Promise<void>;
  getSavePins: (
    username: string,
    page: number,
    limit: number,
    reset?: boolean
  ) => Promise<void>;
  savePinToProfile: (id: string) => Promise<void>;
  removePinFromProfile: (id: string) => Promise<void>;
}

export const createUserDataStore: StateCreator<UserDataStoreInterface> = (
  set,
  get
) => ({
  dataOwnerProfile: {
    username: '',
    name: '',
    surname: '',
    verified: false,
    avatar: '',
    avatar_background: '',
    avatar_letter_color: '',
    avatar_letter: '',
    about: '',
    website: '',
    private_account: false,
    followers: '',
    following: '',
  },

  dataSearchUserProfile: {
    id: '',
    username: '',
    name: '',
    surname: '',
    verified: false,
    avatar: '',
    avatar_background: '',
    avatar_letter_color: '',
    avatar_letter: '',
    about: '',
    website: '',
    private_account: false,
    followers_count: '0',
    following_count: '0',
    follows_you: false,
    following: false,
    its_you: false,
  },

  followersList: {
    followers: [],
    followersCount: 0,
  },

  followingList: {
    following: [],
    followingCount: 0,
  },

  isFollowing: false,
  createdPins: [],
  savedPins: [],
  usersProfile: [],
  noMoreUsers: false,
  noMoreCreatedPins: false,
  noMoreSavedPins: false,

  searchUsers: async ({ page, limit, value }: ISearchByValue) => {
    const { noMoreUsers, usersProfile } = get();

    if (noMoreUsers && page > 1) {
      console.log('No hay más usuarios disponibles.');
      return;
    }

    if (page === 1) {
      set({ usersProfile: [], noMoreUsers: false });
    }

    try {
      const response = await searchUsersCase({ page, limit, value });

      if (response && Array.isArray(response)) {
        const newUsers = getUniqueItems(response, usersProfile, 'id');

        if (newUsers.length > 0) {
          set({
            usersProfile: [...usersProfile, ...newUsers],
          });
        } else {
          set({ noMoreUsers: true });
          console.log('No hay más usuarios disponibles.');
        }
      } else {
        set({ noMoreUsers: true });
        console.log(
          'No hay más usuarios disponibles o la respuesta fue inválida.'
        );
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      set({ noMoreUsers: true });
    }
  },

  getUserOwnerProfile: async () => {
    const response = await getUserOwnerProfileCase();

    if (response) {
      set({ dataOwnerProfile: response });
    }
  },

  getSearchUserProfile: async (username: string) => {
    const response = await getSearchUserProfileCase(username);

    if (response) {
      set({
        dataSearchUserProfile: response,
      });
    }
  },

  postFollowUser: async (id: string) => {
    await postFollowUserCase(id);
    set((state) => ({
      isFollowing: !state.isFollowing,
    }));
  },

  getFollowersList: async (username: string) => {
    const response = await getFollowersListCase(username);

    set({
      followersList: response,
    });
  },

  getFollowingsList: async (username: string) => {
    const response = await getFollowingsListCase(username);

    set({
      followingList: response,
    });
  },

  getCreatedPins: async (
    username: string,
    page: number,
    limit: number,
    reset: boolean = false
  ) => {
    const { createdPins, noMoreCreatedPins } = get();

    if (noMoreCreatedPins && !reset && page > 1) {
      console.log('No hay más pines creados disponibles.');
      return;
    }

    if (reset || page === 1) {
      set({ createdPins: [], noMoreCreatedPins: false });
    }

    try {
      const response = await getCreatedPinsCase(username, page, limit);

      if (response && Array.isArray(response)) {
        const newPins = getUniqueItems(response, createdPins, 'pin_id');

        if (newPins.length > 0) {
          set({
            createdPins: [...createdPins, ...newPins],
          });
        } else {
          set({ noMoreCreatedPins: true });
          console.log('No hay más pines creados disponibles.');
        }
      } else {
        set({ noMoreCreatedPins: true });
        console.log(
          'No hay más pines creados disponibles o la respuesta es inválida.'
        );
      }
    } catch (error) {
      console.error('Error al obtener pines creados:', error);
      set({ noMoreCreatedPins: true });
    }
  },

  getSavePins: async (
    username: string,
    page: number,
    limit: number,
    reset: boolean = false
  ) => {
    const { savedPins, noMoreSavedPins } = get();

    if (noMoreSavedPins && !reset && page > 1) {
      console.log('No hay más pines guardados disponibles.');
      return;
    }

    if (reset || page === 1) {
      set({ savedPins: [], noMoreSavedPins: false });
    }

    try {
      const response = await getSavePinsCase(username, page, limit);

      if (response && Array.isArray(response)) {
        const newPins = getUniqueItems(response, savedPins, 'pin_id');

        if (newPins.length > 0) {
          set({
            savedPins: [...savedPins, ...newPins],
          });
        } else {
          set({ noMoreSavedPins: true });
          console.log('No hay más pines guardados disponibles.');
        }
      } else {
        set({ noMoreSavedPins: true });
        console.log(
          'No hay más pines guardados disponibles o la respuesta es inválida.'
        );
      }
    } catch (error) {
      console.error('Error al obtener pines guardados:', error);
      set({ noMoreSavedPins: true });
    }
  },

  savePinToProfile: async (id: string): Promise<void> => {
    const response = await savePinToProfileUseCase(id);
  },

  removePinFromProfile: async (id: string): Promise<void> => {
    const response = await removePinFromProfileUseCase(id);
  },
});

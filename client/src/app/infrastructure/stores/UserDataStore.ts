import { getUserOwnerProfileCase } from '@/app/application/use-cases/profile-data/getUserOwnerProfile';
import {
  CreatedPinsInterface,
  FollowersListInterface,
  FollowingsListInterface,
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

export interface UserDataStoreInterface {
  dataOwnerProfile: OwnerProfileInterface;
  dataSearchUserProfile: SearchUserProfileInterface;
  getUserOwnerProfile: () => Promise<void>;
  getSearchUserProfile: (username: string) => Promise<void>;
  postFollowUser: (id: string) => Promise<void>;
  isFollowing: boolean;
  followersList: FollowersListInterface;
  followingList: FollowingsListInterface;
  getFollowersList: (username: string) => Promise<void>;
  getFollowingsList: (username: string) => Promise<void>;
  getCreatedPins: (
    username: string,
    page: number,
    limit: number,
    reset: boolean
  ) => Promise<void>;
  createdPins: CreatedPinsInterface[];
  savedPins: PinInterface[];
  getSavePins: (username: string, page: number, limit: number) => Promise<void>;
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
    const response = await postFollowUserCase(id);
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
    if (reset) {
      set({ createdPins: [] });
    }
    const response = await getCreatedPinsCase(username, page, limit);

    const { createdPins } = get();

    const newPins = getUniqueItems(response, createdPins, 'pin_id');

    set({
      createdPins: [...createdPins, ...newPins],
    });
  },

  getSavePins: async (
    username: string,
    page: number,
    limit: number,
    reset: boolean = false
  ) => {
    if (reset) {
      set({ savedPins: [] });
    }
    const response = await getSavePinsCase(username, page, limit);

    const { savedPins } = get();

    const newPins = getUniqueItems(response, savedPins, 'pin_id');

    set({
      savedPins: [...savedPins, ...newPins],
    });
  },
});

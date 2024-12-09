import { getUserOwnerProfileCase } from '@/app/application/use-cases/profile-data/getUserOwnerProfile';
import {
  OwnerProfileInterface,
  SearchUserProfileInterface,
} from '@/app/domain/types/data-users';
import { StateCreator } from 'zustand';
import { getSearchUserProfileCase } from '@/app/application/use-cases/profile-data/getSearchUserProfile';
import { postFollowUserCase } from '@/app/application/use-cases/profile-data/postFollowUser';

export interface UserDataStoreInterface {
  dataOwnerProfile: OwnerProfileInterface;
  dataSearchUserProfile: SearchUserProfileInterface;
  getUserOwnerProfile: () => Promise<void>;
  getSearchUserProfile: (username: string) => Promise<void>;
  postFollowUser: (id: string) => Promise<void>;
  isFollowing: boolean;
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

  isFollowing: false,

  getUserOwnerProfile: async () => {
    const response = await getUserOwnerProfileCase();
    console.log(response);

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
      isFollowing: !state.isFollowing, // Devolvemos el nuevo valor de `isFollowing`
    }));
  },
});

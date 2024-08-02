import { StateCreator } from 'zustand';
import { serviceGetDataUser } from '../services/service-register';
import { UserDataType } from '../types';

export interface UserStoreInterface {
  isLoggedIn: boolean;
  user: UserDataType[];
  getDataUser: () => Promise<void>;
}

export const createUserStore: StateCreator<UserStoreInterface> = (set) => ({
  isLoggedIn: false,
  user: [],
  getDataUser: async () => {
    const response = await serviceGetDataUser();
    set({
      isLoggedIn: true,
    });
  },
});

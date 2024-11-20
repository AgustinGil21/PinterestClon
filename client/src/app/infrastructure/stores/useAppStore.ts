import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createThemeSlice, ThemeSliceInterface } from './themeSlice';
import { createModalStore } from './modalStore';
import { ModalStateInterface } from './modalStore';
import { createUserRegisterStore } from './userRegisterStore';
import { UserRegisterStoreInterface } from './userRegisterStore';
import {
  createUserAccountStore,
  UserAccountInterface,
} from './userAccountStore';
import { createPinsStore, CreatePinsStoreInterface } from './createPinsStore';
import { homePinsStoreInterface } from './getPinsStore';
import { homePinsStore } from './getPinsStore';
import { UserDataStoreInterface } from './UserDataStore';
import { createUserDataStore } from './UserDataStore';

type AppState = ThemeSliceInterface &
  ModalStateInterface &
  UserRegisterStoreInterface &
  UserAccountInterface &
  CreatePinsStoreInterface &
  homePinsStoreInterface &
  UserDataStoreInterface;

export const useAppsStore = create<AppState>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createModalStore(...a),
    ...createUserRegisterStore(...a),
    ...createUserAccountStore(...a),
    ...createPinsStore(...a),
    ...homePinsStore(...a),
    ...createUserDataStore(...a),
  }))
);

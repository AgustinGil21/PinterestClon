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
import { PinViewStoreInterface } from './pinViewStore';
import { createPinViewStore } from './pinViewStore';

type AppState = ThemeSliceInterface &
  ModalStateInterface &
  UserRegisterStoreInterface &
  UserAccountInterface &
  CreatePinsStoreInterface &
  homePinsStoreInterface &
  UserDataStoreInterface &
  PinViewStoreInterface;

export const useAppsStore = create<AppState>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createModalStore(...a),
    ...createUserRegisterStore(...a),
    ...createUserAccountStore(...a),
    ...createPinsStore(...a),
    ...homePinsStore(...a),
    ...createUserDataStore(...a),
    ...createPinViewStore(...a),
  }))
);

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

type AppState = ThemeSliceInterface &
  ModalStateInterface &
  UserRegisterStoreInterface &
  UserAccountInterface;

export const useAppsStore = create<AppState>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createModalStore(...a),
    ...createUserRegisterStore(...a),
    ...createUserAccountStore(...a),
  }))
);

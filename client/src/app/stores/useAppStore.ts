import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createThemeSlice, ThemeSliceInterface } from './themeSlice';
import { createModalStore } from './modalStore';
import { ModalStateInterface } from './modalStore';
import { createUserStore } from './usersStore';
import { UserStoreInterface } from './usersStore';

type AppState = ThemeSliceInterface & ModalStateInterface & UserStoreInterface;

export const useAppsStore = create<AppState>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createModalStore(...a),
    ...createUserStore(...a),
  }))
);

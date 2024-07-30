import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createThemeSlice, ThemeSliceInterface } from './themeSlice';
import { createModalStore } from './modalStore';
import { ModalStateInterface } from './modalStore';

type AppState = ThemeSliceInterface & ModalStateInterface;

export const useAppsStore = create<AppState>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createModalStore(...a),
  }))
);

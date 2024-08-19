import { StateCreator } from 'zustand';

export interface ThemeSliceInterface {
  isDarkMode: boolean;
  toggleMode: () => void;
}

export const createThemeSlice: StateCreator<ThemeSliceInterface> = (set) => ({
  isDarkMode: false,
  toggleMode: () => {
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    }));
  },
});

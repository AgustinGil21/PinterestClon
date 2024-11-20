import { StateCreator } from 'zustand';

export interface ThemeSliceInterface {
  isDarkMode: boolean;
  toggleMode: () => void;
  isHeaderLoaded: boolean;
  setIsHeaderLoaded: (loaded: boolean) => void;
}

export const createThemeSlice: StateCreator<ThemeSliceInterface> = (set) => ({
  isDarkMode: false,
  isHeaderLoaded: false,
  setIsHeaderLoaded: (loaded) => set({ isHeaderLoaded: loaded }),
  toggleMode: () => {
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    }));
  },
});

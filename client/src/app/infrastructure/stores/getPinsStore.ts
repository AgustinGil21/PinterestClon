import { StateCreator } from 'zustand';
import {
  PinInterface,
  SuggestionsInterface,
} from '@/app/domain/types/pins-structure';
import { getHomePinsCase } from '@/app/application/use-cases/home/getHomePins';
import { getSearchPinsCase } from '@/app/application/use-cases/home/getSearchPins';
import { getSuggestionsCase } from '@/app/application/use-cases/header/getSuggestions';
import { getPinSearchCategoriesCase } from '@/app/application/use-cases/home/getSearchForCategoryPins';

export interface homePinsStoreInterface {
  homePins: PinInterface[];
  getHomePins: (page: number, limit: number) => Promise<void>;
  getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
  value: string;
  valuesSearch: string[];
  updateDataSearch: (store: string, value: string | number) => void;
  suggestions: SuggestionsInterface[];
  getSuggestions: () => Promise<void>;
  updateValueSearchInput: (value: string) => void;
  removeValueFromSearch: (value: string) => void;
  getSearchPinForCategory: (
    category: string,
    page: number,
    limit: number
  ) => Promise<void>;
  page: number;
  categorySelect: string;
  setPage: (value: number) => void;
  resetPage: () => void;
}

const loadValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem('valuesSearch');
  return storedValues ? JSON.parse(storedValues) : [];
};

export const homePinsStore: StateCreator<homePinsStoreInterface> = (
  set,
  get
) => ({
  page: 1,
  red: '',
  value: '',
  categorySelect: '',
  homePins: [],
  suggestions: [],
  valuesSearch: loadValuesFromLocalStorage(),
  getHomePins: async (page: number, limit: number) => {
    const response = await getHomePinsCase(page, limit);

    if (Array.isArray(response)) {
      const prevHomePins = get().homePins;

      const uniqueHomePins = response.filter(
        (newPin: PinInterface) =>
          !prevHomePins.some(
            (existingPin: PinInterface) => existingPin.pin_id === newPin.pin_id
          )
      );

      // Combina ambos grupos de pins sin duplicados
      set({
        homePins: [...prevHomePins, ...uniqueHomePins],
      });
    }
  },

  // Función para buscar pins por valor
  getSearchPins: async (value: string, page: number, limit: number) => {
    // Limpiar los pins si es una nueva búsqueda (página 1)
    if (page === 1) {
      set({ homePins: [] }); // Reinicia los pins solo en la primera página (nueva búsqueda)
    }

    const response = await getSearchPinsCase(value, page, limit);

    if (Array.isArray(response)) {
      const prevHomePins = get().homePins;

      const uniqueSearchPins = response.filter(
        (newPin: PinInterface) =>
          !prevHomePins.some(
            (existingPin: PinInterface) => existingPin.pin_id === newPin.pin_id
          )
      );

      // Si es una nueva búsqueda (página 1), no concatenamos, solo asignamos los nuevos pins
      set({
        homePins:
          page === 1
            ? uniqueSearchPins
            : [...prevHomePins, ...uniqueSearchPins],
      });

      console.log(
        'Estado de homePins después de la búsqueda: ',
        get().homePins
      );
    }
  },

  getSearchPinForCategory: async (
    category: string,
    page: number,
    limit: number
  ) => {
    set({ homePins: [] }); // Reinicia los pins al filtrar por categoría

    const response = await getPinSearchCategoriesCase(category, page, limit);

    if (Array.isArray(response)) {
      const uniqueSearchPinsForCategory = response.filter(
        (newPin: PinInterface) =>
          !get().homePins.some(
            (existingPin: PinInterface) => existingPin.pin_id === newPin.pin_id
          )
      );

      // Almacena los resultados filtrados por categoría sin duplicados
      set({
        homePins: uniqueSearchPinsForCategory, // Sobrescribe en lugar de concatenar
      });
      console.log(
        'Estado de homePins después de la búsqueda: ',
        get().homePins
      );
    }
  },

  getSuggestions: async () => {
    const response = await getSuggestionsCase();
    console.log(response);
    const shuffledArraySuggestions = response.sort(() => Math.random() - 0.5);

    set({
      suggestions: shuffledArraySuggestions,
    });
  },

  updateDataSearch: async (store: string, value: string | number) => {
    set((state) => ({
      ...state,
      [store]: value,
    }));
    console.log(get().page);
  },
  setPage: (increment: number) => {
    set((state) => ({
      ...state,
      page: state.page + increment,
    }));
  },

  resetPage: () => {
    set({ page: 1 });
  },

  updateValueSearchInput: (value: string) => {
    set((state) => {
      if (state.valuesSearch.includes(value)) {
        return state;
      }

      const updatedValues = [...state.valuesSearch, value];
      localStorage.setItem('valuesSearch', JSON.stringify(updatedValues));
      return {
        ...state,
        valuesSearch: updatedValues,
      };
    });
  },

  removeValueFromSearch: (value: string) => {
    set((state) => {
      const updatedValues = state.valuesSearch.filter((val) => val !== value);

      if (updatedValues.length !== state.valuesSearch.length) {
        localStorage.setItem('valuesSearch', JSON.stringify(updatedValues));
      }
      return {
        ...state,
        valuesSearch: updatedValues,
      };
    });
  },
});

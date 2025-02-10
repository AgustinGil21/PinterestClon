import { StateCreator } from 'zustand';
import {
  PinInterface,
  SuggestionsInterface,
} from '@/app/domain/types/pins-structure';
import { getHomePinsCase } from '@/app/application/use-cases/home/getHomePins';
import { getSearchPinsCase } from '@/app/application/use-cases/home/getSearchPins';
import { getSuggestionsCase } from '@/app/application/use-cases/header/getSuggestions';
import { getPinSearchCategoriesCase } from '@/app/application/use-cases/home/getSearchForCategoryPins';
import { getUniqueItems } from '@/app/libs/getUniqueItems';

export interface homePinsStoreInterface {
  homePins: PinInterface[];
  prevCategory: string;
  getHomePins: (page: number, limit: number) => Promise<void>;
  getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
  value: string;
  valuesSearch: string[];
  updateDataSearch: (
    store: string,
    value: string | number | [] | boolean
  ) => void;
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
  setFiltersState: (valueFilter: string) => void;
  filterState: string;
  itsOpenModalFilter: boolean;
  categoryPinsData: PinInterface[];
  searchPins: PinInterface[];
  noMoreHomePins: boolean;
  noMoreSearchPins: boolean;
  noMoreCategoryPins: boolean;
}

const loadValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem('valuesSearch');
  return storedValues ? JSON.parse(storedValues) : [];
};

const loadValueFilterFromLocalStorage = () => {
  const storedValues = localStorage.getItem('valueFilter');
  return storedValues ? storedValues : 'pines';
};

export const homePinsStore: StateCreator<homePinsStoreInterface> = (
  set,
  get
) => ({
  page: 1,
  value: '',
  categoryPinsData: [],
  categorySelect: '',
  prevCategory: '',
  homePins: [],
  searchPins: [],
  suggestions: [],
  valuesSearch: loadValuesFromLocalStorage(),
  filterState: loadValueFilterFromLocalStorage(),
  itsOpenModalFilter: false,
  noMoreHomePins: false,
  noMoreSearchPins: false,
  noMoreCategoryPins: false,

  getHomePins: async (page: number, limit: number) => {
    const { homePins } = get();

    if (homePins.length > 0 && page > 1 && get().noMoreHomePins) {
      console.log('No hay más pins para cargar.');
      return;
    }

    const response = await getHomePinsCase(page, limit);

    if (Array.isArray(response) && response.length > 0) {
      const uniqueHomePins = getUniqueItems(response, homePins, 'pin_id');

      if (uniqueHomePins.length > 0) {
        set({
          homePins: [...homePins, ...uniqueHomePins],
          noMoreHomePins: false,
        });
      } else {
        set({ noMoreHomePins: true });
      }
    } else {
      set({ noMoreHomePins: true });
    }
  },

  getSearchPins: async (value: string, page: number, limit: number) => {
    const { searchPins, noMoreSearchPins } = get();

    // Si es la primera búsqueda, limpiamos los resultados previos y restablecemos noMoreSearchPins
    if (page === 1) {
      set({ noMoreSearchPins: false });
    }

    // Si ya no hay más datos y no estamos en la primera búsqueda, evitamos más llamadas
    if (noMoreSearchPins && page > 1) {
      console.log('No hay más resultados para esta búsqueda.');
      return;
    }

    try {
      const response = await getSearchPinsCase(value, page, limit);
      console.log(response);

      if (Array.isArray(response) && response.length > 0) {
        const uniqueSearchPins = getUniqueItems(response, searchPins, 'pin_id');

        if (uniqueSearchPins.length > 0) {
          set({
            searchPins:
              page === 1
                ? uniqueSearchPins
                : [...searchPins, ...uniqueSearchPins],
            noMoreSearchPins: false,
          });
        } else {
          set({ noMoreSearchPins: true });
          console.log('No hay más resultados para esta búsqueda.');
        }
      } else {
        set({ noMoreSearchPins: true });
        console.log('No hay más resultados disponibles.');
      }
    } catch (error) {
      console.error('Error en la búsqueda de pines:', error);
      set({ noMoreSearchPins: true });
    }
  },

  getSearchPinForCategory: async (
    category: string,
    page: number = 1,
    limit: number
  ) => {
    const { categoryPinsData, prevCategory } = get();

    if (
      categoryPinsData.length > 0 &&
      page > 1 &&
      get().noMoreCategoryPins &&
      prevCategory === category
    ) {
      console.log('No hay más resultados para esta categoría.');
      return;
    }

    if (prevCategory !== category) {
      set({ categoryPinsData: [], noMoreCategoryPins: false });
      page = 1;
    }

    set({ prevCategory: category });

    const response = await getPinSearchCategoriesCase(category, page, limit);

    if (Array.isArray(response) && response.length > 0) {
      const uniqueSearchPinsForCategory = getUniqueItems(
        response,
        categoryPinsData,
        'pin_id'
      );

      if (uniqueSearchPinsForCategory.length > 0) {
        set({
          categoryPinsData: [
            ...categoryPinsData,
            ...uniqueSearchPinsForCategory,
          ],
          noMoreCategoryPins: false,
        });
      } else {
        set({ noMoreCategoryPins: true });
      }
    } else {
      set({ noMoreCategoryPins: true });
    }
  },

  getSuggestions: async () => {
    const response = await getSuggestionsCase();

    const shuffledArraySuggestions = response.sort(() => Math.random() - 0.5);

    set({
      suggestions: shuffledArraySuggestions,
    });
  },

  updateDataSearch: async (
    store: string,
    value: string | number | [] | boolean
  ) => {
    set((state) => ({
      ...state,
      [store]: value,
    }));
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

  setFiltersState: (valueFilter: string) => {
    set({
      filterState: valueFilter,
    });
  },
});

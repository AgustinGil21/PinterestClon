import { StateCreator } from 'zustand';
import {
  PinInterface,
  SuggestionsInterface,
} from '@/app/domain/types/pins-structure';
import { getHomePinsCase } from '@/app/application/use-cases/home/getHomePins';
import { getSearchPinsCase } from '@/app/application/use-cases/home/getSearchPins';
import { getSuggestionsCase } from '@/app/application/use-cases/header/getSuggestions';

export interface homePinsStoreInterface {
  homePins: PinInterface[];
  getHomePins: (page: number, limit: number) => Promise<void>;
  getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
  value: string;
  valuesSearch: string[];
  updateValueInputSearch: (value: string) => void;
  suggestions: SuggestionsInterface[];
  getSuggestions: () => Promise<void>;
  updateValuesSearch: (value: string) => void;
  removeValueFromSearch: (value: string) => void;
}

const loadValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem('valuesSearch');
  return storedValues ? JSON.parse(storedValues) : [];
};

export const homePinsStore: StateCreator<homePinsStoreInterface> = (
  set,
  get
) => ({
  value: '',
  homePins: [],
  suggestions: [],
  valuesSearch: loadValuesFromLocalStorage(),
  getHomePins: async (page: number, limit: number) => {
    const response = await getHomePinsCase(page, limit);

    if (Array.isArray(response)) {
      const prevHomePins = get().homePins;

      // Solo se queda con aquellos valores que son distintos a los anteriores, con el objetivo de evitar duplicidad.
      const uniqueHomePins = response.filter(
        (newPin: PinInterface) =>
          !prevHomePins.some(
            (existingPin: PinInterface) => existingPin.pin_id === newPin.pin_id
          )
      );

      // Combina ambos grupos de pins en el estado
      set({
        homePins: [...prevHomePins, ...uniqueHomePins],
      });
    }
  },

  getSearchPins: async (value: string, page: number, limit: number) => {
    set({ homePins: [] });

    const response = await getSearchPinsCase(value, page, limit);
    console.log(response);

    if (Array.isArray(response)) {
      const prevSearchPins = get().homePins;

      const uniqueSearchPins = response.filter(
        (newPin: PinInterface) =>
          !prevSearchPins.some(
            (existingPin: PinInterface) => existingPin.pin_id === newPin.pin_id
          )
      );

      set({
        homePins: [...prevSearchPins, ...uniqueSearchPins],
      });
    }
    console.log(get().homePins);
  },

  getSuggestions: async () => {
    const response = await getSuggestionsCase();
    console.log(response);
    const shuffledArraySuggestions = response.sort(() => Math.random() - 0.5);

    set({
      suggestions: shuffledArraySuggestions,
    });
  },

  updateValueInputSearch: (value: string) => {
    set((state) => ({
      ...state,
      value: value,
    }));
    console.log(get().value);
  },

  updateValuesSearch: (value: string) => {
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

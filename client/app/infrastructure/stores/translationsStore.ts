import { TLang } from '../../global-interfaces/global-interfaces';
import { ITranslation } from '../../global-interfaces/translation-interface';
import axios from 'axios';
import { StateCreator } from 'zustand';

export interface ITranslationStore {
  t: ITranslation | null;
  getTranslation: (lang: TLang) => Promise<void>;
}

export const createTranslationsStore: StateCreator<ITranslationStore> = (
  set,
  get
) => ({
  t: null,
  getTranslation: async (lang: TLang) => {
    const URL = `/translations/lang_${lang}.json`;
    try {
      const response = await axios.get(URL);
      set({ t: response.data });
    } catch (error) {
      set({ t: null });
    }
  },
});

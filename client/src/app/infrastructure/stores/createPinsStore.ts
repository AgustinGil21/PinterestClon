import { deletePreviousPinCase } from '@/app/application/use-cases/create-pins/deletePreviousPin';
import { getCategoriesPinsCase } from '@/app/application/use-cases/create-pins/getCategoriesPins';
import { getPinEditIdCase } from '@/app/application/use-cases/create-pins/getPinEditId';
import { getPreviousPinsCase } from '@/app/application/use-cases/create-pins/getPreviousPins';
import { postCreatePinsCase } from '@/app/application/use-cases/create-pins/postCreatePins';
import { putPinEditIdCase } from '@/app/application/use-cases/create-pins/putEditPinId';
import {
  CategoriesPin,
  PinCreate,
  PinEdit,
  PreviousPin,
} from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';

export interface CreatePinsStoreInterface {
  imagePreview: string | null;
  setImagePreview: (image: string | null) => void;
  postDataCreatePin: (data: PinCreate) => Promise<void>;
  dataCreatePin: PinCreate | PinEdit;
  updateStateCreatePin: (
    key: keyof PinCreate,
    value: string | boolean | undefined | File
  ) => void;
  categoriesPin: CategoriesPin[];
  getCategoriesPin: () => Promise<void>;
  updateStateTopicPin: (value: string[]) => void;
  previousPin: PreviousPin[];
  getPreviousPins: () => Promise<void>;
  deletePreviousPin: (id: string) => Promise<void>;
  getPinEditId: (id: string) => Promise<void>;
  putPinEditId: (id: string, data: PinEdit) => Promise<void>;
  shouldReload: boolean;
  setShouldReload: () => void;
}

export const createPinsStore: StateCreator<CreatePinsStoreInterface> = (
  set,
  get
) => ({
  dataCreatePin: {
    title: '',
    adult_content: false,
    alt_text: '',
    description: '',
    topics: [],
    url: '',
    body: undefined,
    topicValue: '',
    id: '',
  },

  categoriesPin: [
    {
      name: '',
      id: '',
      poster: '',
    },
  ],

  previousPin: [
    {
      title: '',
      id: '',
      body: '',
    },
  ],
  imagePreview: null,
  shouldReload: false,

  setImagePreview: (image: string | null) => {
    set({ imagePreview: image });

    if (image === null) {
      set((state) => ({
        dataCreatePin: {
          ...state.dataCreatePin,
          title: '',
          alt_text: '',
          description: '',
          url: '',
          adult_content: false,
          topics: '',
          topicValue: '',
          body: undefined,
        },
      }));
    }
  },

  setShouldReload: () => {
    set((state) => ({
      shouldReload: !state.shouldReload,
    }));
  },
  postDataCreatePin: async (data: PinCreate) => {
    await postCreatePinsCase(data);
  },
  updateStateCreatePin: (key, value) => {
    set((state) => ({
      dataCreatePin: {
        ...state.dataCreatePin,
        [key]: value,
      },
    }));
  },

  updateStateTopicPin: (updatedTopics: string[]) => {
    set((state) => ({
      dataCreatePin: {
        ...state.dataCreatePin,
        topics: updatedTopics,
      },
    }));
  },

  getCategoriesPin: async () => {
    const response = await getCategoriesPinsCase();

    set({
      categoriesPin: response,
    });
  },
  getPreviousPins: async () => {
    const response = await getPreviousPinsCase();
    set({
      previousPin: response,
    });
  },
  deletePreviousPin: async (id: string) => {
    console.log(id);
    await deletePreviousPinCase(id);
  },
  getPinEditId: async (id: string) => {
    const response = await getPinEditIdCase(id);
    if (response) {
      set({
        dataCreatePin: response,
      });
    }
  },
  putPinEditId: async (id: string, data: PinEdit) => {
    await putPinEditIdCase(id, data);
  },
});

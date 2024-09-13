import { getCategoriesPinsCase } from '@/app/application/use-cases/create-pins/getCategoriesPins';
import { postCreatePinsCase } from '@/app/application/use-cases/create-pins/postCreatePins';
import { CategoriesPin, PinCreate } from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';

export interface CreatePinsStoreInterface {
  postDataCreatePin: (data: PinCreate) => Promise<void>;
  dataCreatePin: PinCreate;
  updateStateCreatePin: (
    key: keyof PinCreate,
    value: string | boolean | undefined | File
  ) => void;
  categoriesPin: CategoriesPin[];
  getCategoriesPin: () => Promise<void>;
  updateStateTopicPin: (value: string[]) => void;
}

export const createPinsStore: StateCreator<CreatePinsStoreInterface> = (
  set,
  get
) => ({
  dataCreatePin: {
    title: '',
    adultContent: false,
    altText: '',
    description: '',
    topics: [],
    url: '',
    body: undefined,
    topicValue: '',
  },

  categoriesPin: [
    {
      name: '',
      id: '',
      poster: '',
    },
  ],

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
    console.log(get().dataCreatePin);
  },

  updateStateTopicPin: (updatedTopics: string[]) => {
    set((state) => ({
      dataCreatePin: {
        ...state.dataCreatePin,
        topics: updatedTopics,
      },
    }));
    console.log(get().dataCreatePin);
  },

  getCategoriesPin: async () => {
    const response = await getCategoriesPinsCase();
    console.log(response);
    set({
      categoriesPin: response,
    });
  },
});

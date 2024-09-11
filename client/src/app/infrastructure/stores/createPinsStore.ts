import { postCreatePinsCase } from '@/app/application/use-cases/create-pins/postCreatePins';
import { PinCreate } from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';

export interface CreatePinsStoreInterface {
  postDataCreatePin: (data: PinCreate) => Promise<void>;
  dataCreatePin: PinCreate;
  updateStateCreatePin: (
    key: keyof PinCreate,
    value: string | boolean | undefined | File
  ) => void;
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
    console.log(get().dataCreatePin);
  },
});

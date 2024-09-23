import { StateCreator } from 'zustand';
import { GetPinsInterface } from '@/app/domain/types/pins-structure';
import { getHomePinsCase } from '@/app/application/use-cases/home/getHomePins';

export interface homePinsStoreInterface {
  homePins: GetPinsInterface | [];
  getHomePins: (page: number, limit: number) => Promise<void>;
}

export const homePinsStore: StateCreator<homePinsStoreInterface> = (
  set,
  get
) => ({
  homePins: [],
  getHomePins: async (page: number, limit: number) => {
    const response = await getHomePinsCase(page, limit);

    set({
      homePins: response,
    });
  },
});

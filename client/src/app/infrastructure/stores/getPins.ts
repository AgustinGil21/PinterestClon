import { StateCreator } from 'zustand';
import {
  GetPinsInterface,
  PinInterface,
} from '@/app/domain/types/pins-structure';
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

    // Almacena los anteriores pins para no perder
    // información a la hora de llamar otra vez
    // al endpoint.
    const prevHomePins = get().homePins;

    // Solo se queda con aquellos valores que son
    // distintos a los anteriores, con el objetivo
    // de evitar duplicidad.
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
  },
});

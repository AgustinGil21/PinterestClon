import { CategoriesPin, PinCreate } from '@/app/domain/types/pins-structure';
import {
  serviceGetCategoriesPin,
  servicePostCreatePin,
} from '../services/service-pins';

export const postCreatePinAdapter = async (data: PinCreate): Promise<void> => {
  await servicePostCreatePin(data);
};

export const getCategoriesPinAdapter = async (): Promise<CategoriesPin[]> => {
  return await serviceGetCategoriesPin();
};

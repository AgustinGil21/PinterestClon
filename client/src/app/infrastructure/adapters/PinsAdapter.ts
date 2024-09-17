import {
  CategoriesPin,
  PinCreate,
  PreviousPin,
} from '@/app/domain/types/pins-structure';
import {
  serviceDeletePreviousPin,
  serviceGetCategoriesPin,
  serviceGetEditPinId,
  serviceGetPreviousPins,
  servicePostCreatePin,
} from '../services/service-pins';

export const postCreatePinAdapter = async (data: PinCreate): Promise<void> => {
  await servicePostCreatePin(data);
};

export const getCategoriesPinAdapter = async (): Promise<CategoriesPin[]> => {
  return await serviceGetCategoriesPin();
};

export const getPreviousPinsAdapter = async (): Promise<PreviousPin[]> => {
  return await serviceGetPreviousPins();
};

export const deletePreviousPinAdapter = async (id: string) => {
  return await serviceDeletePreviousPin(id);
};

export const getPinEditIdAdapter = async (
  id: string
): Promise<PinCreate | null> => {
  try {
    const response = await serviceGetEditPinId(id);
    if (response) {
      return {
        altText: response.altText,
        description: response.description,
        title: response.title,
        body: response.body,
        adultContent: response.adultContent,
        url: response.url,

        topics: response.topics,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

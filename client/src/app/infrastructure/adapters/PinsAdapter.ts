import {
  CategoriesPin,
  PinCreate,
  PinEdit,
  PreviousPin,
  PinCreateServerAdapter,
} from '@/app/domain/types/pins-structure';
import {
  serviceDeletePreviousPin,
  serviceGetCategoriesPin,
  serviceGetEditPinId,
  serviceGetPreviousPins,
  servicePostCreatePin,
  servicePutEditPinId,
} from '../services/service-pins';

export const postCreatePinAdapter = async (data: PinCreate): Promise<void> => {
  const newData: PinCreateServerAdapter = {
    title: data.title,
    altText: data.alt_text,
    adultContent: data.adult_content,
    description: data.description,
    url: data.url,
    body: data.body,
    topics: data.topics,
  };

  return await servicePostCreatePin(newData);
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
): Promise<PinEdit | null> => {
  try {
    const response = await serviceGetEditPinId(id);

    if (response) {
      return {
        alt_text: response.alt_text,
        description: response.description || '',
        title: response.title || '',
        body: response.body,
        adult_content: response.adult_content,
        url: response.url || '',
        id: response.id,
        topics: response.topics || [],
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const putPinEditIdAdapter = async (id: string, data: PinEdit) => {
  console.log(data);
  try {
    await servicePutEditPinId(id, data);
  } catch (error) {
    console.log(error);
  }
};

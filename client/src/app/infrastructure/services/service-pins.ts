import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import { CategoriesPin, PinCreate } from '@/app/domain/types/pins-structure';
import { categoriesSchema } from '../schemas/validation-service-api';

export const servicePostCreatePin = async (data: PinCreate): Promise<void> => {
  console.log(data);
  try {
    const response = await axios.post(`${URLDOMAIN}/pins/create`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.status ? response.data : null;
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetCategoriesPin = async (): Promise<CategoriesPin[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/categories`, {
      withCredentials: true,
    });
    const result = categoriesSchema.safeParse(response.data);
    return result.success ? result.data.categories : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  CategoriesPin,
  PinCreate,
  PreviousPin,
} from '@/app/domain/types/pins-structure';
import {
  ArrayPreviousPinSchema,
  CategoriesSchema,
} from '../schemas/validation-service-api';

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
    const result = CategoriesSchema.safeParse(response.data);
    return result.success ? result.data.categories : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// export const serviceGetPreviousPins = async (): Promise<PreviousPin[]> => {
//   try {
//     const response = await axios.get(`${URLDOMAIN}/previous-pins`, {
//       withCredentials: true,
//     });
//     const result = ArrayPreviousPinSchema.safeParse(response.data);
//     return result.success ? result.data.Array : [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

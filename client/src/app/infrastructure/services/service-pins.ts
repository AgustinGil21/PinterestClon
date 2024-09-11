import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import { PinCreate } from '@/app/domain/types/pins-structure';

export const servicePostCreatePin = async (data: PinCreate): Promise<void> => {
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

export const serviceGetCategoriesPin = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/categories`, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

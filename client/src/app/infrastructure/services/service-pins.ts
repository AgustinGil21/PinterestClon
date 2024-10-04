import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  CategoriesPin,
  PinCreate,
  PinEdit,
  PreviousPin,
  PinCreateServerAdapter,
  GetPinsInterface,
  PinInterface,
  SuggestionsInterface,
} from '@/app/domain/types/pins-structure';
import {
  ArrayPreviousPinSchema,
  ArraySuggestionSchema,
  CategoriesSchema,
  getPinsSchema,
  PinEditIdSchema,
} from '../schemas/validation-service-api';

export const servicePostCreatePin = async (
  data: PinCreateServerAdapter
): Promise<void> => {
  console.log(data);
  try {
    const response = await axios.post(`${URLDOMAIN}/pins/create`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);

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

export const serviceGetPreviousPins = async (): Promise<PreviousPin[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/previous-pins`, {
      withCredentials: true,
    });
    console.log(response);

    const result = ArrayPreviousPinSchema.safeParse(response.data.pins.data);
    return result.success ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const serviceDeletePreviousPin = async (id: string) => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/pins/${id}`, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serviceGetEditPinId = async (
  id: string
): Promise<PinEdit | null> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/previous-pins/${id}`, {
      withCredentials: true,
    });
    console.log(response);

    const result = PinEditIdSchema.safeParse(response.data.pin);
    console.log(result);

    return result.success ? result.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePutEditPinId = async (id: string, data: PinEdit) => {
  try {
    const response = await axios.put(`${URLDOMAIN}/pins/${id}`, data, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serviceGetHomePins = async (
  page: number,
  limit: number
): Promise<GetPinsInterface | []> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = getPinsSchema.safeParse(response.data);

    return response.status === 200 ? response.data.pins : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const serviceGetSearchPin = async (
  value: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/search?value=${value}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);

    const result = getPinsSchema.safeParse(response.data);

    console.log(result);

    return result.success ? result.data.pins : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const serviceGetSuggestions = async (): Promise<
  SuggestionsInterface[] | []
> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/search/suggestions`);

    console.log(response.data);

    const result = ArraySuggestionSchema.safeParse(response.data.suggestions);

    console.log(result);

    return result.success ? result.data.suggestions : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  SuggestionsInterface,
  CategoriesPin,
  PinCreate,
  PinEdit,
  PreviousPin,
  PinCreateServerAdapter,
  GetPinsInterface,
  PinInterface,
  PinViewInterface,
  PostCommentInterface,
  CommentsResponseInterface,
  PinSimilarInterface,
} from '@/app/domain/types/pins-structure';
import {
  ArrayPreviousPinSchema,
  ArraySuggestionSchema,
  CategoriesSchema,
  CommentsResponseSchema,
  getPinsSchema,
  PinEditIdSchema,
  PinSchema,
  PinSimilarSchema,
  PinViewSchema,
} from '../schemas/validation-service-api';

export const servicePostCreatePin = async (data: PinCreateServerAdapter) => {
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

export const serviceGetPreviousPins = async (): Promise<PreviousPin[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/previous-pins`, {
      withCredentials: true,
    });

    const result = ArrayPreviousPinSchema.safeParse(response.data.pins.data);

    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
};

export const serviceDeletePreviousPin = async (id: string) => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/pins/${id}`, {
      withCredentials: true,
    });
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

    const result = PinEditIdSchema.safeParse(response.data.pin);

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

    console.log(response.data);
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
) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/search?value=${value}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    console.log(response);

    const result = getPinsSchema.safeParse(response.data);

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

    const result = ArraySuggestionSchema.safeParse(response.data.suggestions);

    return result.success ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const serviceGetPinSearchCategories = async (
  category: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/search-by-category?category=${category}&page=${page}&limit=${limit} `,
      {
        withCredentials: true,
      }
    );

    const result = getPinsSchema.safeParse(response.data);

    return result.success ? result.data.pins : [];
  } catch (error) {
    console.log('Error en la solicitud o en el parseo:', error);
    return [];
  }
};

export const serviceGetPinView = async (id: string) => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/${id}`, {
      withCredentials: true,
    });

    const result = PinViewSchema.safeParse(response.data.pin);

    return result.success ? result.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePostLikeOrUnlikePin = async (id: string) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/pins/like/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.status ? response.data : null;
  } catch (error) {
    console.log(error);
  }
};

export const servicePostCommentsCreate = async (data: PostCommentInterface) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/comments/create`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetPinComments = async (
  id: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/comments/pin-comments/${id}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = CommentsResponseSchema.safeParse(response.data);

    return result.success ? result.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const servicePostToggleLikeComment = async (id: string) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/comments/toggle-like`,
      { id },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetSimilarPins = async (
  id: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/similar-pins/${id}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = PinSimilarSchema.array().safeParse(
      response.data.response.pins
    );

    return result.success ? result.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const servicePostSavePin = async (data: string) => {
  try {
    const response = await axios.post(
      `${URLDOMAIN}/users/save-pin`,
      { id: data },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const servicePostDeleteComment = async (id: string) => {
  try {
    const response = await axios.delete(
      `${URLDOMAIN}/comments/${id}`,

      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

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

export const servicePostCreatePin = async (
  data: PinCreateServerAdapter
): Promise<void> => {
  try {
    const response = await axios.post(`${URLDOMAIN}/pins/create`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating pin: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the pin.');
    }
  }
};

export const serviceGetCategoriesPin = async (): Promise<CategoriesPin[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/categories`, {
      withCredentials: true,
    });

    const result = CategoriesSchema.safeParse(response.data);

    if (!result.success) {
      throw new Error('Invalid categories data format');
    }

    return result.data.categories;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching categories.');
    }
  }
};

export const serviceGetPreviousPins = async (): Promise<PreviousPin[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/previous-pins`, {
      withCredentials: true,
    });

    const result = ArrayPreviousPinSchema.safeParse(response.data.pins.data);

    if (!result.success) {
      throw new Error('Invalid previous pins data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching previous pins: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching previous pins.'
      );
    }
  }
};

export const serviceDeletePreviousPin = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${URLDOMAIN}/pins/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting pin: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the pin.');
    }
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

    if (!result.success) {
      throw new Error('Invalid pin data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching pin for edit: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching the pin for edit.'
      );
    }
  }
};

export const servicePutEditPinId = async (
  id: string,
  data: PinEdit
): Promise<void> => {
  try {
    await axios.put(`${URLDOMAIN}/pins/${id}`, data, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating pin: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating the pin.');
    }
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

    if (!result.success) {
      throw new Error('Invalid home pins data format');
    }

    return response.data.pins;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching home pins: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching home pins.');
    }
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

    const result = getPinsSchema.safeParse(response.data);

    if (!result.success) {
      throw new Error('Invalid search pins data format');
    }

    return result.data.pins;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching search pins: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching search pins.');
    }
  }
};

export const serviceGetSuggestions = async (): Promise<
  SuggestionsInterface[] | []
> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/search/suggestions`);

    const result = ArraySuggestionSchema.safeParse(response.data.suggestions);

    if (!result.success) {
      throw new Error('Invalid suggestions data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching suggestions: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching suggestions.');
    }
  }
};

export const serviceGetPinSearchCategories = async (
  category: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/pins/search-by-category?category=${category}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = getPinsSchema.safeParse(response.data);

    if (!result.success) {
      throw new Error('Invalid category pins data format');
    }

    return result.data.pins;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching category pins: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching category pins.'
      );
    }
  }
};

export const serviceGetPinView = async (
  id: string
): Promise<PinViewInterface | null> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/pins/${id}`, {
      withCredentials: true,
    });

    const result = PinViewSchema.safeParse(response.data.pin);

    if (!result.success) {
      throw new Error('Invalid pin view data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching pin view: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching the pin view.');
    }
  }
};

export const servicePostLikeOrUnlikePin = async (id: string): Promise<void> => {
  try {
    await axios.post(
      `${URLDOMAIN}/pins/like/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error liking/unliking pin: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while liking/unliking the pin.'
      );
    }
  }
};

export const servicePostCommentsCreate = async (
  data: PostCommentInterface
): Promise<void> => {
  try {
    await axios.post(`${URLDOMAIN}/comments/create`, data, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating comment: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the comment.');
    }
  }
};

export const serviceGetPinComments = async (
  id: string,
  page: number,
  limit: number
): Promise<CommentsResponseInterface | null> => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/comments/pin-comments/${id}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = CommentsResponseSchema.safeParse(response.data);

    if (!result.success) {
      throw new Error('Invalid comments data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching comments.');
    }
  }
};

export const servicePostToggleLikeComment = async (
  id: string
): Promise<void> => {
  try {
    await axios.post(
      `${URLDOMAIN}/comments/toggle-like`,
      { id },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error toggling like on comment: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while toggling like on the comment.'
      );
    }
  }
};

export const serviceGetSimilarPins = async (
  id: string,
  page: number,
  limit: number
): Promise<PinSimilarInterface[] | []> => {
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

    if (!result.success) {
      throw new Error('Invalid similar pins data format');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching similar pins: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching similar pins.');
    }
  }
};

export const servicePostSavePin = async (data: string): Promise<void> => {
  try {
    await axios.post(
      `${URLDOMAIN}/users/save-pin`,
      { id: data },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving pin: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while saving the pin.');
    }
  }
};

export const servicePostDeleteComment = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${URLDOMAIN}/comments/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the comment.');
    }
  }
};

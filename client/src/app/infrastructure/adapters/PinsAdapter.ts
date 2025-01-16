import {
  CategoriesPin,
  PinCreate,
  PinEdit,
  PreviousPin,
  PinCreateServerAdapter,
  GetPinsInterface,
  SuggestionsInterface,
  PinInterface,
  PinViewInterface,
  PostCommentInterface,
  CommentsResponseInterface,
  CommentInterface,
  PinSimilarInterface,
} from '@/app/domain/types/pins-structure';
import {
  serviceDeletePreviousPin,
  serviceGetCategoriesPin,
  serviceGetEditPinId,
  serviceGetHomePins,
  serviceGetPinComments,
  serviceGetPinSearchCategories,
  serviceGetPinView,
  serviceGetPreviousPins,
  serviceGetSearchPin,
  serviceGetSimilarPins,
  serviceGetSuggestions,
  servicePostCommentsCreate,
  servicePostCreatePin,
  servicePostDeleteComment,
  servicePostLikeOrUnlikePin,
  servicePostSavePin,
  servicePostToggleLikeComment,
  servicePutEditPinId,
} from '../services/service-pins';
import { CommentsResponseSchema } from '../schemas/validation-service-api';

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

export const getHomePinsAdapter = async (
  page: number,
  limit: number
): Promise<GetPinsInterface | []> => {
  return await serviceGetHomePins(page, limit);
};

export const getSearchPinsAdapter = async (
  value: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return await serviceGetSearchPin(value, page, limit);
};

export const getSuggestionsAdapter = async (): Promise<
  SuggestionsInterface[] | []
> => {
  return await serviceGetSuggestions();
};

export const getPinSearchCategoriesAdapter = async (
  category: string,
  page: number,
  limit: number
): Promise<PinInterface[] | []> => {
  return await serviceGetPinSearchCategories(category, page, limit);
};

export const getPinViewAdapter = async (
  id: string
): Promise<PinViewInterface | null> => {
  try {
    const response = await serviceGetPinView(id);

    if (response) {
      return {
        id: response.id,
        user_id: response.user_id,
        title: response.title || '',
        description: response.description || '',
        topics: response.topics || [],
        body: response.body,
        already_liked: response.already_liked,
        name: response.name,
        surname: response.surname,
        alt_text: response.alt_text,
        likes: response.likes,
        comments: response.comments,
        avatar: response.avatar,
        username: response.username,
        avatar_background: response.avatar_background,
        avatar_letter_color: response.avatar_letter_color,
        avatar_letter: response.avatar_letter,
        verified: response.verified,
        its_you: response.its_you,
        follows_you: response.follows_you,
        following: response.following,
        followers: response.followers,
      };
    }

    console.log(response);

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postLikeOrUnlikePinAdapter = async (id: string) => {
  return await servicePostLikeOrUnlikePin(id);
};

export const postCommentCreateAdapter = async (data: PostCommentInterface) => {
  return await servicePostCommentsCreate(data);
};

export const getPinCommentsAdapter = async (
  id: string,
  page: number,
  limit: number
): Promise<CommentsResponseInterface | null> => {
  try {
    const response = await serviceGetPinComments(id, page, limit);

    if (response) {
      const adaptedComments = response.comments.map(
        (comment: CommentInterface) => ({
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          likes_count: comment.likes_count,
          already_liked: comment.already_liked,
          its_yours: comment.its_yours,
          username: comment.username,
          avatar: comment.avatar || undefined,
          avatar_letter: comment.avatar_letter,
          avatar_letter_color: comment.avatar_letter_color,
          avatar_background: comment.avatar_background,
          user_id: comment.user_id,
        })
      );

      return {
        comments: adaptedComments,
      };
    }

    console.log(response);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postToggleLikeCommentAdapter = async (id: string) => {
  return await servicePostToggleLikeComment(id);
};

export const getSimilarPinsAdapter = async (
  id: string,
  page: number,
  limit: number
): Promise<PinSimilarInterface[] | []> => {
  return await serviceGetSimilarPins(id, page, limit);
};

export const postSavePinAdapter = async (data: string) => {
  return await servicePostSavePin(data);
};

export const postDeleteCommentAdapter = async (id: string) => {
  return await servicePostDeleteComment(id);
};

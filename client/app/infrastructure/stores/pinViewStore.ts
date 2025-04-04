import {
  CommentsResponseInterface,
  IDataOpenBoardModal,
  PinInterface,
  PinSimilarInterface,
  PinViewInterface,
  PostCommentInterface,
} from '../../domain/types/pins-structure';
import { StateCreator } from 'zustand';
import { getPinViewAdapter } from '../adapters/PinsAdapter';
import { postLikeOrUnlikeCase } from '../../application/use-cases/view-pins/postLikeOrUnlike';
import { postCommentCreateCase } from '../../application/use-cases/view-pins/postCommentsCreate';
import { getPinCommentsCase } from '../../application/use-cases/view-pins/getComments';
import { postToggleLikeCommentCase } from '../../application/use-cases/view-pins/postToggleLikeComment';
import { getSimilarPinsCase } from '../../application/use-cases/view-pins/getSimilarPins';
import { getUniqueItems } from '../../libs/getUniqueItems';
import { postSavePinCase } from '../../application/use-cases/view-pins/postSavePin';
import { postDeleteCommentCase } from '../../application/use-cases/view-pins/postDeleteComment';

export interface PinViewStoreInterface {
  pinData: PinViewInterface;
  getPinView: (id: string) => Promise<void>;
  postLikeOrUnlike: (id: string) => Promise<void>;
  postCreateComment: (
    data: PostCommentInterface,
    uuid: string
  ) => Promise<void>;
  getPinComments: (id: string, page: number, limit: number) => Promise<void>;
  commentsState: CommentsResponseInterface;
  resetComments: () => void;
  updateFrontComment: (comment: any) => void;
  postToggleLikeComment: (id: string) => Promise<void>;
  similarPins: PinSimilarInterface[];
  getSimilarPins: (id: string, page: number, limit: number) => Promise<void>;
  dataOpenBoardModal: IDataOpenBoardModal;
  updateDataOpenBoardModal: (pinId: string, pinBody?: string) => void;
  postSavePin: (data: string) => Promise<void>;
  postDeleteComment: (id: string) => Promise<void>;
  updateStateCommentsThenDelete: (commentsUpdatedThenDelete: any) => void;
}

export const createPinViewStore: StateCreator<PinViewStoreInterface> = (
  set,
  get
) => ({
  dataOpenBoardModal: {
    pinId: '',
    pinBody: '',
  },

  pinData: {
    id: '',
    user_id: '',
    title: '',
    description: '',
    topics: [],
    body: '',
    alt_text: '',
    likes: '',
    already_liked: false,
    name: '',
    surname: '',
    comments: '',
    username: '',
    avatar_background: '',
    avatar_letter_color: '',
    avatar_letter: '',
    verified: false,
    its_you: false,
    follows_you: false,
    following: false,
    followers: '',
    saved_in_profile: false,
  },

  commentsState: {
    comments: [
      {
        id: '',
        content: '',
        created_at: '',
        likes_count: '',
        already_liked: false,
        its_yours: false,
        username: '',
        avatar: undefined,
        avatar_letter: '',
        avatar_letter_color: '#000000',
        avatar_background: '#FFFFFF',
        user_id: '',
      },
    ],
  },

  similarPins: [],

  getPinView: async (id: string) => {
    const response = await getPinViewAdapter(id);

    if (response) {
      set({
        pinData: response,
      });
    }
  },

  postLikeOrUnlike: async (id: string) => {
    await postLikeOrUnlikeCase(id);
  },

  postCreateComment: async (data: PostCommentInterface, uuid: string) => {
    const response = await postCommentCreateCase(data);

    const updatedComments = get().commentsState.comments.map((comment) =>
      comment.id === uuid ? { ...comment, id: response.comment.id } : comment
    );

    set((state) => ({
      commentsState: {
        ...state.commentsState,
        comments: updatedComments,
      },
    }));
  },
  getPinComments: async (id: string, page: number, limit: number) => {
    const response = await getPinCommentsCase(id, page, limit);

    if (response && response.comments.length > 0) {
      set((state) => {
        const existingCommentIds = new Set(
          state.commentsState.comments.map((c) => c.id)
        );

        const newComments = response.comments.filter(
          (comment) => !existingCommentIds.has(comment.id)
        );

        return {
          commentsState: {
            ...state.commentsState,
            comments: [...state.commentsState.comments, ...newComments],
          },
        };
      });
    }
  },

  resetComments: () => {
    set({
      commentsState: {
        comments: [],
      },
    });
  },

  updateFrontComment: (comment: any) => {
    set((state) => ({
      commentsState: {
        ...state.commentsState,
        comments: [comment, ...state.commentsState.comments],
      },
    }));
  },

  updateStateCommentsThenDelete: (commentsUpdatedThenDelete: any) => {
    set((state) => ({
      commentsState: {
        ...state.commentsState,
        comments: commentsUpdatedThenDelete,
      },
    }));
  },

  postToggleLikeComment: async (id: string) => {
    const comments = get().commentsState.comments;

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const alreadyLiked = comment.already_liked;
        const likesCount = Number(comment.likes_count);

        return {
          ...comment,
          already_liked: !alreadyLiked,
          likes_count: (alreadyLiked
            ? likesCount - 1
            : likesCount + 1
          ).toString(),
        };
      }
      return comment;
    });

    set((state) => ({
      commentsState: {
        ...state.commentsState,
        comments: updatedComments,
      },
    }));

    await postToggleLikeCommentCase(id);
  },

  getSimilarPins: async (id: string, page: number, limit: number) => {
    const response = await getSimilarPinsCase(id, page, limit);

    if (response) {
      const { similarPins } = get();

      const newPins = getUniqueItems(response, similarPins, 'pin_id');

      set({
        similarPins: [...similarPins, ...newPins],
      });
    }
  },

  updateDataOpenBoardModal: (pinId: string, pinBody?: string) => {
    set((state) => ({
      dataOpenBoardModal: {
        ...state.dataOpenBoardModal,
        pinBody: pinBody,
        pinId: pinId,
      },
    }));
  },

  postSavePin: async (data: string) => {
    await postSavePinCase(data);
  },

  postDeleteComment: async (id: string) => {
    await postDeleteCommentCase(id);
  },
});

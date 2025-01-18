import {
  CommentsResponseInterface,
  DataOpenBoardModalInteface,
  PinInterface,
  PinSimilarInterface,
  PinViewInterface,
  PostCommentInterface,
} from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';
import { getPinViewAdapter } from '../adapters/PinsAdapter';
import { postLikeOrUnlikeCase } from '@/app/application/use-cases/view-pins/postLikeOrUnlike';
import { postCommentCreateCase } from '@/app/application/use-cases/view-pins/postCommentsCreate';
import { getPinCommentsCase } from '@/app/application/use-cases/view-pins/getComments';
import { postToggleLikeCommentCase } from '@/app/application/use-cases/view-pins/postToggleLikeComment';
import { getSimilarPinsCase } from '@/app/application/use-cases/view-pins/getSimilarPins';
import { getUniqueItems } from '@/app/libs/getUniqueItems';
import { postSavePinCase } from '@/app/application/use-cases/view-pins/postSavePin';
import { postDeleteCommentCase } from '@/app/application/use-cases/view-pins/postDeleteComment';

export interface PinViewStoreInterface {
  pinData: PinViewInterface;
  getPinView: (id: string) => Promise<void>;
  postLikeOrUnlike: (id: string) => Promise<void>;
  postCreateComment: (data: PostCommentInterface) => Promise<void>;
  getPinComments: (id: string, page: number, limit: number) => Promise<void>;
  commentsState: CommentsResponseInterface;
  resetComments: () => void;
  updateFrontComment: (comment: any) => void;
  postToggleLikeComment: (id: string) => Promise<void>;
  similarPins: PinSimilarInterface[];
  getSimilarPins: (id: string, page: number, limit: number) => Promise<void>;
  dataOpenBoardModal: DataOpenBoardModalInteface;
  updateDataOpenBoardModal: (pinId: string, pinBody: string) => void;
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

    console.log(response);
    if (response) {
      set({
        pinData: response,
      });
    }
  },

  postLikeOrUnlike: async (id: string) => {
    await postLikeOrUnlikeCase(id);
  },

  postCreateComment: async (data: PostCommentInterface) => {
    await postCommentCreateCase(data);
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

  updateDataOpenBoardModal: (pinId: string, pinBody: string) => {
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

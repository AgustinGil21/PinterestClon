import {
  CommentsResponseInterface,
  PinViewInterface,
  PostCommentInterface,
} from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';
import { getPinViewAdapter } from '../adapters/PinsAdapter';
import { postLikeOrUnlikeCase } from '@/app/application/use-cases/view-pins/postLikeOrUnlike';
import { postCommentCreateCase } from '@/app/application/use-cases/view-pins/postCommentsCreate';
import { getPinCommentsCase } from '@/app/application/use-cases/view-pins/getComments';
import { cp } from 'fs';

export interface PinViewStoreInterface {
  pinData: PinViewInterface;
  getPinView: (id: string) => Promise<void>;
  postLikeOrUnlike: (id: string) => Promise<void>;
  postCreateComment: (data: PostCommentInterface) => Promise<void>;
  getPinComments: (id: string, page: number, limit: number) => Promise<void>;
  commentsState: CommentsResponseInterface;
  resetComments: () => void;
  updateFrontComment: (comment: any) => void;
}

export const createPinViewStore: StateCreator<PinViewStoreInterface> = (
  set,
  get
) => ({
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
});

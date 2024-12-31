import {
  PinViewInterface,
  PostCommentInterface,
} from '@/app/domain/types/pins-structure';
import { StateCreator } from 'zustand';
import { getPinViewAdapter } from '../adapters/PinsAdapter';
import { postLikeOrUnlikeCase } from '@/app/application/use-cases/view-pins/postLikeOrUnlike';
import { postCommentCreateCase } from '@/app/application/use-cases/view-pins/postCommentsCreate';

export interface PinViewStoreInterface {
  pinData: PinViewInterface;
  getPinView: (id: string) => Promise<void>;
  postLikeOrUnlike: (id: string) => Promise<void>;
  postCreateComment: (data: PostCommentInterface) => Promise<void>;
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
});

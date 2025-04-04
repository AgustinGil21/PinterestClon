export interface PinCreate {
  title?: string;
  adult_content?: boolean;
  alt_text: string | undefined;
  description?: string;
  topics?: string | string[] | any;
  url?: string;
  body?: File | string;
  topicValue?: string;
  id?: string;
}

export interface PinEdit {
  title?: string;
  adult_content?: boolean;
  alt_text?: string | undefined;
  description?: string;
  topics?: string[];
  url?: string;
  body: string;
  topicValue?: string;
  id: string;
}

export interface PinCreateServerAdapter {
  title?: string;
  altText?: string;
  adultContent?: boolean;
  description?: string;
  url?: string;
  body: string | File | undefined;
  topics?: string[] | string;
}

export interface CategoriesPin {
  name?: string;
  id: string;
  poster?: string;
}

export interface PreviousPin {
  body: string;
  title?: string;
  id: string;
  created_at: string;
}

export interface PinId {
  pin_id: string;
  body: string;
  title: string;
  description: string;
  url?: string;
  created_at: string;
  topics?: string[];
  alt_text?: string;
  likes: string;
  name: string | null;
  surname: string | null;
  avatar: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
  user_id: string;
  followers: string;
}

export interface PinInterface {
  username?: string;
  body: string;
  pin_id?: string;
  alt_text?: string;
  adult_content?: boolean;
  avatar_background?: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  title?: string;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
  url?: string | null;
  className?: string;
  saved_in_profile: boolean;
  board?: IPinBoard;
}

interface ISavedBoard {
  id: string;
  name: string;
}

export interface IButtonsPinSaved {
  alreadySaved: boolean;
  board?: ISavedBoard;
  savedInProfile: boolean;
}

export interface GetPinsInterface {
  pins: PinInterface[];
  results?: number;
}

export interface SuggestionsInterface {
  pin_title?: string;
  pin_alt_text?: string;
  user_name?: string;
  user_surname?: string;
  user_username?: string;
  user_avatar?: string;
  user_verified?: boolean;
  user_avatar_background?: string;
  user_avatar_letter?: string;
  user_avatar_letter_color?: string;
}

export interface PinViewInterface {
  id: string;
  user_id?: string;
  title?: string;
  description?: string;
  topics?: string[];
  body: string;
  name?: string;
  surname?: string;
  alt_text: string;
  likes: string;
  comments?: string;
  username: string;
  avatar?: string;
  avatar_background?: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  verified?: boolean;
  already_liked?: boolean;
  its_you?: boolean;
  follows_you?: boolean;
  following?: boolean;
  followers?: string;
  board?: IPinBoard | null;
  saved_in_profile: boolean;
}

export interface PostCommentInterface {
  id: string;
  content: string;
}

export interface CommentInterface {
  id: string;
  content: string;
  created_at: string;
  likes_count?: string;
  already_liked?: boolean;
  its_yours?: boolean;
  username: string;
  avatar?: string;
  avatar_letter?: string;
  avatar_letter_color?: string;
  avatar_background?: string;
  user_id?: string;
}

export interface CommentsResponseInterface {
  comments: CommentInterface[];
}

export interface PinSimilarInterface {
  username: string;
  body: string;
  pin_id: string;
  alt_text: string;
  adult_content?: boolean;
  avatar_background?: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  title?: string;
  name?: string;
  surname?: string;
  avatar?: string;
  url?: string;
  user_id: string;
  similarity_score: number;
  saved_in_profile: boolean;
  its_yours?: boolean;
  board?: IPinBoard;
}

export interface IDataOpenBoardModal {
  pinId: string;
  pinBody?: string;
}

export interface IPinBoard {
  id: string;
  name: string;
}

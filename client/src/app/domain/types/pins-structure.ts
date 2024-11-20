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
  pin_id: string;
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

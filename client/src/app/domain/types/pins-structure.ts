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
  name: string;
  id: string;
  poster: string;
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
  body: string;
  title?: string;
  url?: string;
  adult_content: boolean;
  pin_id: string;
  alt_text: string;
  name?: string | null;
  surname?: string | null;
  username: string;
  avatar?: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
}

export interface GetPinsInterface {
  pins: PinInterface[];
  results?: number;
}

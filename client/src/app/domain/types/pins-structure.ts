export interface PinCreate {
  title: string;
  adultContent: boolean;
  altText: string;
  description?: string;
  topics: string[];
  url: string;
  body: File | undefined;
  topicValue?: string;
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

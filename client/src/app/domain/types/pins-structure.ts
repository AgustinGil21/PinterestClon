export interface PinCreate {
  title: string;
  adultContent: boolean;
  altText: string;
  description: string;
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
  title: string;
  id: string;
}

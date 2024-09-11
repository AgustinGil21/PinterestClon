export interface PinCreate {
  title: string;
  adultContent: boolean;
  altText: string;
  description: string;
  topics: string[];
  url: string;
  body: File | undefined;
}

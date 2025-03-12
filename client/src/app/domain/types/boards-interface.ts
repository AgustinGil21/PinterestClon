import { PinInterface } from './pins-structure';

type Collage = string[];
export type CustomDate = Date | string;

export interface IPaging {
  page: number;
  limit: number;
}

export interface ICreateBoard {
  name: string;
  description?: string;
  pinID?: string;
}

export interface IEditBoard {
  id?: string;
  name: string;
  description?: string;
  cover?: string;
  collage?: string;
}

export interface IGetUserBoards extends IPaging {
  username: string;
}

export interface IBoardPinsInteractions {
  pinId: string;
  boardId: string;
}

export interface ISearchByID extends IPaging {
  id: string;
}

export interface ISearchByValue extends IPaging {
  value: string;
  page: number;
  limit: number;
}

export interface IBoardsList {
  name: string;
  id: string;
  cover?: string;
  collage?: string;
}

export interface IUserData {
  id: string;
  name?: string;
  surname?: string;
  username: string;
  avatar?: string;
  avatar_letter_color: string;
  avatar_letter: string;
  avatar_background: string;
}

export interface IPin {
  body: string;
  title?: string;
  url?: string;
  adult_content: boolean;
  pin_id: string;
  alt_text: string;
  name?: string;
  surname?: string;
  username: string;
  avatar?: string;
  avatar_letter_color: string;
  avatar_letter: string;
  avatar_background: string;
}

export interface IBoard {
  id: string;
  name: string;
  description?: string;
  its_yours?: boolean;
  following?: boolean;
  pins_count: string;
  user: IUserData;
  pins: PinInterface[];
}

export interface IBoardPreview {
  name: string;
  created_at: CustomDate;
  pins_count: string;
  cover?: string;
  collage?: (string | undefined)[];
  id: string;
  surname?: string;
  username: string;
  avatar?: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  avatar_background?: string;
  its_yours?: boolean;
}

export interface IUserBoard {
  name: string;
  id: string;
  cover?: string;
  collage?: Collage;
  created_at: CustomDate;
  pins_count: string;
  its_yours?: boolean;
}

export interface ICover {
  id: string;
  body: string;
}

export interface ILastBoard {
  name: string;
  id: string;
}

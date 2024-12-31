type Collage = string[];
type CustomDate = Date | number | string;

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
  id: string;
  name: string;
  description?: string;
  cover?: string;
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
}

export interface IBoardsList {
  name: string;
  id: string;
  cover?: string;
  collage?: Collage;
}

interface IUserData {
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
  pins: IPin[];
}

export interface IBoardPreview {
  id: string;
  name: string;
  created_at: CustomDate;
  pins_count: string;
  cover?: string;
  collage?: Collage;
  user: IUserData;
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

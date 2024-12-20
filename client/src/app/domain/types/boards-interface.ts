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

export interface IGetUserBoards {
  username: string;
  page: number;
  limit: number;
}

export interface IGetBoard {
  id: string;
  page: number;
  limit: number;
}

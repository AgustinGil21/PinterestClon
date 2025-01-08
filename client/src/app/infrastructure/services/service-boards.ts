import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  BoardsListSchema,
  GetBoardSchema,
  GetPossibleCoversSchema,
  HomeBoardsSchema,
  LastBoardSchema,
  SearchBoardsSchema,
  UserBoardsSchema,
} from '../schemas/validation-service-api';
import {
  IBoardPinsInteractions,
  ICreateBoard,
  IEditBoard,
  IGetUserBoards,
  IPaging,
  ISearchByID,
  ISearchByValue,
} from '@/app/domain/types/boards-interface';

export const serviceGetLastBoardName = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/boards/last-board`, {
      withCredentials: true,
    });

    console.log(response.data.board);

    const result = LastBoardSchema.safeParse({ board: response.data?.board });

    console.log(result);

    return result.success ? result.data.board : null;
  } catch (err) {
    return null;
  }
};

export const serviceCreateBoard = async (data: ICreateBoard) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/create`, data, {
      withCredentials: true,
    });

    return response.status ? response.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceEditBoard = async (data: IEditBoard) => {
  try {
    const response = await axios.put(`${URLDOMAIN}/boards/edit`, data, {
      withCredentials: true,
    });

    console.log(response);

    return response.status ? response.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceDeleteBoard = async (id: string) => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/boards/${id}`, {
      withCredentials: true,
    });

    console.log(response);
  } catch (err) {
    return null;
  }
};

export const serviceGetBoardsList = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/boards/boards-list`, {
      withCredentials: true,
    });

    const result = BoardsListSchema.safeParse(response.data.boards);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceGetUserBoards = async ({
  page,
  limit,
  username,
}: IGetUserBoards) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/${username}?page=${page}&limit=${limit}`
    );

    const result = UserBoardsSchema.safeParse(response.data.boards);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceGetSingleBoard = async ({
  id,
  page,
  limit,
}: ISearchByID) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/${id}?page=${page}&limit=${limit}`
    );

    const result = GetBoardSchema.safeParse(response.data.board);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceAddPinToBoard = async (data: IBoardPinsInteractions) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/add-pin`, data, {
      withCredentials: true,
    });

    console.log(response);
  } catch (err) {
    return null;
  }
};

export const serviceRemovePinFromBoard = async (
  data: IBoardPinsInteractions
) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/remove-pin`, data, {
      withCredentials: true,
    });

    console.log(response);
  } catch (err) {
    return null;
  }
};

export const serviceGetPossibleCovers = async ({
  id,
  page,
  limit,
}: ISearchByID) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/covers/${id}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = GetPossibleCoversSchema.safeParse(response.data);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceSearchBoards = async ({
  value,
  limit,
  page,
}: ISearchByValue) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/search?value=${value}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = SearchBoardsSchema.safeParse(response.data);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceGetHomeBoards = async ({ page, limit }: IPaging) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = HomeBoardsSchema.safeParse(response.data);

    console.log(response);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

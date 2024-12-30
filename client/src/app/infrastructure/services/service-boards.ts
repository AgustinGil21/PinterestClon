import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  BoardsListSchema,
  GetBoardSchema,
  LastBoardSchema,
  UserBoardsSchema,
} from '../schemas/validation-service-api';
import {
  ICreateBoard,
  IEditBoard,
  IGetBoard,
  IGetUserBoards,
} from '@/app/domain/types/boards-interface';

export const serviceGetLastBoardName = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/boards/last-board`, {
      withCredentials: true,
    });

    const result = LastBoardSchema.safeParse(response.data.board);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceCreateBoard = async (data: ICreateBoard) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards`, data, {
      withCredentials: true,
    });

    // const result =
  } catch (err) {
    return null;
  }
};

export const serviceEditBoard = async (data: IEditBoard) => {
  try {
    const response = await axios.put(`${URLDOMAIN}/boards/edit`, data, {
      withCredentials: true,
    });
  } catch (err) {
    return null;
  }
};

export const serviceDeleteBoard = async (id: string) => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/boards/${id}`, {
      withCredentials: true,
    });
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

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

export const serviceGetSingleBoard = async ({ id, page, limit }: IGetBoard) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/${id}?page=${page}&limit=${limit}`
    );

    const result = GetBoardSchema.safeParse(response.data.board);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

// export const serviceCreateBoard = async ({ data }) => {

// };

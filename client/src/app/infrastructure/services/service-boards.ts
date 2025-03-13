import axios from 'axios';
import { URLDOMAIN } from '@/app/interfaces/helpers/urldomain';
import {
  BoardsListSchema,
  EditBoardPrevDataSchema,
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

    const result = LastBoardSchema.safeParse(response.data?.board);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    // throw new Error(
    //   (axios.isAxiosError(error) && error.response?.data?.message) ||
    //     'Error al obtener el último tablero'
    // );
  }
};

export const serviceCreateBoard = async (data: ICreateBoard) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/create`, data, {
      withCredentials: true,
    });

    return response.status ? response.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al crear el tablero'
    );
  }
};

export const serviceEditBoard = async (data: IEditBoard) => {
  try {
    console.log(data.cover);

    const response = await axios.put(`${URLDOMAIN}/boards/edit`, data, {
      withCredentials: true,
    });

    return response.status ? response.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al editar el tablero'
    );
  }
};

export const serviceDeleteBoard = async (id: string) => {
  try {
    const response = await axios.delete(`${URLDOMAIN}/boards/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al eliminar el tablero'
    );
  }
};

export const serviceGetBoardsList = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/boards/boards-list`, {
      withCredentials: true,
    });

    const result = BoardsListSchema.safeParse(response.data);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    // throw new Error(
    //   (axios.isAxiosError(error) && error.response?.data?.message) ||
    //     'Error al obtener la lista de tableros'
    // );
  }
};

export const serviceGetUserBoards = async ({
  page,
  limit,
  username,
}: IGetUserBoards) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/user/${username}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = UserBoardsSchema.safeParse(response.data);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los tableros del usuario'
    );
  }
};

export const serviceGetSingleBoard = async ({
  id,
  page,
  limit,
}: ISearchByID) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/single/${id}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = GetBoardSchema.safeParse(response.data.board);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener el tablero individual'
    );
  }
};

export const serviceAddPinToBoard = async (data: IBoardPinsInteractions) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/add-pin`, data, {
      withCredentials: true,
    });

    return response.status;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al agregar un pin al tablero'
    );
  }
};

export const serviceRemovePinFromBoard = async (
  data: IBoardPinsInteractions
) => {
  try {
    const response = await axios.post(`${URLDOMAIN}/boards/remove-pin`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al eliminar un pin del tablero'
    );
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

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener las portadas posibles'
    );
  }
};

export const serviceSearchBoards = async ({
  value,
  limit,
  page,
}: ISearchByValue) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/search?value=${value}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    const result = SearchBoardsSchema.safeParse(response.data);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al buscar tableros'
    );
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

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los tableros de inicio'
    );
  }
};

export const serviceEditBoardPrevData = async (id: string) => {
  try {
    const response = await axios.get(
      `${URLDOMAIN}/boards/edit/prev-data/${id}`,
      {
        withCredentials: true,
      }
    );

    const result = EditBoardPrevDataSchema.safeParse(response.data.board);

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
};

import {
  IBoardPinsInteractions,
  ICreateBoard,
  IEditBoard,
  IGetUserBoards,
  IPaging,
  ISearchByID,
  ISearchByValue,
} from '@/app/domain/types/boards-interface';
import {
  serviceAddPinToBoard,
  serviceCreateBoard,
  serviceDeleteBoard,
  serviceEditBoard,
  serviceGetBoardsList,
  serviceGetHomeBoards,
  serviceGetLastBoardName,
  serviceGetPossibleCovers,
  serviceGetSingleBoard,
  serviceGetUserBoards,
  serviceRemovePinFromBoard,
  serviceSearchBoards,
} from '../services/service-boards';

export const createBoardAdapter = async (data: ICreateBoard) => {
  return await serviceCreateBoard(data);
};

export const editBoardAdapter = async (data: IEditBoard) => {
  return await serviceEditBoard(data);
};

export const deleteBoardAdapter = async (id: string) => {
  return await serviceDeleteBoard(id);
};

export const lastBoardAdapter = async () => {
  return await serviceGetLastBoardName();
};

export const homeBoardsAdapter = async ({ page, limit }: IPaging) => {
  return await serviceGetHomeBoards({ page, limit });
};

export const boardsListAdapter = async () => {
  return await serviceGetBoardsList();
};

export const getBoardAdapter = async ({ id, page, limit }: ISearchByID) => {
  return await serviceGetSingleBoard({ id, page, limit });
};

export const searchBoardsAdapter = async ({
  value,
  page,
  limit,
}: ISearchByValue) => {
  return await serviceSearchBoards({ value, limit, page });
};

export const addPinToBoardAdapter = async ({
  pinId,
  boardId,
}: IBoardPinsInteractions) => {
  return await serviceAddPinToBoard({ pinId, boardId });
};

export const removePinFromBoardAdapter = async ({
  pinId,
  boardId,
}: IBoardPinsInteractions) => {
  return await serviceRemovePinFromBoard({ pinId, boardId });
};

export const getPossibleCoversAdapter = async ({
  id,
  page,
  limit,
}: ISearchByID) => {
  return await serviceGetPossibleCovers({ id, page, limit });
};

export const userBoardsAdapter = async ({
  username,
  page,
  limit,
}: IGetUserBoards) => {
  return await serviceGetUserBoards({ username, limit, page });
};

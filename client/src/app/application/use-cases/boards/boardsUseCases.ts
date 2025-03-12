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
  addPinToBoardAdapter,
  boardsListAdapter,
  createBoardAdapter,
  deleteBoardAdapter,
  editBoardAdapter,
  editBoardPrevDataAdapter,
  getBoardAdapter,
  getPossibleCoversAdapter,
  homeBoardsAdapter,
  lastBoardAdapter,
  removePinFromBoardAdapter,
  searchBoardsAdapter,
  userBoardsAdapter,
} from '@/app/infrastructure/adapters/BoardsAdapter';

export const createBoardUseCase = async (data: ICreateBoard) => {
  return await createBoardAdapter(data);
};

export const editBoardUseCase = async (data: IEditBoard) => {
  return await editBoardAdapter(data);
};

export const deleteBoardUseCase = async (id: string) => {
  return await deleteBoardAdapter(id);
};

export const lastBoardUseCase = async () => {
  return await lastBoardAdapter();
};

export const homeBoardsUseCase = async ({ page, limit }: IPaging) => {
  return await homeBoardsAdapter({ page, limit });
};

export const boardsListUseCase = async () => {
  return await boardsListAdapter();
};

export const getBoardUseCase = async ({ id, page, limit }: ISearchByID) => {
  return await getBoardAdapter({ id, page, limit });
};

export const searchBoardsUseCase = async ({
  value,
  page,
  limit,
}: ISearchByValue) => {
  return await searchBoardsAdapter({ value, limit, page });
};

export const addPinToBoardUseCase = async ({
  pinId,
  boardId,
}: IBoardPinsInteractions) => {
  return await addPinToBoardAdapter({ pinId, boardId });
};

export const removePinFromBoardUseCase = async ({
  pinId,
  boardId,
}: IBoardPinsInteractions) => {
  return await removePinFromBoardAdapter({ pinId, boardId });
};

export const getPossibleCoversUseCase = async ({
  id,
  page,
  limit,
}: ISearchByID) => {
  return await getPossibleCoversAdapter({ id, page, limit });
};

export const userBoardsUseCase = async ({
  username,
  page,
  limit,
}: IGetUserBoards) => {
  return await userBoardsAdapter({ username, limit, page });
};

export const editBoardPrevDataUseCase = async (id: string) => {
  return await editBoardPrevDataAdapter(id);
};

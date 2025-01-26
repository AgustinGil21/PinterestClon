import {
  addPinToBoardUseCase,
  boardsListUseCase,
  createBoardUseCase,
  deleteBoardUseCase,
  editBoardUseCase,
  getBoardUseCase,
  getPossibleCoversUseCase,
  homeBoardsUseCase,
  lastBoardUseCase,
  removePinFromBoardUseCase,
  searchBoardsUseCase,
  userBoardsUseCase,
} from '@/app/application/use-cases/boards/boardsUseCases';

import {
  IBoard,
  IBoardPinsInteractions,
  IBoardPreview,
  IBoardsList,
  ICover,
  ICreateBoard,
  IEditBoard,
  IGetUserBoards,
  ILastBoard,
  IPaging,
  IPin,
  ISearchByID,
  ISearchByValue,
  IUserBoard,
} from '@/app/domain/types/boards-interface';
import { StateCreator } from 'zustand';

export interface IBoardsStore {
  createBoardData: ICreateBoard;
  editBoardData: IEditBoard;
  lastBoard: ILastBoard;
  boardsList: IBoardsList[];
  userBoards: IUserBoard[];
  board: IBoard;
  homeBoards: IBoardPreview[];
  possibleCovers: ICover[];
  searchedBoards: IBoardPreview[];
  boardPins: IPin[];
  updateStateBoards: (store: string, value: []) => void;

  createBoard: (data: ICreateBoard) => void;
  editBoard: (data: IEditBoard) => void;
  deleteBoard: (id: string) => void;
  getLastBoard: () => Promise<void>;
  getBoardsList: () => Promise<void>;
  getHomeBoards: ({ page, limit }: IPaging) => Promise<void>;
  searchBoards: ({ value, page, limit }: ISearchByValue) => Promise<void>;
  getBoard: ({ id, page, limit }: ISearchByID) => Promise<void>;
  getCovers: ({ id, page, limit }: ISearchByID) => Promise<void>;
  addPinToBoard: ({ boardId, pinId }: IBoardPinsInteractions) => void;
  removePinFromBoard: ({ boardId, pinId }: IBoardPinsInteractions) => void;
  getUserBoards: ({ page, limit, username }: IGetUserBoards) => Promise<void>;
}

export const boardsStore: StateCreator<IBoardsStore> = (set, get) => ({
  createBoardData: {
    name: '',
    pinID: '',
  },
  editBoardData: {
    id: '',
    name: '',
  },

  lastBoard: { name: '', id: '' },
  boardsList: [],
  userBoards: [],

  board: {
    id: '',
    name: '',
    description: '',
    pins_count: '',
    user: {
      id: '',
      name: '',
      surname: '',
      username: '',
      avatar: '',
      avatar_letter_color: '',
      avatar_letter: '',
      avatar_background: '',
    },
    pins: [],
  },

  boardPins: [],
  homeBoards: [],
  possibleCovers: [],
  searchedBoards: [],

  createBoard: async (data: ICreateBoard) => await createBoardUseCase(data),

  editBoard: async (data: IEditBoard) => await editBoardUseCase(data),

  deleteBoard: async (id: string) => await deleteBoardUseCase(id),

  getLastBoard: async () => {
    const response = await lastBoardUseCase();

    if (response) set({ lastBoard: response });
  },

  getBoardsList: async () => {
    const response = await boardsListUseCase();

    if (response) set({ boardsList: response.boards });
  },

  getHomeBoards: async ({ page, limit }: IPaging) => {
    const response = await homeBoardsUseCase({ page, limit });

    if (response?.boards) {
      const boardsData = response.boards;

      if (Array.isArray(boardsData)) {
        const prevHomeBoards = get().homeBoards;

        const uniqueHomeBoards = boardsData.filter(
          (newBoard: IBoardPreview) =>
            !prevHomeBoards.some(
              (existingBoard: IBoardPreview) => existingBoard.id === newBoard.id
            )
        );

        set({
          homeBoards: [...prevHomeBoards, ...uniqueHomeBoards],
        });
      }
    }
  },

  searchBoards: async ({ value, page, limit }: ISearchByValue) => {
    if (page === 1) {
      set({ searchedBoards: [] });
    }

    const response = await searchBoardsUseCase({ value, page, limit });

    console.log(response);

    if (response?.boards) {
      const boardsData = response.boards;

      if (Array.isArray(boardsData)) {
        const prevSearchedBoards = get().searchedBoards;

        const uniqueSearchedBoards = boardsData.filter(
          (newBoard: IBoardPreview) =>
            !prevSearchedBoards.some(
              (existingBoard: IBoardPreview) => existingBoard.id === newBoard.id
            )
        );

        set({
          searchedBoards:
            page === 1
              ? uniqueSearchedBoards
              : [...prevSearchedBoards, ...uniqueSearchedBoards],
        });
      }
    }
  },

  getBoard: async ({ id, page, limit }: ISearchByID) => {
    const response = await getBoardUseCase({ page, limit, id });

    // Board dentro tiene pins los cuales usan
    // paging para evitar cargarlos todos juntos
    // y que hay un impacto en el rendimiento.

    if (response) {
      const pinsData = response.pins;

      if (Array.isArray(pinsData)) {
        const prevPins = get().boardPins;

        const uniquePins = pinsData.filter(
          (newPin: IPin) =>
            !prevPins.some(
              (existingPin: IPin) => existingPin.pin_id === newPin.pin_id
            )
        );

        set({
          boardPins: page === 1 ? uniquePins : [...prevPins, ...uniquePins],
        });
      }
    }
  },

  getCovers: async ({ id, page, limit }: ISearchByID) => {
    const response = await getPossibleCoversUseCase({ page, limit, id });

    if (response) set({ possibleCovers: response.pins });
  },

  addPinToBoard: async ({ pinId, boardId }: IBoardPinsInteractions) =>
    await addPinToBoardUseCase({ pinId, boardId }),

  removePinFromBoard: async ({ pinId, boardId }: IBoardPinsInteractions) =>
    await removePinFromBoardUseCase({ pinId, boardId }),

  getUserBoards: async ({ username, page, limit }: IGetUserBoards) => {
    set({
      userBoards: [],
    });

    const response = await userBoardsUseCase({ page, limit, username });

    if (response?.boards) {
      const boardsData = response.boards;

      if (Array.isArray(boardsData)) {
        const prevUserBoards = get().userBoards;

        const uniqueUserBoards = boardsData.filter(
          (newBoard: IUserBoard) =>
            !prevUserBoards.some(
              (existingBoard: IUserBoard) => existingBoard.id === newBoard.id
            )
        );

        set({
          userBoards: [...prevUserBoards, ...uniqueUserBoards],
        });
      }
    }
  },

  updateStateBoards: (store: string, value: []) => {
    set((state) => ({
      ...state,
      [store]: value,
    }));
  },
});

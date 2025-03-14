import {
  addPinToBoardUseCase,
  boardsListUseCase,
  createBoardUseCase,
  deleteBoardUseCase,
  editBoardPrevDataUseCase,
  editBoardUseCase,
  getBoardUseCase,
  getPossibleCoversUseCase,
  homeBoardsUseCase,
  lastBoardUseCase,
  removePinFromBoardUseCase,
  searchBoardsUseCase,
  userBoardsUseCase,
} from '@/app/application/use-cases/boards/boardsUseCases';
import { getUniqueItems } from '@/app/libs/getUniqueItems';

import {
  IBoard,
  IBoardCover,
  IBoardPinsInteractions,
  IBoardPreview,
  IBoardsList,
  ICover,
  ICreateBoard,
  IEditBoard,
  IEditBoardPrevData,
  IGetUserBoards,
  ILastBoard,
  IPaging,
  IPin,
  ISearchByID,
  ISearchByValue,
  IUserBoard,
} from '@/app/domain/types/boards-interface';

import { StateCreator } from 'zustand';
import { PinInterface } from '@/app/domain/types/pins-structure';
import { unknown } from 'zod';

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
  boardPins: PinInterface[];
  noMoreHomeBoards: boolean;
  noMoreSearchedBoards: boolean;
  noMoreBoardPins: boolean;
  noMoreUserBoards: boolean;
  newBoardCover?: string;
  boardCovers?: IBoardCover[];

  createBoard: (data: ICreateBoard) => Promise<void>;
  editBoard: (data: IEditBoard) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  getLastBoard: () => Promise<void>;
  getBoardsList: () => Promise<void>;
  getHomeBoards: ({ page, limit }: IPaging) => Promise<void>;
  searchBoards: ({ value, page, limit }: ISearchByValue) => Promise<void>;
  getBoard: ({ id, page, limit }: ISearchByID) => Promise<void>;
  getCovers: ({ id, page, limit }: ISearchByID) => Promise<void>;
  addPinToBoard: ({ boardId, pinId }: IBoardPinsInteractions) => Promise<void>;
  removePinFromBoard: ({
    boardId,
    pinId,
  }: IBoardPinsInteractions) => Promise<void>;
  getUserBoards: ({ username, page, limit }: IGetUserBoards) => Promise<void>;
  updateStateBoards: (store: string, value: any[]) => void;
  setNewBoardCover: (cover: string) => void;
  getBoardCovers: ({ id, page, limit }: ISearchByID) => void;

  editBoardPrevData: IEditBoardPrevData;
  editBoardModalIsOpen: boolean;
  editBoardID: string;
  setEditBoardModal: (id?: string) => void;
  getEditBoardPrevData: (id: string) => void;
}

export const boardsStore: StateCreator<IBoardsStore> = (set, get) => ({
  createBoardData: { name: '', pinID: '' },
  editBoardData: { id: '', name: '' },
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
  noMoreHomeBoards: false,
  noMoreSearchedBoards: false,
  noMoreBoardPins: false,
  noMoreUserBoards: false,

  editBoardID: '',
  editBoardPrevData: {
    name: '',
    description: '',
    cover: '',
    collage: '',
  },
  editBoardModalIsOpen: false,

  createBoard: async (data: ICreateBoard) => {
    await createBoardUseCase(data);
  },

  editBoard: async (data: IEditBoard) => {
    await editBoardUseCase(data);
  },

  deleteBoard: async (id: string) => {
    await deleteBoardUseCase(id);
  },

  getLastBoard: async () => {
    const response = await lastBoardUseCase();
    if (response) set({ lastBoard: response });
  },

  getBoardsList: async () => {
    const response = await boardsListUseCase();
    if (response) set({ boardsList: response.boards });
  },

  getHomeBoards: async ({ page, limit }: IPaging) => {
    const { homeBoards, noMoreHomeBoards } = get();

    if (noMoreHomeBoards && page > 1) {
      // console.log('No hay más tableros en la sección de inicio.');
      return;
    }

    if (page === 1) {
      set({ homeBoards: [], noMoreHomeBoards: false });
    }

    try {
      const response = await homeBoardsUseCase({ page, limit });

      if (response?.boards && Array.isArray(response.boards)) {
        const uniqueHomeBoards = getUniqueItems(
          response.boards,
          homeBoards,
          'id'
        );

        if (uniqueHomeBoards.length > 0) {
          set({
            homeBoards: [...homeBoards, ...uniqueHomeBoards],
          });
        } else {
          set({ noMoreHomeBoards: true });
          // console.log('No hay más tableros en la sección de inicio.');
        }
      } else {
        set({ noMoreHomeBoards: true });
        // console.log(
        //   'No hay más tableros en la sección de inicio o la respuesta fue inválida.'
        // );
      }
    } catch (error: unknown | any) {
      set({ noMoreHomeBoards: true });

      // throw new Error('Error al obtener los tableros de inicio:', error);
    }
  },

  searchBoards: async ({ value, page, limit }: ISearchByValue) => {
    const { searchedBoards, noMoreSearchedBoards } = get();

    if (noMoreSearchedBoards && page > 1) {
      // console.log('No hay más resultados para esta búsqueda.');
      return;
    }

    if (page === 1) {
      set({ noMoreSearchedBoards: false });
    }

    try {
      const response = await searchBoardsUseCase({ value, page, limit });

      if (response?.boards && Array.isArray(response.boards)) {
        const uniqueSearchedBoards = getUniqueItems(
          response.boards,
          searchedBoards,
          'id'
        );

        if (uniqueSearchedBoards.length > 0) {
          set({
            searchedBoards: [...searchedBoards, ...uniqueSearchedBoards],
          });
        } else {
          set({ noMoreSearchedBoards: true });
          // console.log('No hay más resultados para esta búsqueda.');
        }
      } else {
        set({ noMoreSearchedBoards: true });
        // console.log(
        //   'No hay más resultados para esta búsqueda o la respuesta fue inválida.'
        // );
      }
    } catch (error: unknown | any) {
      set({ noMoreSearchedBoards: true });
      // throw new Error('Error al buscar tableros:', error);
    }
  },

  getBoard: async ({ id, page, limit }: ISearchByID) => {
    const response = await getBoardUseCase({ id, page, limit });

    if (response) {
      const prevPins = get().boardPins;
      const uniquePins = getUniqueItems(response.pins, prevPins, 'pin_id');

      set({
        board: response,
      });
      if (uniquePins.length > 0) {
        set({
          boardPins: page === 1 ? uniquePins : [...prevPins, ...uniquePins],
        });
      } else {
        set({ noMoreBoardPins: true });
        // console.log('No hay más pines en este tablero.');
      }
    } else {
      set({ noMoreBoardPins: true });
      // console.log('No hay más pines en este tablero.');
    }
  },

  getCovers: async ({ id, page, limit }: ISearchByID) => {
    const response = await getPossibleCoversUseCase({ id, page, limit });
    if (response) {
      if (response.pins.length > 0) {
        set({ possibleCovers: response.pins });
      } else {
        // console.log('No hay más posibles portadas para este tablero.');
      }
    }
  },

  addPinToBoard: async ({ pinId, boardId }: IBoardPinsInteractions) => {
    await addPinToBoardUseCase({ pinId, boardId });
  },

  removePinFromBoard: async ({ pinId, boardId }: IBoardPinsInteractions) => {
    await removePinFromBoardUseCase({ pinId, boardId });
  },

  getUserBoards: async ({ username, page, limit }: IGetUserBoards) => {
    set({
      userBoards: [],
    });

    const response = await userBoardsUseCase({ username, page, limit });

    if (response?.boards) {
      const prevUserBoards = get().userBoards;
      const uniqueUserBoards = getUniqueItems(
        response.boards,
        prevUserBoards,
        'id'
      );

      if (uniqueUserBoards.length > 0) {
        set({ userBoards: [...prevUserBoards, ...uniqueUserBoards] });
      } else {
        set({ noMoreUserBoards: true });
        // console.log('No hay más tableros de este usuario.');
      }
    } else {
      set({ noMoreUserBoards: true });
      // console.log('No hay más tableros de este usuario.');
    }
  },

  updateStateBoards: (store: string, value: any) => {
    set((state) => ({
      ...state,
      [store]: value,
    }));
  },

  setNewBoardCover: (cover: string) => {
    set({
      newBoardCover: cover,
    });
  },

  getBoardCovers: async ({ id, page, limit }: ISearchByID) => {
    const covers = await getPossibleCoversUseCase({ id, page, limit });

    set({
      boardCovers: covers?.pins,
    });
  },

  setEditBoardModal: (id?: string) => {
    set((state) => ({
      editBoardID: id,
      editBoardModalIsOpen: !state.editBoardModalIsOpen,
    }));
  },

  getEditBoardPrevData: async (id: string) => {
    const response = await editBoardPrevDataUseCase(id);

    if (response) {
      set({
        editBoardPrevData: response,
      });
    }
  },
});

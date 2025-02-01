// import { StateCreator } from 'zustand';
// import { PinInterface } from '@/app/domain/types/pins-structure';
// import { getSearchPinsCase } from '@/app/application/use-cases/home/getSearchPins';
// import { searchBoardsUseCase } from '@/app/application/use-cases/boards/boardsUseCases';
// import { getUniqueItems } from '@/app/libs/getUniqueItems';
// import { persist, PersistOptions } from 'zustand/middleware';
// import { IUsersProfileCard } from '@/app/domain/types/data-users';
// import { ISearchByValue } from '@/app/domain/types/boards-interface';
// import { searchUsersCase } from '@/app/application/use-cases/profile-data/searchUsers';
// import { IBoardPreview } from '@/app/domain/types/boards-interface';

// export interface InterfacePersistStore {
//   searchPins: PinInterface[];
//   getSearchPins: (value: string, page: number, limit: number) => Promise<void>;
//   searchBoards: ({ value, page, limit }: ISearchByValue) => Promise<void>;
//   searchUsers: (params: ISearchByValue) => Promise<void>;
//   searchedBoards: IBoardPreview[];
//   noMoreSearchPins: boolean;
//   noMoreUsers: boolean;
//   usersProfile: IUsersProfileCard[];
//   noMoreSearchedBoards: boolean;
// }

// type PersistStoreWithMutators = StateCreator<
//   InterfacePersistStore,
//   [],
//   [['zustand/persist', InterfacePersistStore]]
// >;

// // Crea el store con persist
// export const createPersistDataStore: PersistStoreWithMutators = persist(
//   (set, get) => ({
//     searchPins: [],
//     noMoreSearchPins: false,
//     noMoreUsers: false,
//     usersProfile: [],
//     searchedBoards: [],
//     noMoreSearchedBoards: false,

//     getSearchPins: async (value: string, page: number, limit: number) => {
//       const { searchPins, noMoreSearchPins } = get();

//       if (page === 1) {
//         set({ searchPins: [], noMoreSearchPins: false });
//       }

//       if (noMoreSearchPins && page > 1) {
//         console.log('No hay más resultados para esta búsqueda.');
//         return;
//       }

//       try {
//         const response = await getSearchPinsCase(value, page, limit);

//         if (Array.isArray(response) && response.length > 0) {
//           const uniqueSearchPins = getUniqueItems(
//             response,
//             searchPins,
//             'pin_id'
//           );

//           if (uniqueSearchPins.length > 0) {
//             set({
//               searchPins:
//                 page === 1
//                   ? uniqueSearchPins
//                   : [...searchPins, ...uniqueSearchPins],
//               noMoreSearchPins: false,
//             });
//           } else {
//             set({ noMoreSearchPins: true });
//             console.log('No hay más resultados para esta búsqueda.');
//           }
//         } else {
//           set({ noMoreSearchPins: true });
//           console.log('No hay más resultados disponibles.');
//         }
//       } catch (error) {
//         console.error('Error en la búsqueda de pines:', error);
//         set({ noMoreSearchPins: true });
//       }
//     },
//     searchUsers: async ({ page, limit, value }: ISearchByValue) => {
//       const { noMoreUsers, usersProfile } = get();

//       if (noMoreUsers && page > 1) {
//         console.log('No hay más usuarios disponibles.');
//         return;
//       }

//       if (page === 1) {
//         set({ usersProfile: [], noMoreUsers: false });
//       }

//       try {
//         const response = await searchUsersCase({ page, limit, value });

//         if (response && Array.isArray(response)) {
//           const newUsers = getUniqueItems(response, usersProfile, 'id');

//           if (newUsers.length > 0) {
//             set({
//               usersProfile: [...usersProfile, ...newUsers],
//             });
//           } else {
//             set({ noMoreUsers: true });
//             console.log('No hay más usuarios disponibles.');
//           }
//         } else {
//           set({ noMoreUsers: true });
//           console.log(
//             'No hay más usuarios disponibles o la respuesta fue inválida.'
//           );
//         }
//       } catch (error) {
//         console.error('Error al buscar usuarios:', error);
//         set({ noMoreUsers: true });
//       }
//     },
//     searchBoards: async ({ value, page, limit }: ISearchByValue) => {
//       const { searchedBoards, noMoreSearchedBoards } = get();

//       if (noMoreSearchedBoards && page > 1) {
//         console.log('No hay más resultados para esta búsqueda.');
//         return;
//       }

//       if (page === 1) {
//         set({ searchedBoards: [], noMoreSearchedBoards: false });
//       }

//       try {
//         const response = await searchBoardsUseCase({ value, page, limit });

//         if (response?.boards && Array.isArray(response.boards)) {
//           const uniqueSearchedBoards = getUniqueItems(
//             response.boards,
//             searchedBoards,
//             'id'
//           );

//           if (uniqueSearchedBoards.length > 0) {
//             set({
//               searchedBoards: [...searchedBoards, ...uniqueSearchedBoards],
//             });
//           } else {
//             set({ noMoreSearchedBoards: true });
//             console.log('No hay más resultados para esta búsqueda.');
//           }
//         } else {
//           set({ noMoreSearchedBoards: true });
//           console.log(
//             'No hay más resultados para esta búsqueda o la respuesta fue inválida.'
//           );
//         }
//       } catch (error) {
//         console.error('Error al buscar tableros:', error);
//         set({ noMoreSearchedBoards: true });
//       }
//     },
//   }),

//   {
//     name: 'persist-data-store',
//     getStorage: () => localStorage,
//   } as PersistOptions<InterfacePersistStore>
// );

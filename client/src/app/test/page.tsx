'use client';

import { useEffect } from 'react';
import BoardCoverModal from '../boards/board-cover/BoardCoverModal';
import BoardsList from '../boards/boards-list/BoardsList';
import BoardsListModal from '../boards/boards-list/BoardsListModal';
import BoardPreview from '../boards/boards-preview/BoardPreview';
import BoardsGrid from '../boards/boards-preview/BoardsGrid';
import CreateBoardModal from '../boards/create-board/CreateBoardModal';
import DynamicPositioning from '../components/Basic/DynamicPositioningModal';
import { Skeleton } from '../components/Basic/Skeleton';
import ToastNotification from '../components/Basic/ToastNotification';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { PinSkeleton } from '../skeletons/PinSkeleton';
import { CategoryCardSkeleton } from '../skeletons/CategoryCardSkeleton';

export default function Test() {
  const { userBoards, getUserBoards } = useAppsStore();

  const boards = [
    {
      id: '1',
      cover:
        'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
      name: 'Perros',
    },
    {
      id: '2',
      cover:
        'https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513.jpg',
      name: 'Programación',
    },
    {
      id: '3',
      collage: [
        'https://i.pinimg.com/474x/d5/a3/4b/d5a34b4472ca79ebaa8390e84e7d1668.jpg',
      ],
      name: 'Color palette',
    },
  ];

  return (
    <>
      {/* <BoardCoverModal /> */}
      {/* <CreateBoardModal /> */}
      {/* <Skeleton
        width={200}
        height={100}
        borderRadius='1rem'
        angle='diagonalRight'
        direction='bottom'
        color='#e60023'
      /> */}
      <PinSkeleton />
      <CategoryCardSkeleton />
    </>
  );
}

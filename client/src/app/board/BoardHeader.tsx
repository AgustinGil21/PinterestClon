'use client';

import { IBoard } from '../domain/types/boards-interface';
import { BoardHeaderButtons } from './BoardHeaderButtons';
import { BoardUserData } from './BoardUserData';
import { BoardData } from './BoardData';
import { useGetScreenSize } from '../hooks/useGetScreenSize';
import { BoardGoBackBtn } from './BoardGoBackBtn';

interface Props {
  board: IBoard;
}

export const BoardHeader = ({ board }: Props) => {
  const { width } = useGetScreenSize();

  return (
    <>
      {width > 768 ? (
        <header className='flex flex-col w-full md:mt-14 mt-8 z-0 mb-8'>
          <section className='flex items-start justify-between px-5 md:justify-around gap-6'>
            <article className='flex-col-reverse  md:gap-6 gap-4 flex md:flex-col'>
              <BoardData board={board} />
              <BoardUserData user={board.user} />
            </article>
            <BoardHeaderButtons
              boardID={board.id}
              userID={board.user.id}
              itsYours={board.its_yours || false}
            />
          </section>
        </header>
      ) : (
        <header className='flex flex-col w-full md:mt-14 z-0 mb-8 mt-3'>
          <article className='flex justify-between px-2'>
            <BoardGoBackBtn />
            <BoardHeaderButtons
              boardID={board.id}
              userID={board.user.id}
              itsYours={board.its_yours || false}
            />
          </article>
          <section className='flex flex-col items-start justify-between px-5 md:justify-around gap-4 mt-2 md:mt-0'>
            <BoardData board={board} />
            <BoardUserData user={board.user} />
          </section>
        </header>
      )}
    </>
  );
};

'use client';

import { useState } from 'react';
import BoardsListHeader from './BoardsListHeader';
import BoardsListResults, { ListOfBoards } from './BoardsListResults';
import BoardListProfileCard from './BoardListProfileCard';
import PlusIcon from '@/app/components/icons/PlusIcon';

interface Props {
  boards: ListOfBoards[];
}

const BoardsList = ({ boards }: Props) => {
  const [value, setValue] = useState('');

  return (
    <section className='w-full pt-4 flex flex-col items-center'>
      <BoardsListHeader setValue={setValue} lang='es' />
      <section className='w-full flex flex-col text-[0.8rem] gap-4 max-h-[290px] min-h-[290px] overflow-y-auto p-2'>
        <div className='flex w-full flex-col gap-2'>
          {!value && <BoardListProfileCard />}
        </div>
        <div className='flex w-full flex-col gap-2'>
          {!value ? <h3>Todos los tableros</h3> : <h3>Resultados</h3>}
          <BoardsListResults value={value} boards={boards} />
        </div>
      </section>
      <footer className='w-full h-[80px] p-[1rem_0.8rem] hover:bg-[#e9e9e9] rounded-b-2xl flex gap-2 items-center cursor-pointer font-semibold  boards-list-shadow hover:shadow-none'>
        <div className='size-[48px] rounded-md flex justify-center items-center bg-[#e9e9e9] '>
          <PlusIcon />
        </div>
        <span>Crear tablero</span>
      </footer>
    </section>
  );
};

export default BoardsList;

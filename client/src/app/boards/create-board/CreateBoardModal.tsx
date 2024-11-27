'use client';

import { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import { Textarea } from '@headlessui/react';

interface Props {
  pbody?: string;
}

const CreateBoardModal = ({ pbody }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const body =
    'https://i.pinimg.com/236x/a2/d5/e0/a2d5e056db544822ed5ffd55643b7bc5.jpg';

  return (
    <Modal
      props={{
        isModalOpen,
        setModal: () => setIsModalOpen(false),
        className:
          'flex flex-col p-3 gap-4 rounded-lg justify-center items-center max-w-[450px] min-w-[300px] ',
      }}
    >
      <h2 className='text-md font-semibold'>Crear tablero</h2>
      <section className='w-full h-[300px] flex gap-3'>
        {body && (
          <img
            alt='pin-img'
            src={body}
            className='w-full h-full object-cover rounded-lg'
          />
        )}
        <form className='flex flex-col justify-start gap-3 w-full'>
          <label className='text-xs hover:cursor-pointer modal-input-label'>
            <span className='text-[0.6rem] font-medium mr-[2px]'>Nombre</span>
            <span
              className='text-[#e60023] font-bold text-[0.6rem]'
              title='Obligatorio'
            >
              *
            </span>
            <InputStyled
              type='text'
              placeHolder='Nombre del tablero'
              infoName='Nombre del tablero'
              classProps='p-2 border-solid border-[1.5px] border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-[0.6rem]'
            />
          </label>
          <label className='text-xs hover:cursor-pointer modal-input-label h-full '>
            <span className='text-[0.6rem] font-medium mr-[2px]'>
              Descripción
            </span>
            <Textarea
              className={
                'resize-none w-full h-[93.5%] border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-[0.6rem] '
              }
              placeholder='Descripción del tablero'
            />
          </label>
        </form>
      </section>
      <footer className='border-solid border-t border-[#cdcdcd] w-full p-[0.5rem_0] flex items-center justify-between a'>
        <button className='p-[0.5rem_1rem] bg-[#e9e9e9] rounded-2xl text-black font-bold text-[0.7rem] hover:bg-gray-300 transition-colors min-w-[67px]'>
          Cancelar
        </button>
        <button className='p-[0.5rem_1rem] bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem]  hover:bg-[#b60000] transition-colors min-w-[67px]'>
          Crear
        </button>
      </footer>
    </Modal>
  );
};

export default CreateBoardModal;

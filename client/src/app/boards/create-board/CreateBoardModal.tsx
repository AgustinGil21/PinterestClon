'use client';

import { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import { Textarea } from '@headlessui/react';

interface Props {
  pinBody?: string;
  pinID?: string;
}

const CreateBoardModal = ({ pinBody, pinID }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Modal
      props={{
        isModalOpen,
        setModal: () => setIsModalOpen(false),
        className: `flex flex-col p-3 gap-4 rounded-lg justify-center items-center sm:min-w-[300px] min-h-[400px] h-full w-full  max-h-[500px]  ${
          !pinBody ? 'max-w-[350px]' : ' sm:max-w-[550px] board-modal'
        }`,
      }}
    >
      <h2 className='text-md font-semibold text-center'>Crear tablero</h2>
      <section className='w-full h-full flex flex-col sm:flex-row gap-3 max-h-[375px]'>
        {pinBody && (
          <img
            alt='pin-img'
            src={pinBody}
            className='w-full sm:w-1/2 h-[300px] sm:h-full object-cover rounded-lg max-w-[200px] max-h-[200px] sm:max-h-full'
          />
        )}
        <form className='flex flex-col justify-start gap-3 w-full h-full'>
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
          <label className='text-xs hover:cursor-pointer modal-input-label'>
            <span className='text-[0.6rem] font-medium mr-[2px]'>
              Descripción
            </span>
            <Textarea
              className={`resize-none w-full h-full flex-grow border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-[0.6rem] sm:min-h-[270px] ${
                !pinBody ? 'min-h-[280px]' : 'xs:min-h-[180px] '
              }`}
              placeholder='Descripción del tablero'
              maxLength={500}
            />
          </label>
        </form>
      </section>
      <footer className='border-solid border-t border-[#cdcdcd] w-full p-2 flex items-center justify-between'>
        <button
          className='p-2 bg-[#e9e9e9] rounded-2xl text-black font-bold text-[0.7rem] hover:bg-gray-300 transition-colors min-w-[67px]'
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
        <button className='p-2 bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem] hover:bg-[#b60000] transition-colors min-w-[67px]'>
          Crear
        </button>
      </footer>
    </Modal>
  );
};

export default CreateBoardModal;

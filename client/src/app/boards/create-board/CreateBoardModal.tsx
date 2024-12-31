'use client';

import { useEffect, useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateBoardDataSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { CustomTextArea } from '@/app/components/Basic/CustomTextArea';
import { CustomInput } from '@/app/components/Basic/CustomInput';
import { ICreateBoard } from '@/app/domain/types/boards-interface';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface Props {
  pinBody?: string;
  pinID?: string;
}

interface IHandleChange {
  key: string;
  value: string;
}

interface IOnSubmit {
  name: string;
  description?: string;
}

const CreateBoardModal = ({ pinBody, pinID }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { createBoard } = useAppsStore();

  const handleCloseModal = () => setIsModalOpen(false);

  const { errors, register, handleSubmit, watch } = useFormHook({
    schema: CreateBoardDataSchema,
  });

  const onSubmit = (values: IOnSubmit) => {
    const dataToSubmit = {
      ...values,
      ...(pinID ? { pinID } : {}),
    };

    createBoard(dataToSubmit);
  };

  const handleChange = ({ key, value }: IHandleChange) => {};

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
        <form
          className='flex flex-col justify-start gap-3 w-full h-full'
          onSubmit={handleSubmit(onSubmit)}
          id='createBoardForm'
        >
          <label className='text-xs hover:cursor-pointer modal-input-label flex flex-col'>
            <div className='flex'>
              <span className='text-[0.6rem] font-medium mr-[2px]'>Nombre</span>
              <span
                className='text-[#e60023] font-bold text-[0.6rem]'
                title='Obligatorio'
              >
                *
              </span>
            </div>
            <CustomInput
              type='text'
              placeholder='Nombre del tablero'
              infoName='name'
              register={register}
              errors={errors.name}
              className='p-2 border-solid border-[1.5px] border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-[0.6rem] w-full outline-outline-search'
              handleChange={handleChange}
              watch={watch}
            />
          </label>
          <label className='text-xs hover:cursor-pointer modal-input-label'>
            <span className='text-[0.6rem] font-medium mr-[2px]'>
              Descripción
            </span>
            <CustomTextArea
              className={`resize-none w-full h-full flex-grow border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-[0.6rem] sm:min-h-[270px] ${
                !pinBody ? 'min-h-[280px]' : 'xs:min-h-[180px] '
              }`}
              infoName='description'
              placeholder='Descripción del tablero'
              maxLength={500}
              register={register}
              errors={errors.description}
              watch={watch}
              handleChange={handleChange}
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
        <button
          className='p-2 bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem] hover:bg-[#b60000] transition-colors min-w-[67px]'
          type='submit'
          form='createBoardForm'
        >
          Crear
        </button>
      </footer>
    </Modal>
  );
};

export default CreateBoardModal;

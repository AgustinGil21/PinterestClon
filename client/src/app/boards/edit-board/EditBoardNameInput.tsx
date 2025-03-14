import { CustomInput } from '@/app/components/Basic/CustomInput';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { Required } from '@/app/interfaces/components/Basic/Required';
import { IFormHook, IHandleChange } from '../boards-client-interface';
import { useEffect } from 'react';

export const EditBoardNameInput = ({
  errors,
  register,
  watch,
  setValue,
}: IFormHook) => {
  const { t, editBoardPrevData, updateStateBoards, editBoardData } =
    useAppsStore();

  const handleChange = ({ key, value }: IHandleChange) => {};

  return (
    <label className='text-xs hover:cursor-pointer flex flex-col gap-1'>
      <div className='flex'>
        <span className='text-[0.6rem] font-medium mr-[2px]'>
          {t?.board.create.name.label || 'Nombre'}
        </span>
        <Required />
      </div>
      <CustomInput
        type='text'
        placeholder={t?.board.create.name.placeholder || 'Nombre del tablero'}
        infoName='name'
        value={editBoardPrevData?.name || ''}
        register={register}
        errors={errors.name}
        className='p-2 border-solid border-2 border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-[0.6rem] w-full outline-outline-search'
        handleChange={handleChange}
        watch={watch}
      />
    </label>
  );
};

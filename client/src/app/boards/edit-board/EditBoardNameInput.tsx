import { CustomInput } from '@/app/components/Basic/CustomInput';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { Required } from '@/app/interfaces/components/Basic/Required';
import { IFormHook, IHandleChange } from '../boards-client-interface';
import { useEffect } from 'react';

export const EditBoardNameInput = ({ errors, register, watch }: IFormHook) => {
  const { t } = useAppsStore();

  const handleChange = ({ key, value }: IHandleChange) => {};

  return (
    <label className='text-xs hover:cursor-pointer flex flex-col gap-1'>
      <div className='flex'>
        <span className=' text-xs font-semibold mr-[2px]'>
          {t?.board.create.name.label || 'Nombre'}
        </span>
        <Required textSize='text-xs' />
      </div>
      <CustomInput
        type='text'
        placeholder={t?.board.create.name.placeholder || 'Nombre del tablero'}
        infoName='name'
        register={register}
        errors={errors.name}
        className='p-2 border-solid border-2 border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-xs w-full outline-outline-search'
        handleChange={handleChange}
        watch={watch}
      />
    </label>
  );
};

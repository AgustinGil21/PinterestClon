import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import ButtonStyled from '../../../interfaces/components/Basic/ButtonStyled';
import ArrowsCreatLeftIcon from '../../../interfaces/components/icons/ArrowsCreatLeftIcon';

import {
  FieldValues,
  UseFormHandleSubmit,
  SubmitHandler,
} from 'react-hook-form';

interface ButtonsRender {
  savePin: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  isValid: boolean;
  isValuesEqual: boolean;
  handleClickEdit: SubmitHandler<FieldValues>;
  handleClickAside?: () => void;
}

const ButtonsRender = ({
  handleSubmit,
  savePin,
  onSubmit,
  isValuesEqual,
  isValid,
  handleClickEdit,
  handleClickAside,
}: ButtonsRender) => {
  const { dataCreatePin, imagePreview, t } = useAppsStore();

  return (
    <div
      className={`border-b-[1px] w-full h-[70px]  border-b-gray-300 py-4 px-8 flex justify-between items-center create-pin-header`}
    >
      <h3 className='font-semibold text-[1.3rem] dark:text-white create-pin-aside'>
        {dataCreatePin.id
          ? t?.['create-pin']['title-edit'] || 'Editar Pin'
          : t?.['create-pin']['title-create'] || 'Crear Pin'}
      </h3>

      <div
        className='create-pin-aside-mobile hidden hover:cursor-pointer hover:bg-slate-100 p-3 rounded-xl transition-colors'
        onClick={handleClickAside}
      >
        <div className='flex gap-4 items-center'>
          <span className='font-semibold text-[1.3rem] dark:text-white'>
            {dataCreatePin.id ? 'Editar Pin' : 'Crear Pin'}
          </span>
          <ArrowsCreatLeftIcon />
        </div>
      </div>

      {imagePreview && dataCreatePin.body instanceof File && (
        <div className='flex flex-row items-center gap-3'>
          {savePin && (
            <p className='text-sm'>
              {t?.['create-pin'].form.creating || 'Creando pin'}...
            </p>
          )}
          <ButtonStyled
            handleClick={handleSubmit(onSubmit)}
            disabled={dataCreatePin.alt_text === ''}
            className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white  disabled:bg-gray-500'
            type='submit'
          >
            {t?.['create-pin'].form.publish || 'Publicar'}
          </ButtonStyled>
        </div>
      )}
      {imagePreview && typeof dataCreatePin.body === 'string' && (
        <div className='flex flex-row items-center gap-3'>
          {savePin && (
            <p className='text-sm'>
              {t?.['create-pin'].form.saving || 'Guardando cambios'}...
            </p>
          )}
          <ButtonStyled
            className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white disabled:bg-gray-500'
            type='button'
            handleClick={handleSubmit(handleClickEdit)}
            disabled={isValuesEqual || !isValid}
          >
            {t?.pin['save-btn'] || 'Guardar'}
          </ButtonStyled>
        </div>
      )}
    </div>
  );
};

export default ButtonsRender;

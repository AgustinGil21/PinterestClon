import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
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
}

const ButtonsRender = ({
  handleSubmit,
  savePin,
  onSubmit,
  isValuesEqual,
  isValid,
  handleClickEdit,
}: ButtonsRender) => {
  const { dataCreatePin, imagePreview } = useAppsStore();
  console.log(dataCreatePin);

  return (
    <div className='border-b-[1px] w-full h-[70px]  border-b-gray-300 py-4 px-8 flex justify-between items-center'>
      <h3 className='font-semibold text-[1.3rem] dark:text-white'>
        {dataCreatePin.id ? 'Editar Pin' : 'Crear Pin'}
      </h3>
      {imagePreview && dataCreatePin.body instanceof File && (
        <div className='flex flex-row items-center gap-3'>
          {savePin && <p className='text-sm'>Creando pin...</p>}
          <ButtonStyled
            handleClick={handleSubmit(onSubmit)}
            disabled={dataCreatePin.alt_text === ''}
            className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white  disabled:bg-gray-500'
            type='submit'
          >
            Publicar
          </ButtonStyled>
        </div>
      )}
      {imagePreview && typeof dataCreatePin.body === 'string' && (
        <div className='flex flex-row items-center gap-3'>
          {savePin && <p className='text-sm'>Guardando cambios...</p>}
          <ButtonStyled
            className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white disabled:bg-gray-500'
            type='button'
            handleClick={handleSubmit(handleClickEdit)}
            disabled={isValuesEqual || !isValid}
          >
            Guardar
          </ButtonStyled>
        </div>
      )}
    </div>
  );
};

export default ButtonsRender;

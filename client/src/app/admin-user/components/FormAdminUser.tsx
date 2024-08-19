import React from 'react';
import BarButtons from '@/app/interfaces/layout/settingsConfig/BarButtonsSettings';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { UsernameSchema } from '@/app/infrastructure/schemas/validation-form';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';

const FormAdminUser = () => {
  const { watch, handleSubmit, getValues } = useFormHook(UsernameSchema);

  const handleClick = async (data: any) => {};

  return (
    <form>
      <div className='mt-2 flex flex-col gap-1'>
        <div>
          <span className='px-1.5 font-semibold'>Tu cuenta</span>
          <InputLabelStyled
            textLabel='Correo electrónico • Privado'
            infoName='email'
            type='email'
          />
        </div>
        <div className='flex flex-row items-center gap-3 mt-2'>
          <InputLabelStyled
            textLabel='Contraseña'
            infoName='password'
            type='password'
          />
          <ButtonStyled
            disabled={false}
            className='bg-buttonGreyBg font-semibold mt-6'
          >
            Cambiar
          </ButtonStyled>
        </div>
        <div className='flex flex-row items-center mt-4  justify-between'>
          <div>
            <span className='text-sm font-semibold'>
              Convertir a una cuenta para empresa
            </span>
            <p className='text-[12px] max-w-[270px]'>
              Con una cuenta para empresa, tendrás acceso a herramientas como
              anuncios y analytics para hacer crecer tu negocio en Pinterest.
            </p>
          </div>
          <ButtonStyled
            disabled={false}
            className='bg-buttonGreyBg font-semibold'
          >
            Convertir cuenta
          </ButtonStyled>
        </div>
      </div>

      <BarButtons
        watch={watch}
        handleClick={handleClick}
        getValues={getValues}
      />
    </form>
  );
};

export default FormAdminUser;

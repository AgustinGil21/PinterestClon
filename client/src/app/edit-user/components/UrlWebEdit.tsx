import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';

interface UrlWebInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const UrlWebEdit = ({ register, errors }: UrlWebInterface) => {
  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='url'
        textLabel='Sitio web'
        register={register}
        errors={errors.url}
      />
      <p className='text-[10px] px-2 mt-2 text-gray-500'>
        Agrega tu web o sitio de contacto para que las personas puedan conocerte
        mejor y seguir tus actualizaciones. Compartir tu presencia en línea
        permitirá que otros aprendan más sobre ti
      </p>
    </div>
  );
};

export default UrlWebEdit;

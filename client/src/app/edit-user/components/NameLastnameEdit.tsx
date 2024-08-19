import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface NameLastnameInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const NameLastnameEdit = ({ register, errors }: NameLastnameInterface) => {
  const { user } = useAppsStore();

  return (
    <div className='flex flex-row gap-3 mt-3'>
      <InputLabelStyled
        textLabel='Nombre(s)'
        infoName='name'
        type='text'
        register={register}
        errors={errors.name}
      />
      <InputLabelStyled
        textLabel='Apellidos'
        infoName='lastname'
        type='text'
        register={register}
        errors={errors.lastname}
      />
    </div>
  );
};

export default NameLastnameEdit;

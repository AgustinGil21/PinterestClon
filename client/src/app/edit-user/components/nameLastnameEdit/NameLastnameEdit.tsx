import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import useNameLastnameEdit from './useNameLastnameEdit';

interface NameLastnameInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const NameLastnameEdit = ({
  register,
  errors,
  getValues,
  watch,
  setValue,
}: NameLastnameInterface) => {
  const { userSettingsEditProfile } = useNameLastnameEdit({
    watch,
    getValues,
    setValue,
  });

  return (
    <div className='flex flex-row gap-3 mt-3'>
      <InputLabelStyled
        textLabel={`Nombre(s) ${errors.name ? '*' : ''}`}
        infoName='name'
        type='text'
        register={register}
        errors={errors.name}
        value={userSettingsEditProfile?.name}
      />
      <InputLabelStyled
        textLabel='Apellido(s)'
        infoName='surname'
        type='text'
        register={register}
        errors={errors.lastname}
        value={userSettingsEditProfile?.surname}
      />
    </div>
  );
};

export default NameLastnameEdit;

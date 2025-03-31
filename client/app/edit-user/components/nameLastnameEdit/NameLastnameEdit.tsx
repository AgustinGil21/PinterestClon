import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import InputLabelStyled from '../../../interfaces/components/Basic/InputLabelStyled';
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

  const { t } = useAppsStore();

  return (
    <div className='flex flex-row gap-3 mt-3'>
      <InputLabelStyled
        textLabel={`${t?.['edit-profile'].name.label || 'Nombre'}(s) ${
          errors.name ? '*' : ''
        }`}
        infoName='name'
        placeHolder=''
        type='text'
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        register={register}
        errors={errors.name}
        value={userSettingsEditProfile?.name}
      />
      <InputLabelStyled
        textLabel={`${t?.['edit-profile'].surname.label || 'Apellido(s)'}`}
        infoName='surname'
        type='text'
        placeHolder=''
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        register={register}
        errors={errors.surname}
        value={userSettingsEditProfile?.surname}
      />
    </div>
  );
};

export default NameLastnameEdit;

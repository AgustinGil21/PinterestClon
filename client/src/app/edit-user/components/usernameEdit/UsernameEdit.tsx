import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';
import useUsernameEdit from './useUsernameEdit';

interface UsernameEditInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValue: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const UsernameEdit = ({
  register,
  errors,
  watch,
  getValue,
  setValue,
}: UsernameEditInterface) => {
  const { userSettingsEditProfile } = useUsernameEdit({
    watch,
    getValue,
    setValue,
  });

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='username'
        textLabel='Nombre de usuario'
        register={register}
        errors={errors.username}
      />
      <span className='text-[10px] px-2 text-gray-500'>
        www.pinterest.com/{userSettingsEditProfile?.username}
      </span>
    </div>
  );
};

export default UsernameEdit;

import InputLabelStyled from '../../../interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';
import useUsernameEdit from './useUsernameEdit';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

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
  const { t } = useAppsStore();

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='username'
        textLabel={t?.['edit-profile'].username.label || 'Nombre de usuario'}
        register={register}
        errors={errors.username}
        placeHolder=''
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
      />
      <span className='text-[10px] px-2 text-gray-500'>
        www.pinterest-clon.com/{userSettingsEditProfile?.username}
      </span>
    </div>
  );
};

export default UsernameEdit;

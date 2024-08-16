import { useAppsStore } from '@/app/stores/useAppStore';
import InputRegLog from '../../Header/SignOut/BothModals/InputRegLog';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface UsernameEdiInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const UsernameEdit = ({ register, errors }: UsernameEdiInterface) => {
  const { user } = useAppsStore();

  return (
    <div>
      <InputRegLog
        type='text'
        infoName='username'
        textLabel='Nombre de usuario'
        register={register}
        errors={errors.username}
      />
      <span className='text-[10px] px-2 text-gray-500'>
        www.pinterest.com/{user.username}
      </span>
    </div>
  );
};

export default UsernameEdit;

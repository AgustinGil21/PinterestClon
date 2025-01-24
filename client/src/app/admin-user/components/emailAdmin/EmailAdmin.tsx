import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';
import useEmailAdmin from './useEmailAdmin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface EmailAdminInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const EmailAdmin = ({
  register,
  errors,
  getValues,
  watch,
  setValue,
}: EmailAdminInterface) => {
  useEmailAdmin({ getValues, setValue, watch });
  const { t } = useAppsStore();

  return (
    <div>
      <span className='px-1.5 font-semibold'>
        {t?.['account-management']['your-account'].title || 'Tu cuenta'}
      </span>
      <InputLabelStyled
        register={register}
        textLabel={
          `${t?.['account-management']['your-account'].label['email-address']} • ${t?.['account-management']['your-account'].label.private}` ||
          'Correo electrónico • Privado'
        }
        infoName='email'
        type='email'
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        errors={errors.email}
      />
    </div>
  );
};

export default EmailAdmin;

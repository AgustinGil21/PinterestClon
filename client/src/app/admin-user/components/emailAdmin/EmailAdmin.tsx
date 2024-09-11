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

  return (
    <div>
      <span className='px-1.5 font-semibold'>Tu cuenta</span>
      <InputLabelStyled
        register={register}
        textLabel='Correo electrónico • Privado'
        infoName='email'
        type='email'
        errors={errors.email}
      />
    </div>
  );
};

export default EmailAdmin;

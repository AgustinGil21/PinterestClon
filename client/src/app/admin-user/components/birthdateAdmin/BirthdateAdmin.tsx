import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import useBirthdateAdmin from './useBirthdateAdmin';

interface BirthdateAdminInterface {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const BirthdateAdmin = ({
  register,
  watch,
  getValues,
  setValue,
}: BirthdateAdminInterface) => {
  useBirthdateAdmin({ setValue, watch, getValues });

  return (
    <div className='mt-5'>
      <span className='px-1.5 font-semibold'>Información personal</span>
      <InputLabelStyled
        min='1930-01-01'
        max='2014-01-01'
        textLabel='Fecha de nacimiento'
        type='date'
        infoName='date'
        register={register}
      />
    </div>
  );
};

export default BirthdateAdmin;

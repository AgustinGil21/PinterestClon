import InputLabelStyled from '../../../interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import useBirthdateAdmin from './useBirthdateAdmin';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

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
  const { userLang, t } = useAppsStore();

  return (
    <div className='mt-5'>
      <span className='px-1.5 font-semibold'>
        {t?.['account-management']['personal-info'].title ||
          'Información personal'}
      </span>
      <InputLabelStyled
        min='1930-01-01'
        max='2014-01-01'
        textLabel={
          t?.['account-management']['personal-info'].label ||
          'Fecha de nacimiento'
        }
        type='date'
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
        infoName='date'
        register={register}
        lang={userLang}
      />
    </div>
  );
};

export default BirthdateAdmin;

import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import useCountriesAdmin from './useCountriesAdmin';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { FaChevronDown } from 'react-icons/fa';
import { CustomSelect } from '../../../components/Basic/CustomSelect';

interface CountriesAdminInterface {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const CountriesAdmin = ({ register, setValue }: CountriesAdminInterface) => {
  const { countries } = useCountriesAdmin({ setValue });
  const { t } = useAppsStore();

  return (
    <div className='mt-5'>
      <span className='text-[12px]'>
        {t?.['account-management']['personal-info'].country || 'País/región'}
      </span>
      <CustomSelect register={register} id='country'>
        {countries.map((elem) => (
          <option
            key={elem.id}
            value={elem.id}
            className='text-ellipsis text-nowrap max-w-full'
          >
            {t?.countries[elem.name as keyof typeof t.countries] || elem.name}
          </option>
        ))}
      </CustomSelect>
    </div>
  );
};

export default CountriesAdmin;

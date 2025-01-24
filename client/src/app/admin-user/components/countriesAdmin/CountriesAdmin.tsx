import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import useCountriesAdmin from './useCountriesAdmin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

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
      <select
        id='country'
        className='w-full p-2.5 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-1  outline-outline-search text-black'
        {...register('country')}
      >
        {countries.map((elem) => (
          <option key={elem.id} value={elem.id}>
            {t?.countries[elem.name as keyof typeof t.countries] || elem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesAdmin;

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';

interface CountriesAdminInterface {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const CountriesAdmin = ({ register, setValue }: CountriesAdminInterface) => {
  const {
    countries,
    userAccountManagment,
    getDataCountries,
    updateValuesUserAccountManagment,
  } = useAppsStore();

  useEffect(() => {
    getDataCountries();
  }, [getDataCountries]);

  useEffect(() => {
    if (userAccountManagment?.country && countries.length > 0) {
      const selectedCountry = countries.find(
        (elem) => elem.name === userAccountManagment.country
      );
      if (selectedCountry) {
        setValue('country', selectedCountry.id);
        if (selectedCountry.name !== userAccountManagment.country) {
          updateValuesUserAccountManagment(selectedCountry.id, 'country');
        }
      }
    }
  }, [
    userAccountManagment,
    countries,
    setValue,
    updateValuesUserAccountManagment,
  ]);

  return (
    <div className='mt-5'>
      <span className='text-[12px]'>País/región</span>
      <select
        id='country'
        className='w-full p-2.5 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-1  outline-outline-search text-black'
        {...register('country')}
      >
        {countries.map((elem) => (
          <option key={elem.id} value={elem.id}>
            {elem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesAdmin;

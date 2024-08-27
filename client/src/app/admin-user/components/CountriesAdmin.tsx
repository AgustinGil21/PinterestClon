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
  const { countries, userAccountManagment, getDataCountries, updateValues } =
    useAppsStore();

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
          updateValues(selectedCountry.id, 'country');
        }
      }
    }
  }, [userAccountManagment, countries, setValue, updateValues]);

  return (
    <div className='mt-5'>
      <span className='text-[12px]'>País/región</span>
      <select
        id='country'
        className='w-full p-3 px-4 border-gray-200 border-2 rounded-xl text-sm mt-1 text-black'
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

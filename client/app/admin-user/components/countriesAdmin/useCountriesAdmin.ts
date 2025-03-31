import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

interface useCountriesAdminInterface {
  setValue: UseFormSetValue<FieldValues>;
}

const useCountriesAdmin = ({ setValue }: useCountriesAdminInterface) => {
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

  return {
    countries,
  };
};

export default useCountriesAdmin;

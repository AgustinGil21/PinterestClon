import { useEffect } from 'react';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

interface useGendersAdminInterface {
  setValue: UseFormSetValue<FieldValues>;
}

const useGendersAdmin = ({ setValue }: useGendersAdminInterface) => {
  const {
    genders,
    getDataGender,
    userAccountManagment,
    updateValuesUserAccountManagment,
  } = useAppsStore();

  useEffect(() => {
    getDataGender();
  }, [getDataGender]);

  useEffect(() => {
    if (genders.length > 0 && userAccountManagment?.gender) {
      const radioIdGender = genders.find(
        (elem) =>
          elem.name.toLowerCase() === userAccountManagment.gender.toLowerCase()
      );

      if (radioIdGender) {
        setValue('radio', radioIdGender.id);
        if (radioIdGender.name !== userAccountManagment.gender) {
          updateValuesUserAccountManagment(radioIdGender.id, 'gender');
        }
      }
    }
  }, [
    setValue,
    userAccountManagment?.gender,
    genders,
    updateValuesUserAccountManagment,
  ]);

  return {
    genders,
  };
};

export default useGendersAdmin;

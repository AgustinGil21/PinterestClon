import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface useLanguagesAdminInterface {
  setValue: UseFormSetValue<FieldValues>;
}

const useLanguagesAdmin = ({ setValue }: useLanguagesAdminInterface) => {
  const {
    languages,
    getDataLanguages,
    userAccountManagment,
    updateValuesUserAccountManagment,
  } = useAppsStore();

  useEffect(() => {
    getDataLanguages();
  }, []);

  useEffect(() => {
    if (userAccountManagment?.language && languages.length > 0) {
      const selectedLanguage = languages.find(
        (elem) => elem.name === userAccountManagment.language
      );
      if (selectedLanguage) {
        setValue('language', selectedLanguage.id);
        if (selectedLanguage.name !== userAccountManagment.language) {
          updateValuesUserAccountManagment(selectedLanguage.id, 'language');
        }
      }
    }
  }, [
    userAccountManagment?.language,
    setValue,
    languages,
    updateValuesUserAccountManagment,
  ]);

  return {
    languages,
  };
};

export default useLanguagesAdmin;

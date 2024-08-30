'use client';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';

interface LanguagesAdminInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const LanguagesAdmin = ({ register, setValue }: LanguagesAdminInterface) => {
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

  return (
    <div className='mt-1'>
      <span className='text-[12px]'>Idioma</span>
      <select
        id='language'
        className='w-full p-2.5 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-1  outline-outline-search text-black'
        {...register('language')}
      >
        {languages.map((elem) => (
          <option key={elem.id} value={elem.id}>
            {elem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagesAdmin;

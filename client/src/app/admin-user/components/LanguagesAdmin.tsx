'use client';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';

interface LanguagesAdminInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const LanguagesAdmin = ({ register, setValue }: LanguagesAdminInterface) => {
  const { languages, getDataLanguages, userAccountManagment, updateValues } =
    useAppsStore();

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
          updateValues(selectedLanguage.id, 'language');
        }
      }
    }
  }, [userAccountManagment?.language, setValue, languages, updateValues]);

  return (
    <div className='mt-1'>
      <span className='text-[12px]'>Idioma</span>
      <select
        id='language'
        className='w-full p-3 px-4 border-gray-200 border-2 rounded-xl text-sm mt-1 text-black'
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

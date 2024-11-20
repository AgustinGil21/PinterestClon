import React, { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const SelectLanguage = () => {
  const getDataLanguages = useAppsStore((state) => state.getDataLanguages);
  const updateStateRegister = useAppsStore(
    (state) => state.updateStateRegisterUser
  );
  const languages = useAppsStore((state) => state.languages);

  useEffect(() => {
    if (languages.length === 0) {
      getDataLanguages();
    }

    if (languages.length > 0) {
      updateStateRegister('lang', languages[0].id);
    }
  }, [getDataLanguages, languages.length, updateStateRegister, languages]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    updateStateRegister('lang', event.target.value);
  };

  return (
    <select
      name='language'
      id='language'
      onChange={handleChange}
      className='w-full p-2 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-2 text-black  outline-outline-search '
    >
      {languages.map((elem) => (
        <option key={elem.id} value={elem.id}>
          {elem.name}
        </option>
      ))}
    </select>
  );
};

export default SelectLanguage;

import { useAppsStore } from '@/app/stores/useAppStore';
import { useEffect } from 'react';

const SelectCountry = () => {
  const Countries = useAppsStore((state) => state.countries);
  const getDataCountries = useAppsStore((state) => state.getDataCountries);
  const updateStateRegister = useAppsStore(
    (state) => state.updateStateRegisterUser
  );

  useEffect(() => {
    if (Countries.length === 0) {
      getDataCountries();
    }
    if (Countries.length > 0) {
      updateStateRegister('country', Countries[0].id);
    }
  }, [getDataCountries, updateStateRegister, Countries]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    updateStateRegister('country', event?.target.value);
  };

  return (
    <select
      name='countries'
      id='countries'
      className='w-full p-3 px-4 border-gray-200 border-2 rounded-xl text-sm mt-4 text-black'
      onChange={handleChange}
    >
      {Countries.map((elem) => (
        <option key={elem.id} value={elem.id}>
          {elem.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;

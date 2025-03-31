import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';

const SelectCountry = () => {
  const Countries = useAppsStore((state) => state.countries);
  const { t } = useAppsStore();
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
      className='w-full p-2 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-4 text-black  outline-outline-search '
      onChange={handleChange}
    >
      {Countries.map((elem) => (
        <option key={elem.id} value={elem.id}>
          {t?.countries[`${elem.name}`] || elem.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;

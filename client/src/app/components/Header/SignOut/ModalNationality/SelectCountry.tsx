import { countries } from './db';

const SelectCountry = () => {
  return (
    <select
      name='countries'
      id='countries'
      className='w-full p-3 px-4 border-gray-200 border-2 rounded-xl text-sm mt-4 text-black'
    >
      {countries.map((elem) => (
        <option key={elem.name} value={elem.name}>
          {elem.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;

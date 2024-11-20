import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import useCountriesAdmin from './useCountriesAdmin';

interface CountriesAdminInterface {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const CountriesAdmin = ({ register, setValue }: CountriesAdminInterface) => {
  const { countries } = useCountriesAdmin({ setValue });

  return (
    <div className='mt-5'>
      <span className='text-[12px]'>País/región</span>
      <select
        id='country'
        className='w-full p-2.5 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-1  outline-outline-search text-black'
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

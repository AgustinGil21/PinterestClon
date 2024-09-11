import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
import useLanguagesAdmin from './useLanguagesAdmin';

interface LanguagesAdminInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const LanguagesAdmin = ({ register, setValue }: LanguagesAdminInterface) => {
  const { languages } = useLanguagesAdmin({ setValue });

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

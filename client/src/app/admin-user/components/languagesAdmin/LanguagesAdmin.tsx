import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
import useLanguagesAdmin from './useLanguagesAdmin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface LanguagesAdminInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const LanguagesAdmin = ({ register, setValue }: LanguagesAdminInterface) => {
  const { languages } = useLanguagesAdmin({ setValue });
  const { t } = useAppsStore();

  return (
    <div className='mt-1'>
      <span className='text-[12px]'>
        {t?.['account-management']['personal-info'].lang || 'Idioma'}
      </span>
      <select
        id='language'
        className='w-full p-2.5 px-4 border-gray-300 border-[1px] rounded-xl text-sm mt-1  outline-outline-search text-black'
        {...register('language')}
      >
        {languages.map((elem) => (
          <option key={elem.id} value={elem.id}>
            {t?.languages[`${elem.name}`] || elem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagesAdmin;

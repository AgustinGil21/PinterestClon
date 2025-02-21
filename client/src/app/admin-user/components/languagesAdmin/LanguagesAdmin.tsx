import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
import useLanguagesAdmin from './useLanguagesAdmin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { CustomSelect } from '@/app/components/Basic/CustomSelect';

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
      <CustomSelect id='language' register={register}>
        {languages.map((elem) => (
          <option
            key={elem.id}
            value={elem.id}
            className='text-ellipsis text-nowrap'
          >
            {t?.languages[`${elem.name}`] || elem.name}
          </option>
        ))}
      </CustomSelect>
    </div>
  );
};

export default LanguagesAdmin;

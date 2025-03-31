import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import GenderInput from '../../../interfaces/layout/Header/SignOut/ModalGender/GenderInput';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import useGendersAdmin from './useGendersAdmin';

interface GendersAdminInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const GendersAdmin = ({
  register,
  setValue,
  getValues,
}: GendersAdminInterface) => {
  const { genders } = useGendersAdmin({ setValue });
  const { t } = useAppsStore();

  return (
    <div className='flex gap-2 mt-5 flex-col'>
      <span className='text-[12px]'>
        {t?.['account-management']['personal-info'].gender.label || 'Género'}
      </span>
      <div className='flex gap-6 md:flex-row flex-col items-start'>
        {genders.map((elem) => (
          <GenderInput
            register={register}
            key={elem.id}
            id={elem.id}
            value={elem.id}
            textLabel={
              (
                t?.['account-management']['personal-info'].gender as Record<
                  string,
                  string
                >
              )[elem.name] || elem.name
            }
          />
        ))}
      </div>
    </div>
  );
};

export default GendersAdmin;

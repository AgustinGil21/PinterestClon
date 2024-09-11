import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import GenderInput from '@/app/interfaces/layout/Header/SignOut/ModalGender/GenderInput';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import useGendersAdmin from './useGendersAdmin';

const translations: { [key: string]: string } = {
  male: 'Masculino',
  female: 'Femenino',
  nonbinary: 'No binario',
};

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

  return (
    <div className='flex gap-2 mt-5 flex-col'>
      <span className='text-[12px]'>Género</span>
      <div className='flex gap-4'>
        {genders.map((elem) => (
          <GenderInput
            register={register}
            key={elem.id}
            id={elem.id}
            value={elem.id}
            textLabel={translations[elem.name.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  );
};

export default GendersAdmin;

import InputLabelStyled from '@/app/interfaces/components/Basic/InputLabelStyled';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import useUrlWebEdit from './useUrlWebEdit';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface UrlWebInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  getValue: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const UrlWebEdit = ({
  register,
  errors,
  getValue,
  setValue,
  watch,
}: UrlWebInterface) => {
  useUrlWebEdit({ getValue, setValue, watch });
  const { t } = useAppsStore();

  return (
    <div>
      <InputLabelStyled
        type='text'
        infoName='website'
        textLabel={t?.['edit-profile'].website.label || 'Sitio web'}
        register={register}
        placeHolder='https://'
        errors={errors.website}
        className='w-full rounded-[13px] py-2 px-3 border-gray-300 border-[1px] text-sm '
      />
      <p className='text-[10px] px-2 mt-2 text-gray-500'>
        {t?.['edit-profile'].website.description ||
          'Agrega tu web o sitio de contacto para que las personas puedan conocerte mejor y seguir tus actualizaciones. Compartir tu presencia en línea permitirá que otros aprendan más sobre ti'}
      </p>
    </div>
  );
};

export default UrlWebEdit;

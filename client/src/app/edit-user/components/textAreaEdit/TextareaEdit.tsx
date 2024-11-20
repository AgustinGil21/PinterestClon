import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import useTextAreaEdit from './useTextAreaEdit';

interface TextareaInterface {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const TextareaEdit = ({
  errors,
  register,
  setValue,
  getValues,
  watch,
}: TextareaInterface) => {
  const { userSettingsEditProfile } = useTextAreaEdit({
    getValues,
    watch,
    setValue,
  });

  return (
    <div>
      <label className='text-[12px]  px-2'>Informacion</label>
      <textarea
        value={userSettingsEditProfile?.about_you}
        placeholder='Cuenta tu historia'
        className='w-full rounded-[13px] py-2 px-3 h-[100px]  border-gray-300 border-[1px] text-sm outline-outline-search resize-none'
        {...register('about_you')}
      ></textarea>
      {errors.about && (
        <ErrorStyled>{errors.about.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default TextareaEdit;

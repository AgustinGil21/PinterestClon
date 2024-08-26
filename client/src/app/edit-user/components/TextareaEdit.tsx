import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ErrorStyled from '@/app/interfaces/components/Basic/ErrorStyled';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';

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
  const { updateValuesExtraInfoUser, userPublicData } = useAppsStore();
  const refContent = watch('about');

  useEffect(() => {
    if (userPublicData?.about) {
      setValue('about', userPublicData?.about);
    }
  }, [userPublicData?.about]);

  useEffect(() => {
    const currentValueContent = getValues('about');

    if (currentValueContent !== userPublicData?.about) {
      updateValuesExtraInfoUser(currentValueContent, 'about');
    }
  }, [refContent]);

  return (
    <div>
      <label className='text-[12px]  px-2'>Informacion</label>
      <textarea
        {...register('about')}
        placeholder='Cuenta tu historia'
        className='w-full rounded-[13px] py-2 px-3 h-[100px]  border-gray-300 border-[1px] text-sm outline-outline-search resize-none'
        value={userPublicData?.about}
      ></textarea>
      {errors.content && (
        <ErrorStyled>{errors.content.message as string}</ErrorStyled>
      )}
    </div>
  );
};

export default TextareaEdit;

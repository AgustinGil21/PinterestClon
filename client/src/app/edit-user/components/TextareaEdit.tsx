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
  const { updateValuesUserSettingsEditProfile, userSettingsEditProfile } =
    useAppsStore();
  const refContent = watch('about_you');

  useEffect(() => {
    if (userSettingsEditProfile?.about_you) {
      setValue('about', userSettingsEditProfile?.about_you);
    }
  }, [userSettingsEditProfile?.about_you, setValue]);

  useEffect(() => {
    const currentValueContent = getValues('about_you');

    if (currentValueContent !== userSettingsEditProfile?.about_you) {
      updateValuesUserSettingsEditProfile(currentValueContent, 'about_you');
    }
  }, [
    refContent,
    getValues,
    userSettingsEditProfile?.about_you,
    updateValuesUserSettingsEditProfile,
  ]);

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

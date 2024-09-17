import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ImagePin from './ImagePin';
import TitlePin from './TitlePin';
import DescriptionPin from './DescriptionPin';
import UrlPin from './UrlPin';
import PlusOptions from './PlusOptions';
import CategoryPin from './CategoryPin';
import AltTextPin from './AltTextPin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import {
  SubmitHandler,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormClearErrors,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { useState } from 'react';

interface FormCreatePinInterface {
  register: UseFormRegister<FieldValues>;
  isValid: boolean;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  reset: UseFormReset<FieldValues>;
}

const FormCreatePin = ({
  register,
  isValid,
  getValues,
  setValue,
  errors,
  watch,
  clearErrors,
  handleSubmit,
  reset,
}: FormCreatePinInterface) => {
  const {
    postDataCreatePin,
    dataCreatePin,
    imagePreview,
    setImagePreview,
    updateStateCreatePin,
  } = useAppsStore();

  const [savePin, setSavePin] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    console.log(dataCreatePin.altText);
    if (isValid) {
      setSavePin(true);
      try {
        await postDataCreatePin({
          title: dataCreatePin.title,
          adultContent: dataCreatePin.adultContent,
          altText: dataCreatePin.altText,
          description: dataCreatePin.description,
          topics: dataCreatePin.topics,
          url: dataCreatePin.url,
          body: dataCreatePin.body,
        });

        reset();
      } catch (error) {
        console.log(error);
      }
    }
    setSavePin(false);
    setImagePreview(null);
    updateStateCreatePin('title', '');
    updateStateCreatePin('altText', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('adultContent', false);
    updateStateCreatePin('topics', '');
    clearErrors();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-b-[1px] w-full border-b-gray-300 py-4 px-4 flex justify-between items-center'>
          <h3 className='font-semibold text-[16px] dark:text-white'>
            Crear Pin
          </h3>
          {imagePreview && (
            <div className='flex flex-row items-center gap-3'>
              {savePin && <p className='text-sm'>Creando pin...</p>}

              <ButtonStyled
                disabled={!imagePreview}
                className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white'
                type='submit'
              >
                Publicar
              </ButtonStyled>
            </div>
          )}
        </div>
        <div className='flex w-full justify-center p-4 '>
          <div className='flex flex-row max-h-[500px] justify-start w-[50%] p-1 gap-8'>
            <ImagePin register={register} clearErrors={clearErrors} />

            <div className='w-full p-2 flex gap-3 flex-col max-w-[480px]'>
              <AltTextPin
                getValues={getValues}
                register={register}
                errors={errors}
                watch={watch}
              />

              <TitlePin register={register} errors={errors} watch={watch} />

              <DescriptionPin
                register={register}
                errors={errors}
                watch={watch}
              />

              <UrlPin register={register} errors={errors} watch={watch} />

              <CategoryPin
                register={register}
                errors={errors}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
              />

              <PlusOptions imagePreview={imagePreview} register={register} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormCreatePin;

import { useState } from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ImagePin from './ImagePin';
import TitlePin from './TitlePin';
import DescriptionPin from './DescriptionPin';
import UrlPin from './UrlPin';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreatePinFormSchema } from '@/app/infrastructure/schemas/validation-form';
import PlusOptions from './PlusOptions';
import CategoryPin from './CategoryPin';
import AltTextPin from './AltTextPin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const FormCreatePin = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    errors,
    handleSubmit,
    clearErrors,
    isValid,
    watch,
    getValues,
  } = useFormHook({
    event: 'onSubmit',
    schema: CreatePinFormSchema,
  });
  const { postDataCreatePin, dataCreatePin } = useAppsStore();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isValid) {
      try {
        await postDataCreatePin({
          title: dataCreatePin.title,
          adultContent: dataCreatePin.adultContent,
          altText: dataCreatePin.altText,
          description: dataCreatePin.description,
          topics: [],
          url: dataCreatePin.url,
          body: dataCreatePin.body,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-b-[1px] w-full border-b-gray-300 p-4 flex justify-between items-center'>
          <h3 className='font-semibold text-[16px] dark:text-white'>
            Crear Pin
          </h3>
          {imagePreview && (
            <ButtonStyled
              disabled={!imagePreview}
              className='bg-redPinterestBg font-semibold hover:bg-red-700 text-white'
              type='submit'
            >
              Guardar
            </ButtonStyled>
          )}
        </div>
        <div className='flex w-full justify-center p-4 h-full'>
          <div className='flex flex-row max-h-[500px] justify-start w-[50%] p-1 gap-8'>
            <ImagePin
              imagePreview={imagePreview}
              register={register}
              setImagePreview={setImagePreview}
              clearErrors={clearErrors}
            />

            <div className='w-full p-2 flex gap-3 flex-col max-w-[480px]'>
              <AltTextPin
                getValues={getValues}
                imagePreview={imagePreview}
                register={register}
                errors={errors}
                watch={watch}
              />

              <TitlePin
                imagePreview={imagePreview}
                register={register}
                errors={errors}
                watch={watch}
              />

              <DescriptionPin
                imagePreview={imagePreview}
                register={register}
                errors={errors}
                watch={watch}
              />

              <UrlPin
                imagePreview={imagePreview}
                register={register}
                errors={errors}
                watch={watch}
              />

              <CategoryPin
                imagePreview={imagePreview}
                register={register}
                errors={errors}
                watch={watch}
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

import ImagePin from './ImagePin';
import TitlePin from './TitlePin';
import DescriptionPin from './DescriptionPin';
import UrlPin from './UrlPin';
import PlusOptions from './PlusOptions';
import CategoryPin from './CategoryPin/CategoryPin';
import AltTextPin from './AltTextPin';
import {
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
import ButtonsRender from './ButtonsRender';
import useFormCreatePin from './useFormCreatePin';

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
  const { handleClickEdit, onSubmit, isValuesEqual, savePin, imagePreview } =
    useFormCreatePin({ watch, isValid, reset, clearErrors });

  return (
    <form>
      <ButtonsRender
        handleClickEdit={handleClickEdit}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isValid={isValid}
        isValuesEqual={isValuesEqual}
        savePin={savePin}
      />
      <div className='flex w-full justify-center p-4 min-w-[865px]'>
        <div className='flex max-h-[500px] justify-center w-full p-1 gap-8'>
          <ImagePin register={register} clearErrors={clearErrors} />
          <div className='w-full p-2  flex gap-3 flex-col max-w-[480px]'>
            <AltTextPin
              getValues={getValues}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <TitlePin register={register} errors={errors} watch={watch} />
            <DescriptionPin register={register} errors={errors} watch={watch} />
            <UrlPin
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
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
  );
};

export default FormCreatePin;

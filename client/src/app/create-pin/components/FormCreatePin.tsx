import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import ImagePin from './ImagePin';
import TitlePin from './TitlePin';
import DescriptionPin from './DescriptionPin';
import UrlPin from './UrlPin';
import PlusOptions from './PlusOptions';
import CategoryPin from './CategoryPin';
import AltTextPin from './AltTextPin';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useState, useEffect } from 'react';
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
import ButtonsRender from './ButtonsRender';

const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

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
    putPinEditId,
    setShouldReload,
  } = useAppsStore();

  const [savePin, setSavePin] = useState(false);
  const [initialValues, setInitialValues] = useState<FieldValues>({});

  useEffect(() => {
    if (dataCreatePin) {
      setInitialValues({
        title: dataCreatePin.title,
        adult_content: dataCreatePin.adult_content,
        alt_text: dataCreatePin.alt_text,
        description: dataCreatePin.description,
        topics: dataCreatePin.topics,
        url: dataCreatePin.url,
        body: dataCreatePin.body,
      });
    }
    reset();
  }, [dataCreatePin]);

  const currentValues = watch();

  const isValuesEqual = deepEqual(currentValues, initialValues);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (isValid) {
      setSavePin(true);

      try {
        await postDataCreatePin({
          title: dataCreatePin.title,
          adult_content: dataCreatePin.adult_content,
          alt_text: dataCreatePin.alt_text,
          description: dataCreatePin.description,
          topics: JSON.stringify(dataCreatePin.topics),
          url: dataCreatePin.url,
          body: dataCreatePin.body,
        });

        setShouldReload();
        reset();
      } catch (error) {
        console.log(error);
      } finally {
        setSavePin(false);
        setImagePreview(null);
        clearErrors();
        resetFormState();
      }
    }
  };
  const handleClickEdit = async () => {
    const data: any = {
      altText: dataCreatePin.alt_text,
      title: dataCreatePin.title,
      adultContent: dataCreatePin.adult_content,
      description: dataCreatePin.description,
      topics: dataCreatePin.topics,
      url: dataCreatePin.url,
      body: dataCreatePin.body,
    };

    const hasChanges = !isValuesEqual;

    if (hasChanges && isValid && dataCreatePin.id) {
      setSavePin(true);
      try {
        await putPinEditId(dataCreatePin.id, data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setSavePin(false);
          setInitialValues(currentValues);
        }, 700);
      }
    }
  };

  const resetFormState = () => {
    updateStateCreatePin('title', '');
    updateStateCreatePin('alt_text', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('adult_content', false);
    updateStateCreatePin('topics', '');
    updateStateCreatePin('id', '');
  };

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
      <div className='flex w-full justify-center p-4'>
        <div className='flex flex-row max-h-[500px] justify-start w-[50%] p-1 gap-8'>
          <ImagePin register={register} clearErrors={clearErrors} />
          <div className='w-full p-2 flex gap-3 flex-col max-w-[480px]'>
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

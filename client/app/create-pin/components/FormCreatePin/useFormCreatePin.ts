import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormWatch,
  UseFormReset,
  UseFormClearErrors,
} from 'react-hook-form';

interface UseFormCreatePinInterface {
  watch: UseFormWatch<FieldValues>;
  isValid: boolean;
  reset: UseFormReset<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

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

const useFormCreatePin = ({
  watch,
  isValid,
  reset,
  clearErrors,
}: UseFormCreatePinInterface) => {
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
  return {
    handleClickEdit,
    onSubmit,
    isValuesEqual,
    savePin,
    imagePreview,
  };
};

export default useFormCreatePin;

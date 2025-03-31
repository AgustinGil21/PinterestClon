import { useRef } from 'react';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { FieldValues, UseFormClearErrors } from 'react-hook-form';

interface UseImagePinInterface {
  clearErrors: UseFormClearErrors<FieldValues>;
}

const useImagePin = ({ clearErrors }: UseImagePinInterface) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { updateStateCreatePin, setImagePreview, imagePreview, dataCreatePin } =
    useAppsStore();

  useEffect(() => {
    if (dataCreatePin.body instanceof File) {
      const fileUrl = URL.createObjectURL(dataCreatePin.body);
      setImagePreview(fileUrl);
    } else if (typeof dataCreatePin.body === 'string') {
      setImagePreview(dataCreatePin.body);
    }
  }, [dataCreatePin.body, setImagePreview]);

  const handleDivClick = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClickDelete = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setImagePreview(null);

    clearErrors();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    setImagePreview(null);

    clearErrors();
  };

  const handleFileChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    const file = e.target.files?.[0];
    if (file) {
      updateStateCreatePin('body', file);
    }
  };

  return {
    handleFileChangeWrapper,
    handleClickDelete,
    handleDivClick,
    imagePreview,
    fileInputRef,
  };
};

export default useImagePin;

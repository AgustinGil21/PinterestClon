import Image from 'next/image';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import NotImagePin from './NotImagePin';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import TrashCreateIcon from '@/app/interfaces/components/icons/TrashCreateIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRef, useEffect } from 'react';

interface ImagePinInterface {
  register: UseFormRegister<FieldValues>;
  clearErrors: () => void;
}

const ImagePin = ({ register, clearErrors }: ImagePinInterface) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    updateStateCreatePin,
    setImagePreview,
    imagePreview,
    dataCreatePin,
    closeDeletePinModal,
  } = useAppsStore();

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
    updateStateCreatePin('body', undefined);
    updateStateCreatePin('adult_content', false);
    updateStateCreatePin('alt_text', '');
    updateStateCreatePin('title', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('topicValue', '');
    updateStateCreatePin('id', '');

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
    updateStateCreatePin('body', undefined);
    updateStateCreatePin('adult_content', false);
    updateStateCreatePin('alt_text', '');
    updateStateCreatePin('title', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('topicValue', '');
    updateStateCreatePin('id', '');

    clearErrors();
  };

  const handleFileChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    const file = e.target.files?.[0];
    if (file) {
      updateStateCreatePin('body', file);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div
        className='w-[310px] h-[380px] bg-[#e9e9e9] border-[1px] border-gray-300 p-5 rounded-3xl flex justify-center flex-col items-center cursor-pointer relative'
        onClick={handleDivClick}
      >
        <input
          type='file'
          accept='image/jpeg'
          {...register('imagePin', {
            onChange: handleFileChangeWrapper,
          })}
          className='hidden'
          ref={fileInputRef}
        />
        {imagePreview ? (
          <>
            <Image
              src={imagePreview}
              alt='Vista previa'
              className='absolute top-0 left-0 w-full h-full object-cover rounded-3xl'
              layout='fill'
              quality={100}
            />
            <button
              className='text-black absolute right-4 top-5 p-2 bg-white rounded-full shadow-xl'
              onClick={handleClickDelete}
            >
              <TrashCreateIcon />
            </button>
          </>
        ) : (
          <NotImagePin />
        )}
      </div>
      <hr className='border-0 h-[1px] bg-gray-300' />
      <ButtonStyled
        handleClick={handleClickDelete}
        disabled={false}
        className='bg-buttonGreyBg font-semibold w-full hover:bg-gray-300'
      >
        Restablecer
      </ButtonStyled>
    </div>
  );
};

export default ImagePin;

import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import NotImagePin from './ImagePin/NotImagePin';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import useImagePin from './ImagePin/useImagePin';
import YesImagePin from './ImagePin/YesImagePin';

interface ImagePinInterface {
  register: UseFormRegister<FieldValues>;
  clearErrors: () => void;
}

const ImagePin = ({ register, clearErrors }: ImagePinInterface) => {
  const {
    handleDivClick,
    handleFileChangeWrapper,
    handleClickDelete,
    fileInputRef,
    imagePreview,
  } = useImagePin({ clearErrors });

  return (
    <div className='flex flex-col gap-4'>
      <div
        className='max-w-[310px] w-full h-[380px] bg-[#e9e9e9] border-[1px] border-gray-300 p-5 rounded-3xl flex justify-center flex-col items-center cursor-pointer relative'
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
          <YesImagePin
            imagePreview={imagePreview}
            handleClickDelete={handleClickDelete}
          />
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

import ButtonStyled from '../../../interfaces/components/Basic/ButtonStyled';
import NotImagePin from './ImagePin/NotImagePin';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import useImagePin from './ImagePin/useImagePin';
import YesImagePin from './ImagePin/YesImagePin';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

interface ImagePinInterface {
  register: UseFormRegister<FieldValues>;
  clearErrors: () => void;
}

const ImagePin = ({ register, clearErrors }: ImagePinInterface) => {
  const { t } = useAppsStore();
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
        className={`${
          !imagePreview && 'p-5'
        } min-w-[310px] max-w-[310px] w-full h-[380px] bg-[#e9e9e9] border-[1px] border-gray-300  rounded-3xl flex justify-center flex-col items-center cursor-pointer relative`}
        onClick={handleDivClick}
      >
        <input
          type='file'
          accept='image/jpeg, image/png, image/webp'
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
        {t?.['create-pin'].form.image.reset || 'Restablecer'}
      </ButtonStyled>
    </div>
  );
};

export default ImagePin;

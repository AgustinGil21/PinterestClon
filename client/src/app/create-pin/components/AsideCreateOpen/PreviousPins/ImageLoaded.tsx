import { PreviousPin } from '@/app/domain/types/pins-structure';

interface ImageLoadedInterface {
  imageLoaded: boolean;
  elem: PreviousPin;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

const ImageLoaded = ({
  imageLoaded,
  handleImageLoad,
  handleImageError,
  elem,
}: ImageLoadedInterface) => {
  return (
    <div className='relative w-[60px] h-[60px] min-w-[60px] min-h-[60px]'>
      {!imageLoaded && (
        <div className='absolute inset-0 bg-gray-400 rounded-2xl'></div>
      )}
      <img
        className='rounded-2xl object-cover w-full h-full'
        src={elem.body || ''}
        alt='imagen-editar'
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
      />
    </div>
  );
};

export default ImageLoaded;

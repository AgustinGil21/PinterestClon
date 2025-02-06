import Image from 'next/image';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface InterfaceImageNotion {
  setSelectedImage: (src: string | null) => void;
}

const ImageNotion = ({ setSelectedImage }: InterfaceImageNotion) => {
  const { t } = useAppsStore();

  return (
    <div className='mt-4 flex flex-col gap-4'>
      {['/notion1.png'].map((src, index) => (
        <div
          key={index}
          className='relative w-full h-[250px] cursor-pointer'
          onClick={() => setSelectedImage(src)}
        >
          <Image
            className='rounded-lg'
            src={src}
            alt={`Diseño en Figma o notion ${index + 1}`}
            layout='fill'
            objectFit='cover'
          />
        </div>
      ))}
      <p className='text-xs text-gray-500 dark:text-gray-400 text-center mt-2'>
        {t?.technologies['code-management-&-collaboration'].backend.img ||
          'Imagen de notion organizativo del desarrollo'}
      </p>
    </div>
  );
};

export default ImageNotion;

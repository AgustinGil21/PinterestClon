import Image from 'next/image';

interface InterfaceImagesTechnologies {
  setSelectedImage: (src: string) => void;
}

const ImagesTechnologies = ({
  setSelectedImage,
}: InterfaceImagesTechnologies) => {
  return (
    <div>
      <h2 className='text-[22px] font-semibold text-black dark:text-white'>
        Diseño en Figma
      </h2>
      <p className='text-sm max-w-[480px] mt-2'>
        A continuación, se presentan algunas imágenes del diseño inicial que se
        realizó en Figma antes de la implementación. Estas capturas reflejan el
        análisis previo de Pinterest para poder determinar cómo desarrollar la
        UI y qué funcionalidades tendría.
      </p>

      <div className='mt-4 flex flex-col gap-4'>
        {['/figma1.png', '/figma2.png'].map((src, index) => (
          <div
            key={index}
            className='relative w-full h-[250px] cursor-pointer'
            onClick={() => setSelectedImage(src)}
          >
            <Image
              className='rounded-lg'
              src={src}
              alt={`Diseño en Figma ${index + 1}`}
              layout='fill'
              objectFit='cover'
            />
          </div>
        ))}
      </div>
      <p className='text-xs text-gray-500 dark:text-gray-400 text-center mt-2'>
        Imágenes extraídas del diseño original en Figma, utilizadas como
        referencia para la implementación del clon.
      </p>
    </div>
  );
};

export default ImagesTechnologies;

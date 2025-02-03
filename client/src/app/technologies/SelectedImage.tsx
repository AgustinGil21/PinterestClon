import Image from 'next/image';

interface InterfaceSelectedImage {
  selectedImage: string;
  setSelectedImage: (src: null) => void;
}

const SelectedImage = ({
  selectedImage,
  setSelectedImage,
}: InterfaceSelectedImage) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]'
      onClick={() => setSelectedImage(null)}
    >
      <div className='relative w-[90%] max-w-3xl h-auto'>
        <Image
          className='rounded-lg'
          src={selectedImage}
          alt='Imagen ampliada'
          layout='responsive'
          width={800}
          height={600}
        />
      </div>
    </div>
  );
};

export default SelectedImage;

import TrashCreateIcon from '@/app/interfaces/components/icons/TrashCreateIcon';

interface YesImagePinInterface {
  imagePreview: string;
  handleClickDelete: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
}

const YesImagePin = ({
  imagePreview,
  handleClickDelete,
}: YesImagePinInterface) => {
  return (
    <div className='relative w-full h-full overflow-hidden rounded-3xl'>
      <img
        src={imagePreview}
        alt='Vista previa'
        className='w-full h-full object-cover'
      />
      <button
        className='text-black absolute right-4 top-5 p-2 bg-white rounded-full shadow-xl'
        onClick={handleClickDelete}
      >
        <TrashCreateIcon />
      </button>
    </div>
  );
};

export default YesImagePin;

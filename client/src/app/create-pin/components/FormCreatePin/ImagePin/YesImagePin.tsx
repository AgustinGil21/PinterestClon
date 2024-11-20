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
    <>
      <img
        src={imagePreview}
        alt='Vista previa'
        className='absolute top-0 left-0 w-full h-full object-cover rounded-3xl'
      />
      <button
        className='text-black absolute right-4 top-5 p-2 bg-white rounded-full shadow-xl'
        onClick={handleClickDelete}
      >
        <TrashCreateIcon />
      </button>
    </>
  );
};

export default YesImagePin;

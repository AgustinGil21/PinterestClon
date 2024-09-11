import ArrowCreateCloseOptions from '@/app/interfaces/components/icons/ArrowCreateCloseOptions';
import ArrowCreatePlusOptions from '@/app/interfaces/components/icons/ArrowCreatePlusOptions';
import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import SwitchPinAdultContent from './SwitchPinAdultContent';

interface PlusOptionsInterface {
  imagePreview: string | null;
  register: UseFormRegister<FieldValues>;
}

const PlusOptions = ({ imagePreview, register }: PlusOptionsInterface) => {
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    if (!imagePreview) {
      setOpenOptions(false);
    }
  }, [imagePreview]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return !imagePreview ? setOpenOptions(false) : setOpenOptions(!openOptions);
  };

  return (
    <div>
      <div className='flex items-center gap-2 mt-2 px-2'>
        <span
          onClick={handleClick}
          className={`text-[14px] font-semibold dark:text-white cursor-pointer ${
            !imagePreview && 'text-gray-200'
          } `}
        >
          Más opciones
        </span>
        <button onClick={handleClick}>
          {openOptions ? (
            <ArrowCreatePlusOptions />
          ) : (
            <ArrowCreateCloseOptions imagePreview={imagePreview} />
          )}
        </button>
      </div>
      {openOptions && <SwitchPinAdultContent register={register} />}
    </div>
  );
};

export default PlusOptions;

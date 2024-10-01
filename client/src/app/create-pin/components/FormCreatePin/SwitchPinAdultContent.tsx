import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface SwitchPinAdultContentInterface {
  register: UseFormRegister<FieldValues>;
}

const SwitchPinAdultContent = ({
  register,
}: SwitchPinAdultContentInterface) => {
  const { dataCreatePin, updateStateCreatePin } = useAppsStore();

  useEffect(() => {});

  const handleChange = (checked: boolean) => {
    updateStateCreatePin('adult_content', checked);
  };

  return (
    <div className='flex gap-2 flex-row px-2 items-start mt-2'>
      <div>
        <Switch
          checked={dataCreatePin.adult_content}
          onChange={handleChange}
          className={`${
            dataCreatePin.adult_content ? 'bg-black' : 'bg-gray-200'
          } group inline-flex h-5 w-11 items-center rounded-full transition`}
        >
          <span
            className={`size-4 transform ${
              dataCreatePin.adult_content ? 'translate-x-6' : 'translate-x-1'
            } rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-[13px] dark:text-white '>Contenido adulto</span>

        <p className='text-[10px] dark:text-white'>
          El contenido adulto incluye materiales, como imágenes, videos o
          textos, diseñados específicamente para audiencias mayores de edad.{' '}
        </p>
      </div>
    </div>
  );
};

export default SwitchPinAdultContent;

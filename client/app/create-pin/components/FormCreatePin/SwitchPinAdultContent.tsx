import ToggleSwitch from '../../../components/Basic/ToggleSwitch';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface SwitchPinAdultContentInterface {
  register: UseFormRegister<FieldValues>;
}

const SwitchPinAdultContent = ({
  register,
}: SwitchPinAdultContentInterface) => {
  const { dataCreatePin, updateStateCreatePin, t } = useAppsStore();

  const handleChange = (checked: boolean) => {
    updateStateCreatePin('adult_content', checked);
  };

  return (
    <div className='flex gap-2 flex-row px-2 items-start mt-2'>
      <div>
        <ToggleSwitch
          checked={dataCreatePin.adult_content}
          onChangeWithArg={handleChange}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-[13px] dark:text-white '>
          {t?.['create-pin'].form['more-options'].label || 'Contenido adulto'}
        </span>

        <p className='text-[10px] dark:text-white'>
          {t?.['create-pin'].form['more-options'].description ||
            'El contenido adulto incluye materiales, como imágenes, videos o textos, diseñados específicamente para audiencias mayores de edad.'}
        </p>
      </div>
    </div>
  );
};

export default SwitchPinAdultContent;

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface PrivacyOrPublicSwitchProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const PrivacyOrPublicSwitch = ({ setValue }: PrivacyOrPublicSwitchProps) => {
  const { userProfileVisibility } = useAppsStore();
  const [enabled, setEnabled] = useState(
    userProfileVisibility?.private_account
  );

  const handleChange = (checked: boolean) => {
    console.log(checked);
    setEnabled(checked);
    setValue('switch', checked);
  };

  return (
    <div className='flex items-center'>
      <div>
        <span className='font-semibold'>Perfil privado</span>
        <p className='text-[13px]'>
          Cuando tu perfil es privado, solo las personas que apruebes podrán ver
          tu perfil, Pines, tableros, seguidores y listas de seguidos. Obtén más
          información.
        </p>
      </div>
      <div>
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={`${
            enabled ? 'bg-black' : 'bg-gray-200'
          } group inline-flex h-5 w-11 items-center rounded-full transition`}
        >
          <span
            className={`size-4 transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default PrivacyOrPublicSwitch;

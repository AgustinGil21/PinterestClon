import { useState, useEffect } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ToggleSwitch from '@/app/components/Basic/ToggleSwitch';

interface PrivacyOrPublicSwitchProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const PrivacyOrPublicSwitch = ({ setValue }: PrivacyOrPublicSwitchProps) => {
  const { userProfileVisibility, t } = useAppsStore();
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (userProfileVisibility?.private_account !== undefined) {
      setEnabled(userProfileVisibility.private_account);
      setValue('switch', userProfileVisibility.private_account);
    }
  }, [userProfileVisibility, setValue]);

  const handleChange = (checked: boolean) => {
    console.log(userProfileVisibility);
    setEnabled(checked);
    setValue('switch', checked);
    console.log(checked);
  };

  return (
    <div className='flex items-center'>
      <div>
        <span className='font-semibold'>
          {t?.privacy.private.title || 'Perfil privado'}
        </span>
        <p className='text-[13px]'>
          {t?.privacy.private.description ||
            'Cuando tu perfil es privado, solo las personas que apruebes podrán ver tu perfil, Pines, tableros, seguidores y listas de seguidos. Obtén más información.'}
        </p>
      </div>
      <div>
        <ToggleSwitch
          checked={enabled}
          onChangeWithArg={handleChange}
          labelClassName='ml-10'
        />
      </div>
    </div>
  );
};

export default PrivacyOrPublicSwitch;

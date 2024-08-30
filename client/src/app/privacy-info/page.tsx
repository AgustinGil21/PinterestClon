'use client';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import PrivacyOrPublicSwitch from './Components/PrivacyOrPublicSwitch';
import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect, use } from 'react';
import BarButtons from '../interfaces/layout/settingsConfig/BarButtonsSettings';
import useFormHook from '../interfaces/hooks/useFormHook';
import { UserVisibilityAccountSchema } from '../infrastructure/schemas/validation-service-api';

const PrivacyInfo = () => {
  const {
    userPublicData,
    getProfileVisibility,
    patchProfilePrivateVisibility,
    updateCheckedPrivacyOrPublic,
    userProfileVisibility,
  } = useAppsStore();
  const { watch, getValues, register, setValue } = useFormHook({
    event: 'all',
    schema: UserVisibilityAccountSchema,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      await getProfileVisibility();
      setValue('switch', userProfileVisibility?.private_account);
      setLoading(false);
    };

    loadUserData();
  }, [userProfileVisibility?.private_account]);

  const handleClick = async () => {
    const formValues = getValues();
    const newPrivateAccountValue = formValues.switch;

    if (userProfileVisibility?.private_account === newPrivateAccountValue)
      return;

    try {
      await patchProfilePrivateVisibility({
        private_account: newPrivateAccountValue,
      });
      updateCheckedPrivacyOrPublic(newPrivateAccountValue);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!userPublicData?.email_address) {
    return null;
  }

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='p-5 py-8 flex flex-col'>
      <div className='max-w-[420px] w-full lg:ml-[240px] flex flex-col gap-5 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>Visibilidad del perfil</h2>
          <p className='text-sm max-w-[440px]'>
            Administra cómo se puede ver tu perfil dentro y fuera de Pinterest.
          </p>
        </div>
        <PrivacyOrPublicSwitch register={register} setValue={setValue} />
      </div>
      <BarButtons
        watch={watch}
        getValues={getValues}
        handleClick={handleClick}
      />
    </section>
  );
};

export default PrivacyInfo;

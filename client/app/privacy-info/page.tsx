'use client';
import PrivacyOrPublicSwitch from './Components/PrivacyOrPublicSwitch';
import Loader from '../interfaces/components/Basic/Loader';
import BarButtons from '../interfaces/layout/settingsConfig/BarButtonsSettings';
import usePagePrivacyInfo from './usePagePrivacyInfo';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const PrivacyInfo = () => {
  const {
    userPublicData,
    loading,
    register,
    setValue,
    watch,
    getValues,
    handleClick,
  } = usePagePrivacyInfo();
  const { t } = useAppsStore();

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
    <section className='p-5 py-8 flex flex-col settings-page'>
      <div className='max-w-[420px] w-full lg:ml-[140px] flex flex-col gap-5 dark:text-white px-4'>
        <div>
          <h2 className='text-[23px] font-semibold'>
            {t?.privacy.title || 'Visibilidad del perfil'}
          </h2>
          <p className='text-sm max-w-[440px]'>
            {t?.privacy.description ||
              'Administra cómo se puede ver tu perfil dentro y fuera de Pinterest.'}
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

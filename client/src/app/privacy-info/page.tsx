'use client';
import PrivacyOrPublicSwitch from './Components/PrivacyOrPublicSwitch';
import Loader from '../interfaces/components/Basic/Loader';
import BarButtons from '../interfaces/layout/settingsConfig/BarButtonsSettings';
import usePagePrivacyInfo from './usePagePrivacyInfo';

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
      <div className='max-w-[420px] w-full lg:ml-[140px] flex flex-col gap-5 dark:text-white px-4'>
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

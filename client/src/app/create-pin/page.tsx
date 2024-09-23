'use client';
import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect } from 'react';
import AsideCreateClose from './components/AsideCreateOpen/AsideCreateOpen';
import AsideCreateOpen from './components/AsideCreateClose';
import FormCreatePin from './components/FormCreatePin';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import useFormHook from '../interfaces/hooks/useFormHook';
import { CreatePinFormSchema } from '../infrastructure/schemas/validation-form';

const CreatePin = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const { isAuth, getDataUserLogged } = useAppsStore();
  const router = useRouter();

  const {
    register,
    errors,
    handleSubmit,
    clearErrors,
    isValid,
    watch,
    getValues,
    setValue,
    reset,
  } = useFormHook({
    event: 'onSubmit',
    schema: CreatePinFormSchema,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await getDataUserLogged();
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [getDataUserLogged]);

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        router.push('/');
      }
    }
  }, [isAuth, loading, router]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <section className='w-full flex justify-center'>
        <Loader />
      </section>
    );
  }

  return (
    <section className='w-full border-t-gray-300 border-t-[1px] flex flex-row min-h-[100vh] '>
      {isOpen ? (
        <AsideCreateClose
          handleClick={handleClick}
          clearErrors={clearErrors}
          reset={reset}
        />
      ) : (
        <AsideCreateOpen handleClick={handleClick} clearErrors={clearErrors} />
      )}

      <div className='w-full'>
        <FormCreatePin
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          clearErrors={clearErrors}
          isValid={isValid}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          reset={reset}
        />
      </div>
    </section>
  );
};

export default CreatePin;

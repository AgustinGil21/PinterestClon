'use client';
import FormEditUser from './components/formEditUser/FormEditUser';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import Loader from '../interfaces/components/Basic/Loader';

const EditUser = () => {
  const { userPublicData, getDataUserLogged, getUserSettingsEditProfile } =
    useAppsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      await getDataUserLogged();
      await getUserSettingsEditProfile();
    };

    loadUserData();
    setLoading(false);
  }, []);

  if (!userPublicData?.username) {
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
      <div className='max-w-[420px] w-full lg:ml-[240px] flex flex-col gap-5 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>Editar Perfil</h2>
          <p className='text-sm max-w-[440px]'>
            Mantén privados tus datos personales. Cualquier persona que pueda
            ver tu perfil podrá ver la información que agregues aquí.
          </p>
        </div>
        <FormEditUser />
      </div>
    </section>
  );
};

export default EditUser;

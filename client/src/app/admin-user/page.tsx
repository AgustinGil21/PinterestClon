'use client';
import FormAdminUser from './components/formAdminUser/FormAdminUser';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import Loader from '../interfaces/components/Basic/Loader';

const AdminProfile = () => {
  const { getDataUserLogged, getUserAccountManagement, userAccountManagment } =
    useAppsStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      getUserAccountManagement();
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (!userAccountManagment?.email_address) {
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
    <section className='p-5 py-8 flex flex-col min-h-[110vh]'>
      <div className='max-w-[420px] w-full lg:ml-[240px] flex flex-col gap-5 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>
            Administración de la cuenta
          </h2>
          <p className='text-sm max-w-[440px]'>
            Modifica tu información personal o el tipo de cuenta.
          </p>
        </div>
        <FormAdminUser />
      </div>
    </section>
  );
};

export default AdminProfile;

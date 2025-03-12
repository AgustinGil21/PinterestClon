'use client';
import FormAdminUser from './components/formAdminUser/FormAdminUser';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import Loader from '../interfaces/components/Basic/Loader';

const AdminProfile = () => {
  const {
    getDataUserLogged,
    getUserAccountManagement,
    userAccountManagment,
    isDeleteUserAccountModalOpen,
    t,
  } = useAppsStore();

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
    <section
      className={`p-5 py-8 flex flex-col h-[160vh]  md:h-[calc(100vh+140px)] settings-page ${
        isDeleteUserAccountModalOpen ? 'overflow-hidden' : ''
      }`}
    >
      <div className='max-w-[420px] w-full lg:ml-[140px] flex flex-col gap-5 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>
            {t?.['account-management'].title || 'Administración de la cuenta'}
          </h2>
          <p className='text-sm max-w-[440px]'>
            {t?.['account-management'].description ||
              'Modifica tu información personal o el tipo de cuenta.'}
          </p>
        </div>
        <FormAdminUser />
      </div>
    </section>
  );
};

export default AdminProfile;

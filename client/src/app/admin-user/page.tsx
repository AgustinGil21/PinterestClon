'use client';
import FormAdminUser from './components/FormAdminUser';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const AdminProfile = () => {
  const { isAuth, user } = useAppsStore();

  if (!user?.id) {
    return null;
  }
  return (
    <section className='p-5 py-8 flex flex-col'>
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

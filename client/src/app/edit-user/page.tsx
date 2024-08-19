'use client';
import FormEditUser from './components/FormEditUser';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const EditUser = () => {
  const { isAuth, user } = useAppsStore();

  if (!user?.id) {
    return null;
  }

  return (
    <section className='p-5 py-8 flex flex-col'>
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

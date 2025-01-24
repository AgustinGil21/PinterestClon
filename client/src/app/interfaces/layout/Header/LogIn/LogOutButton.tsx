'use client';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';

const LogOutButton = () => {
  const router = useRouter();
  const { postDataLogOut, t } = useAppsStore();

  const handleLogOut = async () => {
    try {
      await postDataLogOut();

      router.replace('/');
      window.history.pushState(null, '', '/');
      window.location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button
      className='flex p-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg mb-2 font-semibold'
      onClick={handleLogOut}
    >
      <span>{t?.header.modal.logout || 'Salir'}</span>
    </button>
  );
};

export default LogOutButton;

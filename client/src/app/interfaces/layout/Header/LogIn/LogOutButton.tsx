import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const LogOutButton = () => {
  const { postDataLogOut } = useAppsStore();

  const handleLogOut = async () => {
    try {
      await postDataLogOut();
      window.location.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button
      className='flex p-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg mb-2'
      onClick={handleLogOut}
    >
      <span>Salir</span>
    </button>
  );
};

export default LogOutButton;

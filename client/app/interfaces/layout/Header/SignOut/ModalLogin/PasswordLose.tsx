import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';

const PasswordLose = () => {
  const { t } = useAppsStore();

  return (
    <button className='text-[12px] text-nowrap  text-black pr-20 hover:underline mt-2 dark:text-white mt-1'>
      {t?.auth.login.password.forgot || '¿Olvidaste tu contraseña?'}
    </button>
  );
};

export default PasswordLose;

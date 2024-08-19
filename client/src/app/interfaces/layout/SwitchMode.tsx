import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';

const SwitchMode = () => {
  const isDarkMode = useAppsStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppsStore((state) => state.toggleMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      className='group inline-flex h-5 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-black'
    >
      <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
    </Switch>
  );
};

export default SwitchMode;

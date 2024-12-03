import { useEffect } from 'react';
import ToggleSwitch from '@/app/components/Basic/ToggleSwitch';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

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
    <ToggleSwitch
      checked={isDarkMode}
      onChangeWithArg={toggleDarkMode}
      colorStyle='pinterest'
    />
  );
};

export default SwitchMode;

import Xcomponent from '../../../icons/Xcomponent';
import { useAppsStore } from '@/app/stores/useAppStore';

const CloseX = () => {
  const closeBothModal = useAppsStore((state) => state.closeBothModal);

  return (
    <button className='absolute top-4 right-4 p-1 ' onClick={closeBothModal}>
      <Xcomponent />
    </button>
  );
};

export default CloseX;

import Xcomponent from '../../../../components/icons/Xcomponent';
import { useAppsStore } from '../../../../../infrastructure/stores/useAppStore';

const CloseX = () => {
  const closeBothModal = useAppsStore((state) => state.closeBothModal);

  return (
    <button className='absolute top-4 right-4 p-1 ' onClick={closeBothModal}>
      <Xcomponent />
    </button>
  );
};

export default CloseX;

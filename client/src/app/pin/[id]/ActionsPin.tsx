import DownloadShare from '@/app/account-search/DownloadShare';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Like from './Like';
import SavePin from './SavePin';
import PlusOptionsPins from './PlusOptionsPin';
import Tooltip from '@/app/components/Header/ToolTip';
import BoardsButtonPin from './BoardsButtonPin';

const ActionsPin = () => {
  const { pinData } = useAppsStore();

  return (
    <div className='flex justify-between '>
      <div className='flex gap-1 items-center relative'>
        <Like />
        <Tooltip tooltipText='Compartir'>
          <DownloadShare
            classProps='p-2 flex items-center'
            dataShare={`pin/${pinData.id}`}
          />
        </Tooltip>

        <PlusOptionsPins />
      </div>

      <div className='flex flex-row gap-2'>
        {/* <BoardsButtonPin /> */}

        <SavePin />
      </div>
    </div>
  );
};

export default ActionsPin;

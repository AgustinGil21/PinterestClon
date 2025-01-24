import { useRef } from 'react';
import DownloadShare from '@/app/account-search/DownloadShare';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Like from './Like';
import SavePin from './SavePin';
import PlusOptionsPins from './PlusOptionsPin';
import Tooltip from '@/app/components/Header/ToolTip';
import BoardsButtonPin from './BoardsButtonPin';
import { SavePinBtn } from '@/app/home-page-components/SavePinBtn';
import { SavePinToBoardBtn } from '@/app/home-page-components/SavePinToBoardBtn';

const ActionsPin = () => {
  const { pinData, t } = useAppsStore();
  const btnRef = useRef(null);

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-1 items-center relative'>
        <Like />
        <Tooltip tooltipText={t?.share.text || 'Compartir'}>
          <DownloadShare
            classProps='p-2 flex items-center'
            dataShare={`pin/${pinData.id}`}
          />
        </Tooltip>

        <PlusOptionsPins />
      </div>

      <div className='flex flex-row gap-2'>
        {/* <BoardsButtonPin /> */}

        <SavePinToBoardBtn
          pinId={pinData.id}
          pinBody={pinData.body}
          btnRef={btnRef}
          pinCard
        />
        <SavePinBtn pinId={pinData.id} />
      </div>
    </div>
  );
};

export default ActionsPin;

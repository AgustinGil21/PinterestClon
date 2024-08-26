import { useState } from 'react';
import ArrowBottomUser from '../../../components/icons/ArrowBottomUser';
import MessageIcon from '../../../components/icons/MessageIcon';
import MoreOptionsModal from './MoreOptionsModal';
import Tooltip from '../../../components/Basic/ToolTip';
import LinkNavigate from '../Nav/LinkNavigate';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import AvatarImageLogIn from './AvatarImageLogIn';
import AvatarGenerateLogIn from './AvatarGenerateLogIn';

export const UserLoggedIn = () => {
  const [modal, setModal] = useState(false);
  const { userPublicData } = useAppsStore();

  return (
    <div className='flex gap-2.5'>
      <Tooltip tooltipText='Mensajes'>
        <MessageIcon />
      </Tooltip>

      <div className='flex items-center gap-3 -m-2'>
        <LinkNavigate
          href='#a'
          classProps='hover:bg-slate-200 p-2 rounded-full cursor-pointer '
        >
          {userPublicData?.avatar ? (
            <AvatarImageLogIn user={userPublicData} />
          ) : (
            <AvatarGenerateLogIn />
          )}
        </LinkNavigate>

        <button
          className='hover:bg-slate-200 p-0.5 rounded-full cursor-pointer relative right-3 '
          onClick={() => setModal(!modal)}
        >
          <Tooltip tooltipText='Cuentas y mas opciones'>
            <ArrowBottomUser />
          </Tooltip>
        </button>

        {modal && <MoreOptionsModal setModal={setModal} />}
      </div>
    </div>
  );
};

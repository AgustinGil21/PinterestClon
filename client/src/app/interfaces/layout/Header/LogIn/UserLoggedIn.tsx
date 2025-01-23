import { useEffect, useState } from 'react';
import ArrowBottomUser from '../../../components/icons/ArrowBottomUser';
import MessageIcon from '../../../components/icons/MessageIcon';
import MoreOptionsModal from './MoreOptionsModal';
import Tooltip from '../../../components/Basic/ToolTip';
import LinkNavigate from '../Nav/LinkNavigate';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import AvatarUser from '../Avatar/AvatarUser';

export const UserLoggedIn = () => {
  const [modal, setModal] = useState(false);
  const { userPublicData, getDataUserLogged, avatarBackgroundColor, t } =
    useAppsStore();

  return (
    <div className=' gap-2 hidden md:flex'>
      {/* <Tooltip tooltipText='Mensajes'>
        <MessageIcon />
      </Tooltip> */}

      <div className='flex items-center gap-3 -m-2'>
        <LinkNavigate
          href={`/${userPublicData?.username}`}
          classProps='hover:bg-slate-200 p-1 rounded-full cursor-pointer '
        >
          <Tooltip tooltipText={t?.header.buttons.avatar || 'Tu perfil'}>
            <AvatarUser
              data={userPublicData}
              classProps={`${
                userPublicData?.avatar
                  ? 'w-[20px] h-[20px]'
                  : 'w-[6px] h-[6px] p-3'
              }  `}
              textSize='text-[12px]'
            />
          </Tooltip>
        </LinkNavigate>

        <button
          className='hover:bg-slate-200 p-0.5 rounded-full cursor-pointer relative right-3 '
          onClick={() => setModal(!modal)}
        >
          <Tooltip
            tooltipText={
              t?.header.buttons['arrow-down'] || 'Cuentas y mas opciones'
            }
          >
            <ArrowBottomUser />
          </Tooltip>
        </button>

        {modal && <MoreOptionsModal setModal={setModal} />}
      </div>
    </div>
  );
};

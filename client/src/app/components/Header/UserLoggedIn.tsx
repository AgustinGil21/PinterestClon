import { useState } from 'react';
import ArrowBottomUser from '../icons/ArrowBottomUser';
import MessageIcon from '../icons/MessageIcon';
import MoreOptionsModal from './MoreOptionsModal';
import Tooltip from './ToolTip';
import LinkNavigate from './LinkNavigate';

export const UserLoggedIn = () => {
  const [modal, setModal] = useState(false);

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
          <div className='text-white bg-UserBg p-3 rounded-full w-[6px] h-[6px] text-[12px] flex justify-center items-center cursor-pointer '>
            <Tooltip tooltipText='Tu perfil'>A</Tooltip>
          </div>
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

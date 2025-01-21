import { useRef, useState } from 'react';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ArrowUrlPin from '../interfaces/components/icons/ArrowUrlPin';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import { getDomain } from '../libs/getDomain';

export const PinBodyControlsBottom = ({ elem }: { elem: PinInterface }) => {
  const { setDynamicSharePinModalIsOpen, isAuth, openRegisterModal } =
    useAppsStore();
  const btnThreePoints = useRef(null);
  const shareBtnRef = useRef(null);
  const [openModalThreePoints, setOpenModalThreePoints] = useState(false);
  const buttonURL = getDomain(elem.url);

  const handleSharePinModal = () => {
    setDynamicSharePinModalIsOpen(shareBtnRef, elem.pin_id);
  };

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
    }
    setOpenModalThreePoints(!openModalThreePoints);
  };

  return (
    <article className='bottom card-controls flex justify-between items-center mt-2 relative '>
      <div className='flex gap-2 flex-row-reverse'>
        <button
          ref={btnThreePoints}
          className='circle-buttons bg-gray-100 p-2 rounded-full'
          onClick={handleClickOpenModalThreePoints}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-6 h-6 min-h-6 min-w-6'
          >
            <path d='M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' />
          </svg>
        </button>

        <button
          className='circle-buttons bg-gray-100 p-2 rounded-full'
          onClick={handleSharePinModal}
          ref={shareBtnRef}
        >
          <DownloadIcon classProps='w-4 h-4' />
        </button>
      </div>

      {elem.url && (
        <a
          href={elem.url}
          className='go-to text-blue-500'
          title={buttonURL || ''}
          target='_blank'
          rel='noreferrer'
        >
          <ArrowUrlPin />
          <span>{buttonURL}</span>
        </a>
      )}
    </article>
  );
};

import { useRef } from 'react';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ArrowUrlPin from '../interfaces/components/icons/ArrowUrlPin';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import { getDomain } from '../libs/getDomain';
import LinkNavigate from '../components/Header/LinkNavigate';
import { FaPen } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';

interface Props {
  elem: PinInterface;
}

export const PinBodyControlsBottom = ({ elem }: Props) => {
  const {
    setDynamicSharePinModalIsOpen,
    isAuth,
    openRegisterModal,
    userPublicData,
    setImagePreview,
    getPinEditId,
    setPinMoreOptionsModal,
  } = useAppsStore();
  const ellipsisBtnRef = useRef(null);
  const shareBtnRef = useRef(null);
  const buttonURL = getDomain(elem.url);

  const handleClickEditPin = async () => {
    if (!elem.pin_id) return;

    setImagePreview(null);
    await getPinEditId(elem.pin_id);
  };

  const handleSharePinModal = () => {
    setDynamicSharePinModalIsOpen(shareBtnRef, elem.pin_id);
  };

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    setPinMoreOptionsModal(ellipsisBtnRef, elem.body);
  };

  return (
    <article className='bottom card-controls flex justify-between items-center mt-2 relative '>
      <div className='flex gap-2 flex-row-reverse'>
        {elem.username === userPublicData?.username ? (
          <LinkNavigate
            href='/create-pin'
            handleClick={handleClickEditPin}
            linkClass='w-[32px] h-[32px] min-w-[32px] min-h-[32px] flex justify-center items-center bg-white rounded-full hover:bg-[#f4f4f4] transition-colors'
          >
            <FaPen size={12} />
          </LinkNavigate>
        ) : (
          <button
            ref={ellipsisBtnRef}
            className='w-[32px] h-[32px] min-w-[32px] min-h-[32px] flex justify-center items-center bg-white rounded-full hover:bg-[#f4f4f4] transition-colors'
            onClick={handleClickOpenModalThreePoints}
          >
            <FaEllipsis size={20} />
          </button>
        )}

        <button
          className='w-[32px] h-[32px] min-w-[32px] min-h-[32px] flex justify-center items-center bg-white rounded-full hover:bg-[#f4f4f4] transition-colors'
          onClick={handleSharePinModal}
          ref={shareBtnRef}
        >
          <DownloadIcon classProps='w-4 h-4' />
        </button>
      </div>

      {elem.url && (
        <a
          href={elem.url}
          className='go-to p-2 bg-[#f4f4f4] rounded-[32px] w-fit max-w-full font-bold overflow-hidden flex place-content-center gap-2 hover:bg-white text-black transition-colors'
          title={buttonURL || ''}
          target='_blank'
          rel='noreferrer'
        >
          <ArrowUrlPin />
          <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {buttonURL}
          </span>
        </a>
      )}
    </article>
  );
};

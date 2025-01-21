import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PinInterface } from '../domain/types/pins-structure';
import getDarkColor from '../interfaces/helpers/getColorDark';
import { getDomain } from '../libs/getDomain';
import { useRouter } from 'next/navigation';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import useCloseModal from '../hooks/useCloseModal';
import { Skeleton } from '../components/Basic/Skeleton';
import CreateBoardModal from '../boards/create-board/CreateBoardModal';
import ModalPlusOptionPin from '../pin/[id]/ModalPlusOptionPin';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import ArrowUrlPin from '../interfaces/components/icons/ArrowUrlPin';

interface PinProps {
  elem: PinInterface;
  className?: string;
}

export const Pin = ({ elem, className }: PinProps) => {
  const {
    lastBoard,
    dataOpenBoardModal,
    updateDataOpenBoardModal,
    setDynamicModal,
    dynamicModalIsOpen,
    btnRef: btnRefStore,
    setDynamicSharePinModalIsOpen,
    isCreateBoardModalOpen,

    isAuth,
    openRegisterModal,
    addPinToBoard,
    savePinToProfile,
  } = useAppsStore();
  const { pinBody, pinId } = dataOpenBoardModal;

  const btnRef = useRef(null);
  const btnThreePoints = useRef(null);
  const shareBtnRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModalThreePoints, setOpenModalThreePoints] = useState(false);
  const [skeletonColor, setSkeletonColor] = useState<string>('#');
  const buttonURL = getDomain(elem.url);
  const userProfile = `/${elem.username}`;
  const router = useRouter();

  const handleSharePinModal = () => {
    setDynamicSharePinModalIsOpen(shareBtnRef, elem.pin_id);
  };

  const handleModalOpen = () => {
    if (elem.pin_id) updateDataOpenBoardModal(elem.pin_id, elem.body);

    setDynamicModal(btnRef);
  };

  const handleSavePin = () => {
    if (!elem.pin_id) return;

    if (lastBoard.id) {
      addPinToBoard({ pinId: elem.pin_id, boardId: lastBoard.id });
    } else {
      savePinToProfile(elem.pin_id);
    }
  };

  useEffect(() => {
    setSkeletonColor(getDarkColor());
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = elem.body;
    img.onload = () => setIsLoaded(true);
  }, [elem.body]);

  const handleClick = () => {
    console.log(elem.pin_id);
    const fetchData = async () => {
      try {
        let pinId = String(elem.pin_id).trim();

        if (!pinId.startsWith('http')) {
          pinId = `/${pinId}`;
        }

        if (pinId.includes('pin')) {
          router.push(pinId);
        } else {
          router.push(`/pin/${pinId}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleClickOpenModalThreePoints = () => {
    if (!isAuth) {
      openRegisterModal();
    }
    setOpenModalThreePoints(!openModalThreePoints);
  };

  return (
    <>
      <section className={`${elem.className} ${className} relative`}>
        {!isLoaded && elem.username ? (
          <Skeleton
            height={400}
            presets='rounded'
            angle='diagonalLeft'
            direction='top'
            color={skeletonColor}
            className='w-full mb-4 mt-4'
            speed='slow'
            borderRadius='16px'
          />
        ) : (
          <article className='card hover:cursor-pointer'>
            <article className='card-top'>
              <img
                src={elem.body}
                className='card-body w-full h-60 object-cover'
                alt={elem.alt_text}
                onClick={handleClick}
              />
              <article
                className={`top flex justify-between mt-2 ${
                  dynamicModalIsOpen && btnRefStore === btnRef
                    ? 'card-controls-modal-open'
                    : 'card-controls'
                }`}
              >
                <button
                  className='save-button bg-red-500 text-white px-3 py-1 rounded'
                  onClick={handleSavePin}
                >
                  Guardar
                </button>
                <button
                  className='save-to-board-button flex items-center'
                  onClick={handleModalOpen}
                  ref={btnRef}
                >
                  <span className='text-sm'>{lastBoard.name || 'Perfil'}</span>
                  <svg
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 ml-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m19.5 8.25-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
                <button className='hidden transition-[colors,scale] save-to-board-button-sm p-3 rounded-full bg-transparent justify-center items-center '>
                  <svg
                    fill='none'
                    viewBox='0 0 20 20'
                    strokeWidth='2'
                    stroke='white'
                    className='w-4 h-4 -translate-x-0.5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m19.5 8.25-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
              </article>

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
            </article>
            {elem.username && (
              <footer className='card-bottom mt-2'>
                {elem.title && (
                  <strong className='dark:text-white'>{elem.title}</strong>
                )}
                <Link
                  href={`${userProfile}`}
                  className='user-data flex items-center '
                  onClick={(e) => e.stopPropagation()}
                >
                  {elem.avatar ? (
                    <img
                      src={elem.avatar}
                      alt={`${elem.avatar} avatar`}
                      className='user-avatar w-8 h-8 rounded-full mr-2 object-cover'
                    />
                  ) : (
                    <div
                      className='user-avatar w-8 h-8 rounded-full mr-2 flex items-center justify-center'
                      style={{
                        backgroundColor: elem.avatar_background,
                        color: elem.avatar_letter_color,
                      }}
                      aria-label={`${elem.username} avatar`}
                    >
                      {elem.avatar_letter}
                    </div>
                  )}
                  <span className='text-sm dark:text-white'>
                    {elem.name
                      ? `${elem.name} ${elem.surname || ''}`
                      : `${elem.username}`}
                  </span>
                </Link>
              </footer>
            )}
          </article>
        )}
        {openModalThreePoints && (
          <ModalPlusOptionPin
            body={elem.body}
            btnRef={btnThreePoints}
            setModal={handleClickOpenModalThreePoints}
            isModalOpen={openModalThreePoints}
          />
        )}
      </section>
      {isCreateBoardModalOpen && elem.pin_id === pinId && (
        <CreateBoardModal pinBody={pinBody} pinId={pinId} />
      )}
    </>
  );
};
